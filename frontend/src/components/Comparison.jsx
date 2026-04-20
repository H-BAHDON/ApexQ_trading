import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const BAD = [
  "Lagging oscillator signals",
  "Overcomplicated indicator stacks",
  "One-timeframe tunnel vision",
  "'Buy here / sell here' noise",
];

const GOOD = [
  "Pure structure — rails, not boxes",
  "Multi-timeframe context, one view",
  "Enhances the strategy you already trade",
  "Shows when nothing is happening",
];

export default function Comparison() {
  return (
    <section
      id="why"
      data-testid="comparison-section"
      className="relative py-28 md:py-40 border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-16 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.24em] text-zinc-500 mb-4">
            <span className="text-emerald-400">— </span>Why it's different
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight font-medium text-balance">
            Most tools shout. <span className="text-zinc-500">This one shows you structure.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-testid="traditional-col"
            className="relative rounded-2xl border border-zinc-900 bg-[#0A0A0A] p-8 md:p-10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.24em] text-red-400/80 mb-6">
                Typical indicators
              </div>
              <ul className="space-y-4">
                {BAD.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-400">
                    <span className="mt-1 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/30 grid place-items-center shrink-0">
                      <X className="w-3 h-3 text-red-400" strokeWidth={2.5} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-testid="compression-col"
            className="relative rounded-2xl border border-emerald-500/30 bg-[#0A0A0A] p-8 md:p-10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.24em] text-emerald-400 mb-6">
                Compression Ladder
              </div>
              <ul className="space-y-4">
                {GOOD.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white">
                    <span className="mt-1 w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/40 grid place-items-center shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" strokeWidth={2.5} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
