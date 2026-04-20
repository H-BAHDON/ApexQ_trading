import os
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional, Dict

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field

from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout,
    CheckoutSessionRequest,
    CheckoutSessionResponse,
    CheckoutStatusResponse,
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
STRIPE_API_KEY = os.environ["STRIPE_API_KEY"]

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

app = FastAPI(title="Compression Ladder API")
api = APIRouter(prefix="/api")

# Server-side pricing - never trust frontend for amounts
PACKAGES: Dict[str, Dict] = {
    "compression_ladder_monthly": {
        "name": "Compression Ladder — Monthly",
        "amount": 79.00,
        "currency": "usd",
        "description": "Monthly access to Compression Ladder + future tools + updates",
    }
}


# ---------- Models ----------
class LeadCreate(BaseModel):
    email: EmailStr
    source: Optional[str] = "hero"


class LeadResponse(BaseModel):
    id: str
    email: str
    source: str
    created_at: str


class CheckoutCreate(BaseModel):
    package_id: str
    origin_url: str
    email: Optional[EmailStr] = None


class CheckoutCreateResponse(BaseModel):
    url: str
    session_id: str


class CheckoutStatusOut(BaseModel):
    session_id: str
    status: str
    payment_status: str
    amount_total: int
    currency: str


class ContactCreate(BaseModel):
    email: EmailStr
    message: str


# ---------- Utility ----------
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _stripe(request: Request) -> StripeCheckout:
    host_url = str(request.base_url).rstrip("/")
    webhook_url = f"{host_url}/api/webhook/stripe"
    return StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)


# ---------- Routes ----------
@api.get("/")
async def root():
    return {"service": "Compression Ladder API", "status": "ok"}


@api.get("/health")
async def health():
    return {"ok": True, "time": now_iso()}


@api.post("/leads", response_model=LeadResponse)
async def capture_lead(payload: LeadCreate):
    doc = {
        "_id": str(uuid.uuid4()),
        "email": payload.email.lower(),
        "source": payload.source or "hero",
        "created_at": now_iso(),
    }
    # upsert by email (no duplicates)
    await db.leads.update_one(
        {"email": doc["email"]},
        {"$setOnInsert": doc},
        upsert=True,
    )
    existing = await db.leads.find_one({"email": doc["email"]}, {"_id": 1, "email": 1, "source": 1, "created_at": 1})
    return LeadResponse(
        id=existing["_id"],
        email=existing["email"],
        source=existing.get("source", "hero"),
        created_at=existing.get("created_at", now_iso()),
    )


@api.post("/contact")
async def contact(payload: ContactCreate):
    doc = {
        "_id": str(uuid.uuid4()),
        "email": payload.email.lower(),
        "message": payload.message,
        "created_at": now_iso(),
    }
    await db.contacts.insert_one(doc)
    return {"ok": True, "id": doc["_id"]}


@api.get("/packages")
async def list_packages():
    return {
        pid: {k: v for k, v in pkg.items()}
        for pid, pkg in PACKAGES.items()
    }


@api.post("/checkout/session", response_model=CheckoutCreateResponse)
async def create_checkout_session(payload: CheckoutCreate, request: Request):
    if payload.package_id not in PACKAGES:
        raise HTTPException(status_code=400, detail="Invalid package")

    pkg = PACKAGES[payload.package_id]
    origin = payload.origin_url.rstrip("/")
    success_url = f"{origin}/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin}/?canceled=1"

    metadata = {
        "package_id": payload.package_id,
        "source": "landing_page",
    }
    if payload.email:
        metadata["email"] = payload.email.lower()

    checkout = _stripe(request)
    ck_req = CheckoutSessionRequest(
        amount=float(pkg["amount"]),
        currency=pkg["currency"],
        success_url=success_url,
        cancel_url=cancel_url,
        metadata=metadata,
    )
    session: CheckoutSessionResponse = await checkout.create_checkout_session(ck_req)

    # Persist a pending transaction BEFORE redirect
    await db.payment_transactions.insert_one({
        "_id": str(uuid.uuid4()),
        "session_id": session.session_id,
        "package_id": payload.package_id,
        "amount": float(pkg["amount"]),
        "currency": pkg["currency"],
        "email": payload.email.lower() if payload.email else None,
        "metadata": metadata,
        "status": "initiated",
        "payment_status": "pending",
        "created_at": now_iso(),
        "updated_at": now_iso(),
    })

    # Also save email as a lead if provided
    if payload.email:
        await db.leads.update_one(
            {"email": payload.email.lower()},
            {"$setOnInsert": {
                "_id": str(uuid.uuid4()),
                "email": payload.email.lower(),
                "source": "checkout",
                "created_at": now_iso(),
            }},
            upsert=True,
        )

    return CheckoutCreateResponse(url=session.url, session_id=session.session_id)


@api.get("/checkout/status/{session_id}", response_model=CheckoutStatusOut)
async def checkout_status(session_id: str, request: Request):
    checkout = _stripe(request)
    status: CheckoutStatusResponse = await checkout.get_checkout_status(session_id)

    # Update our DB only if not already finalized (idempotent)
    existing = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
    if existing and existing.get("payment_status") != "paid":
        update = {
            "status": status.status,
            "payment_status": status.payment_status,
            "updated_at": now_iso(),
        }
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": update},
        )
        if status.payment_status == "paid":
            email = (existing.get("email") or status.metadata.get("email") if status.metadata else None)
            if email:
                await db.subscribers.update_one(
                    {"email": email.lower()},
                    {"$set": {
                        "email": email.lower(),
                        "package_id": existing.get("package_id"),
                        "status": "active",
                        "last_session_id": session_id,
                        "updated_at": now_iso(),
                    },
                    "$setOnInsert": {
                        "_id": str(uuid.uuid4()),
                        "created_at": now_iso(),
                    }},
                    upsert=True,
                )

    return CheckoutStatusOut(
        session_id=session_id,
        status=status.status,
        payment_status=status.payment_status,
        amount_total=status.amount_total,
        currency=status.currency,
    )


@api.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("Stripe-Signature", "")
    checkout = _stripe(request)
    try:
        event = await checkout.handle_webhook(body, signature)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Webhook error: {e}")

    session_id = getattr(event, "session_id", None)
    payment_status = getattr(event, "payment_status", None)
    if session_id:
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": {
                "payment_status": payment_status or "unknown",
                "webhook_event": getattr(event, "event_type", None),
                "updated_at": now_iso(),
            }},
        )
        if payment_status == "paid":
            tx = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
            if tx:
                email = tx.get("email") or (tx.get("metadata") or {}).get("email")
                if email:
                    await db.subscribers.update_one(
                        {"email": email.lower()},
                        {"$set": {
                            "email": email.lower(),
                            "package_id": tx.get("package_id"),
                            "status": "active",
                            "last_session_id": session_id,
                            "updated_at": now_iso(),
                        },
                        "$setOnInsert": {
                            "_id": str(uuid.uuid4()),
                            "created_at": now_iso(),
                        }},
                        upsert=True,
                    )
    return {"received": True}


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
