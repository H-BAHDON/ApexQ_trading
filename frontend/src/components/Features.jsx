import React from "react";
import { motion } from "framer-motion";
import { Compass, Layers, Target } from "lucide-react";

const ITEMS = [
  {
    icon: Layers,
    label: "01 · Detection",
    title: "Multi-timeframe compression detection",
    body:
      "Finds range-bound zones across 15m, 1H, 4H, 1D and 1W simultaneously — stacked on a single view so you can see which timeframe is in control.",
  },
  {
    icon: Compass,
    label: "02 · Structure",
    title: "Clean rails, no indicator noise",
    body:
      "Instead of lagging oscillators, Compression Ladder plots horizontal structure levels — the price zones that actually matter for entries and exits.",
  },
  {
    icon: Target,
    label: "03 · Context",
    title: "Better timing for your strategy",
    body:
      "Know when pressure is building, which timeframe will likely lead, and where structure is likely to break. Built to enhance the strategy you already run.",
  },
];

export default function Features() {
  return (
    <section id="features" data-testid="features-section" className="relative py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-zinc-500 mb-4">
              <span className="text-emerald-400">— </span>Clarity over noise
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight font-medium max-w-3xl text-balance">
              One view. Every timeframe. No guesswork.
            </h2>
          </div>
          <p className="max-w-md text-zinc-400 leading-relaxed">
            Built for traders who already have a strategy and want cleaner context —
            not another signal. Structure is the edge; everything else is noise.
          </p>
        </div>

        <div
          data-testid="features-grid"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              data-testid={`feature-card-${i + 1}`}
              className="group relative rounded-2xl border border-zinc-800 bg-[#0A0A0A] p-8 overflow-hidden hover:border-zinc-700 transition-colors"
            >
              {/* rail motif */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 rail-grid opacity-20 pointer-events-none" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#121212] border border-zinc-800 grid place-items-center">
                    <item.icon className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.2em] text-zinc-600">
                    {item.label}
                  </div>
                </div>
                <h3 className="mt-10 font-display text-2xl md:text-[26px] tracking-tight font-medium text-white leading-snug">
                  {item.title}
                </h3>
                <p className="mt-4 text-zinc-400 leading-relaxed">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
