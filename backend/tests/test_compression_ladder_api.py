"""Backend API tests for Compression Ladder (ApexQ) landing page."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # Fallback to frontend .env file
    try:
        with open("/app/frontend/.env") as fh:
            for line in fh:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip()
                    break
    except Exception:
        pass
BASE_URL = (BASE_URL or "").rstrip("/")
assert BASE_URL, "REACT_APP_BACKEND_URL must be set"


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_health(self, api):
        r = api.get(f"{BASE_URL}/api/health", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert data.get("ok") is True
        assert "time" in data


# ---------- Packages ----------
class TestPackages:
    def test_packages_list(self, api):
        r = api.get(f"{BASE_URL}/api/packages", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert "compression_ladder_monthly" in data
        pkg = data["compression_ladder_monthly"]
        assert pkg["amount"] == 79.0
        assert pkg["currency"] == "usd"
        assert "name" in pkg and "description" in pkg


# ---------- Leads ----------
class TestLeads:
    def test_lead_capture_valid(self, api):
        email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        r = api.post(f"{BASE_URL}/api/leads", json={"email": email, "source": "hero"}, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] == email.lower()
        assert data["source"] == "hero"
        assert "id" in data and data["id"]
        assert "created_at" in data

    def test_lead_dedup(self, api):
        email = f"test_dedup_{uuid.uuid4().hex[:8]}@example.com"
        r1 = api.post(f"{BASE_URL}/api/leads", json={"email": email}, timeout=30)
        assert r1.status_code == 200
        id1 = r1.json()["id"]
        r2 = api.post(f"{BASE_URL}/api/leads", json={"email": email}, timeout=30)
        assert r2.status_code == 200
        id2 = r2.json()["id"]
        # Dedup: same id returned (upsert $setOnInsert)
        assert id1 == id2

    def test_lead_invalid_email(self, api):
        r = api.post(f"{BASE_URL}/api/leads", json={"email": "not-an-email"}, timeout=30)
        assert r.status_code == 422


# ---------- Contact ----------
class TestContact:
    def test_contact_valid(self, api):
        email = f"test_contact_{uuid.uuid4().hex[:8]}@example.com"
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={"email": email, "message": "TEST_hello"},
            timeout=30,
        )
        assert r.status_code == 200
        data = r.json()
        assert data.get("ok") is True
        assert "id" in data

    def test_contact_invalid_email(self, api):
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={"email": "nope", "message": "hi"},
            timeout=30,
        )
        assert r.status_code == 422


# ---------- Checkout ----------
class TestCheckout:
    def test_checkout_session_success(self, api):
        payload = {
            "package_id": "compression_ladder_monthly",
            "origin_url": BASE_URL,
            "email": f"test_co_{uuid.uuid4().hex[:8]}@example.com",
        }
        r = api.post(f"{BASE_URL}/api/checkout/session", json=payload, timeout=60)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "url" in data and "session_id" in data
        assert data["url"].startswith("https://checkout.stripe.com"), f"Unexpected url: {data['url']}"
        assert data["session_id"]
        # Save for status test
        pytest.stripe_session_id = data["session_id"]

    def test_checkout_session_invalid_package(self, api):
        payload = {"package_id": "bogus_plan", "origin_url": BASE_URL}
        r = api.post(f"{BASE_URL}/api/checkout/session", json=payload, timeout=30)
        assert r.status_code == 400

    def test_checkout_status(self, api):
        sid = getattr(pytest, "stripe_session_id", None)
        if not sid:
            pytest.skip("No session_id from prior test")
        r = api.get(f"{BASE_URL}/api/checkout/status/{sid}", timeout=60)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["session_id"] == sid
        assert "status" in data
        assert "payment_status" in data
        assert "amount_total" in data
        assert "currency" in data

    def test_webhook_reachable_no_signature(self, api):
        # Expected 400 because no valid Stripe-Signature header
        r = api.post(
            f"{BASE_URL}/api/webhook/stripe",
            data=b"{}",
            headers={"Content-Type": "application/json"},
            timeout=30,
        )
        assert r.status_code == 400
