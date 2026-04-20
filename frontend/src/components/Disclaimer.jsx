import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function Disclaimer() {
  return (
    <section
      id="disclaimer"
      data-testid="disclaimer-section"
      className="relative py-16 md:py-24 border-t border-zinc-900"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-emerald-500/20 bg-[#070B09] p-8 md:p-10 flex gap-6 items-start overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-500/30 grid place-items-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400" strokeWidth={1.7} />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-emerald-400 mb-3">
              Honest note
            </div>
            <p className="font-display text-2xl md:text-[28px] leading-snug tracking-tight text-white text-balance">
              This tool does not provide buy or sell signals.
            </p>
            <p className="mt-3 text-zinc-400 leading-relaxed max-w-2xl">
              Compression Ladder is a structure tool. It helps you understand what the market
              is doing across timeframes so you can make better decisions — not predictions,
              not promises.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
