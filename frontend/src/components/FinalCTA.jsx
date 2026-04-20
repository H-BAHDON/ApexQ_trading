import React from "react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="final-cta"
      data-testid="final-cta-section"
      className="relative py-32 md:py-48 border-t border-zinc-900 overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid opacity-30 radial-mask pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-5xl md:text-7xl lg:text-[84px] leading-[1.02] tracking-tightest font-medium text-balance"
        >
          Understand the market <span className="text-emerald-400">before it moves.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-zinc-400 max-w-xl mx-auto leading-relaxed"
        >
          Stop trading noise. Start reading structure. Compression Ladder shows you where
          pressure is building — the rest is your edge.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10"
        >
          <button
            onClick={scrollToPricing}
            data-testid="final-cta-btn"
            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-emerald-400 transition-colors"
          >
            Get Access
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
