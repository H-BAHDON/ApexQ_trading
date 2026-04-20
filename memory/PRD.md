# Compression Ladder — Landing Page · PRD

## Original problem statement
Build a modern, premium landing page for a trading tool called **Compression Ladder** (by parent brand **ApexQ**). Dark-theme, minimal, professional (think ChartPrime / LuxAlgo / Zeiierman). Must:
- Capture emails on the homepage (lead magnet)
- Offer a monthly $79 Stripe subscription
- Explain the tool honestly — no signals, no hype, structure-only
- Include sections: Hero, Features ("Clarity over noise"), How it works, Chart Examples (using user-uploaded TradingView screenshots), Why it's different, Who it's for, Trust disclaimer, Pricing, Final CTA, Footer with Instagram/Terms/Contact.

## Architecture
- **Frontend**: React (CRA) + Tailwind + framer-motion + lucide-react + sonner, served by CRA dev server on :3000 behind ingress.
- **Backend**: FastAPI on :8001 with `/api/*` prefix, Motor (async) MongoDB client, `emergentintegrations.payments.stripe.checkout` + `stripe` SDK.
- **DB**: MongoDB collections → `leads`, `contacts`, `payment_transactions`, `subscribers`.

## Core requirements (static)
1. Email capture on hero + in pricing + contact form in footer.
2. $79/month Stripe Checkout (server-side priced, never trust frontend).
3. `/success?session_id=…` page polls `/api/checkout/status/{id}`.
4. `/terms` static disclaimer page.
5. Trust disclaimer callout: "This tool does not provide buy/sell signals".
6. Data-testid on every interactive element.

## What's been implemented (2026-04-20)
- Scaffolded React app from scratch (no starter template found at /app).
- Premium dark theme with Cabinet Grotesk (display) + IBM Plex Sans (body) + JetBrains Mono (data).
- Hand-built inline SVG chart mock in hero (compression rails + XRP-style candles).
- Components: Header (sticky glass nav with ApexQ logo mark), Hero (email capture + chart mock), Features (3-col bento with rail motif), HowItWorks (stepped cards with decaying rails), ChartExamples (uses user's 2 TradingView uploads), Comparison (❌ vs ✅), WhoItsFor (built-for / not-for), Disclaimer callout, Pricing (single premium card with Stripe checkout), FinalCTA, Footer (contact form + Instagram + Terms).
- Backend endpoints: `/api/health`, `/api/packages`, `/api/leads`, `/api/contact`, `/api/checkout/session`, `/api/checkout/status/{id}`, `/api/webhook/stripe`.
- Stripe integration via `emergentintegrations` + fallback to direct `stripe.checkout.Session.retrieve` for status polling (workaround for library's Pydantic metadata validation bug).
- Payment status endpoint has 3-level resilience: library → direct Stripe SDK → DB record.

## Testing status
- Backend: 12/12 pytest green (iteration_2).
- Frontend: 100% green (iteration_2). Live Stripe Checkout redirect verified to `checkout.stripe.com`.
- Hero email capture, footer contact form, nav smooth scroll, final CTA, /terms, and /success polling all verified.

## Backlog (P1)
- Resend/SendGrid integration to auto-deliver access link after successful payment.
- Admin dashboard to export leads / subscribers CSV.
- Subscriber portal where paid users can grab the TradingView invite link.
- Stripe webhook signing secret (currently optional; swap in production).
- Replace test key `sk_test_emergent` with live Stripe key on launch.

## Backlog (P2)
- Live interactive chart embed (TradingView widget) instead of SVG mock.
- Testimonials / social proof once available.
- FAQ accordion.
- Blog / research notes section.
- Dark-to-light toggle (currently dark only, intentional).
- Split server.py into routers (leads / checkout / contact) as it grows.

## Next Action Items
1. User to provide TradingView invite link/script for automated post-payment delivery.
2. Decide email service (Resend vs SendGrid) and connect.
3. Swap Stripe test key for live key on launch day.
