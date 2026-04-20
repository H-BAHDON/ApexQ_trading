import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { captureLead } from "../lib/api";
import ChartMock from "./ChartMock";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    }
    try {
      setLoading(true);
      await captureLead(email, "hero");
      toast.success("You're on the list. We'll be in touch.");
      setEmail("");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToExample = () => {
    const el = document.getElementById("examples");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative pt-36 md:pt-44 pb-20 overflow-hidden"
    >
      {/* Background rails */}
      <div className="absolute inset-0 rail-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none radial-mask" />
      {/* Accent glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        {/* Micro label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-zinc-500 mb-8"
        >
          <span className="inline-block w-8 h-px bg-emerald-500/70" />
          <span>ApexQ · Structure Research</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          data-testid="hero-h1"
          className="font-display text-5xl md:text-7xl lg:text-[88px] leading-[1.02] tracking-tightest font-medium text-balance max-w-5xl"
        >
          See when the market is about to move <span className="text-zinc-500">— before it happens.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-zinc-400 leading-relaxed"
        >
          Compression Ladder is a multi-timeframe structure tool that shows where price is
          building pressure — so you can prepare for expansion instead of reacting late.
        </motion.p>

        {/* Email + CTA */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl"
          data-testid="hero-email-form"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            data-testid="hero-email-input"
            className="flex-1 bg-[#0A0A0A] border border-zinc-800 rounded-full px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition"
          />
          <button
            type="submit"
            disabled={loading}
            data-testid="hero-submit-btn"
            className="group inline-flex items-center justify-center gap-2 bg-emerald-500 text-black px-7 py-4 rounded-full font-medium hover:bg-emerald-400 transition-colors disabled:opacity-60"
          >
            {loading ? "Saving…" : "Get Access"}
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-500"
        >
          <button
            onClick={scrollToExample}
            data-testid="hero-view-example-btn"
            className="underline underline-offset-4 decoration-zinc-700 hover:text-white hover:decoration-emerald-400 transition"
          >
            View example →
          </button>
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
            Not a signal tool. Structure only.
          </span>
          <button
            onClick={scrollToPricing}
            className="hover:text-white transition-colors"
          >
            See pricing
          </button>
        </motion.div>

        {/* Product mock */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-16 md:mt-24 relative"
        >
          <div className="absolute -inset-8 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent blur-2xl pointer-events-none" />
          <div className="relative rounded-2xl border border-zinc-800 bg-[#0A0A0A] overflow-hidden">
            <div className="flex items-center gap-2 px-4 h-9 border-b border-zinc-900 bg-[#070707]">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="ml-4 text-[11px] font-mono text-zinc-500 tracking-wide">
                XRP / USD · 5m · Kraken · Compression Ladder v1
              </div>
              <div className="ml-auto text-[11px] font-mono text-emerald-400/90">
                BUILDING PRESSURE
              </div>
            </div>
            <ChartMock />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
