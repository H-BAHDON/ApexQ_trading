import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { createCheckout } from "../lib/api";

const INCLUDES = [
  "Compression Ladder indicator (TradingView)",
  "Multi-timeframe rails (15m → 1W)",
  "Access to future ApexQ tools",
  "All future updates included",
  "Private member updates channel",
];

export default function Pricing() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onCheckout = async () => {
    if (email && !email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    }
    try {
      setLoading(true);
      const res = await createCheckout({
        packageId: "compression_ladder_monthly",
        email: email || null,
      });
      if (res?.url) {
        window.location.href = res.url;
      } else {
        toast.error("Could not start checkout");
      }
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="relative py-28 md:py-40 border-t border-zinc-900"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="mb-14 text-center">
          <div className="text-xs uppercase tracking-[0.24em] text-zinc-500 mb-4">
            <span className="text-emerald-400">— </span>Pricing
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight font-medium text-balance">
            Simple, monthly access.
          </h2>
          <p className="mt-5 text-zinc-400 leading-relaxed max-w-xl mx-auto">
            One plan. Cancel anytime. Includes Compression Ladder and every future ApexQ tool.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          data-testid="pricing-card"
          className="relative rounded-3xl border border-emerald-500/30 bg-[#0A0A0A] p-8 md:p-12 overflow-hidden glow-emerald"
        >
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
                Monthly Access
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <div
                  className="font-display text-6xl md:text-7xl tracking-tighter font-medium"
                  data-testid="pricing-amount"
                >
                  $79
                </div>
                <div className="text-zinc-500 text-lg">/ month</div>
              </div>
              <div className="mt-2 text-sm text-zinc-500">
                Billed monthly · cancel anytime
              </div>

              <div className="mt-8 space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com (optional)"
                  data-testid="pricing-email-input"
                  className="w-full bg-[#121212] border border-zinc-800 rounded-full px-5 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition"
                />
                <button
                  onClick={onCheckout}
                  disabled={loading}
                  data-testid="pricing-checkout-btn"
                  className="group w-full inline-flex items-center justify-center gap-2 bg-emerald-500 text-black px-6 py-4 rounded-full font-medium hover:bg-emerald-400 transition-colors disabled:opacity-60"
                >
                  {loading ? "Redirecting…" : "Start Access"}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </button>
                <div className="text-[11px] text-zinc-600 text-center">
                  Secure payment via Stripe. No hidden fees.
                </div>
              </div>
            </div>

            <div className="md:border-l md:border-zinc-800 md:pl-10">
              <div className="text-xs uppercase tracking-[0.24em] text-zinc-500 mb-5">
                What's included
              </div>
              <ul className="space-y-3">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-200">
                    <span className="mt-1 w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/40 grid place-items-center shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" strokeWidth={2.5} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
