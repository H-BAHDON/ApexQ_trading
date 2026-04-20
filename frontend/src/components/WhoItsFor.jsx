import React from "react";
import { motion } from "framer-motion";

const FOR = [
  "Traders with an existing edge who need cleaner timing",
  "Price-action readers who live on structure",
  "Swing + intraday traders managing multiple timeframes",
];
const NOT_FOR = [
  "Complete beginners looking for buy / sell signals",
  "Automated signal copy-trading",
  "Anyone expecting predictions or promises",
];

export default function WhoItsFor() {
  return (
    <section
      id="audience"
      data-testid="audience-section"
      className="relative py-28 md:py-36 border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-zinc-500 mb-4">
              <span className="text-emerald-400">— </span>Who it's for
            </div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight font-medium text-balance">
              Built for traders who <span className="text-zinc-500">already have a strategy.</span>
            </h2>
            <p className="mt-6 text-zinc-400 leading-relaxed max-w-xl">
              Compression Ladder isn't here to replace your edge. It sharpens it — by making
              market structure obvious across every timeframe you care about.
            </p>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-800 bg-[#0A0A0A] p-8"
              data-testid="for-card"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-emerald-400 mb-4">
                Built for
              </div>
              <ul className="space-y-3 text-zinc-200">
                {FOR.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-2 w-6 h-px bg-emerald-500 shrink-0" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-zinc-900 bg-[#070707] p-8"
              data-testid="not-for-card"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">
                Not built for
              </div>
              <ul className="space-y-3 text-zinc-500">
                {NOT_FOR.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-2 w-6 h-px bg-zinc-700 shrink-0" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
