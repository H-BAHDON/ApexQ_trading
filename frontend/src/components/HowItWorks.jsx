import React from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    step: "01",
    title: "Higher timeframes compress",
    subtitle: "Market is building pressure",
    body:
      "Price coils on the 4H / 1D. Volatility drops. Rails tighten. This is where most traders get bored — and this is exactly where the setup forms.",
    tag: "HTF · 4H / 1D",
    width: "w-full",
  },
  {
    step: "02",
    title: "Lower timeframes react first",
    subtitle: "Early structure movement",
    body:
      "The 5m / 15m start to break internal rails while HTF structure holds. Compression Ladder shows which level is cracking, and in which direction.",
    tag: "LTF · 5m / 15m",
    width: "w-[85%]",
  },
  {
    step: "03",
    title: "Expansion and opportunity",
    subtitle: "Pressure releases",
    body:
      "When the dominant timeframe gives way, the move is usually clean. You're no longer guessing — you're executing your strategy with context.",
    tag: "EXPANSION",
    width: "w-[70%]",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      data-testid="how-it-works-section"
      className="relative py-28 md:py-40 border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-16 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.24em] text-zinc-500 mb-4">
            <span className="text-emerald-400">— </span>How it works
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight font-medium text-balance">
            Markets don't move randomly. They <span className="text-emerald-400">compress</span>,
            then expand.
          </h2>
        </div>

        <div className="space-y-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              data-testid={`step-${i + 1}`}
              className={`${s.width} relative ml-0 rounded-2xl border border-zinc-800 bg-[#0A0A0A] p-8 md:p-10 flex gap-8 md:gap-12 items-start overflow-hidden`}
            >
              <div className="text-emerald-400 font-mono text-sm tracking-widest shrink-0 pt-1">
                {s.step}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-display text-xl md:text-2xl tracking-tight font-medium">
                    {s.title}
                  </h3>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 px-2 py-1 border border-zinc-800 rounded-full">
                    {s.tag}
                  </span>
                </div>
                <div className="mt-1 text-sm text-zinc-500">{s.subtitle}</div>
                <p className="mt-4 text-zinc-400 leading-relaxed max-w-2xl">{s.body}</p>
              </div>
              {/* Rails visual */}
              <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-l from-emerald-500/5 to-transparent" />
                <div className="absolute top-1/2 right-6 -translate-y-1/2 flex flex-col gap-2 items-end">
                  {Array.from({ length: 3 - i }).map((_, k) => (
                    <div
                      key={k}
                      className="h-px bg-emerald-500/40"
                      style={{ width: `${120 - k * 30}px` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
