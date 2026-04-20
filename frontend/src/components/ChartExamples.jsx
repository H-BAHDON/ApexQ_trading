import React from "react";
import { motion } from "framer-motion";

const EXAMPLES = [
  {
    img: "https://customer-assets.emergentagent.com/job_fe098322-8da8-4e4d-9beb-8123760d25cd/artifacts/q27c7snq_image.png",
    caption: "Compression before expansion",
    detail:
      "Three stacked compression zones on XRP / USD · 5m. Price holds the higher-timeframe rail before breaking into the next level.",
    tag: "5m · Kraken",
  },
  {
    img: "https://customer-assets.emergentagent.com/job_fe098322-8da8-4e4d-9beb-8123760d25cd/artifacts/abwuw9e7_image.png",
    caption: "Structure holding across timeframes",
    detail:
      "1H view showing HTF compression zone acting as support. Nested LTF structure stacked below — the ladder is intact until broken.",
    tag: "1H · Multi-TF",
  },
];

export default function ChartExamples() {
  return (
    <section
      id="examples"
      data-testid="chart-examples-section"
      className="relative py-28 md:py-40 border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-16 flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-zinc-500 mb-4">
              <span className="text-emerald-400">— </span>Chart examples
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight font-medium max-w-3xl text-balance">
              Real charts. Clear levels. No guesswork.
            </h2>
          </div>
          <div className="text-sm text-zinc-500 max-w-sm">
            Examples below are from live market sessions. Compression Ladder marks the rails —
            you decide what to do with them.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {EXAMPLES.map((e, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              data-testid={`example-card-${i + 1}`}
              className="group relative rounded-2xl border border-zinc-800 bg-[#0A0A0A] overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 h-9 border-b border-zinc-900 bg-[#070707]">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <div className="ml-4 text-[11px] font-mono text-zinc-500 tracking-wide">
                  {e.tag}
                </div>
              </div>
              <div className="relative">
                <img
                  src={e.img}
                  alt={e.caption}
                  className="w-full h-auto block"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
              </div>
              <figcaption className="p-6 md:p-8 border-t border-zinc-900">
                <div className="font-display text-xl md:text-2xl tracking-tight text-white">
                  {e.caption}
                </div>
                <p className="mt-3 text-zinc-400 leading-relaxed">{e.detail}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex items-center gap-3 text-[13px] text-zinc-500"
        >
          <span className="font-mono text-emerald-400">{"//"}</span>
          <span>Compression zones visible across 15m → 1D, plotted as rails not boxes.</span>
        </motion.div>
      </div>
    </section>
  );
}
