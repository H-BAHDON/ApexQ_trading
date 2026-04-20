import React from "react";

/**
 * Stylized SVG chart mock that mimics a TradingView candlestick view
 * with three compression rails (the "ladder") stacking down.
 * Purely decorative — no library, no network calls.
 */
export default function ChartMock() {
  // Pre-generated candle data (deterministic for look consistency)
  const candles = generateCandles();
  const width = 1200;
  const height = 440;
  const padX = 20;
  const padY = 20;
  const candleW = (width - padX * 2) / candles.length;

  // Price range for mapping
  const allVals = candles.flatMap((c) => [c.h, c.l]);
  const min = Math.min(...allVals);
  const max = Math.max(...allVals);
  const pad = (max - min) * 0.1;
  const yMin = min - pad;
  const yMax = max + pad;
  const yScale = (v) => padY + (1 - (v - yMin) / (yMax - yMin)) * (height - padY * 2);
  const xOf = (i) => padX + i * candleW + candleW / 2;

  // Three compression zones (ladder)
  const zones = [
    { x1: 18, x2: 45, top: 1.438, bottom: 1.412, color: "rgba(239,68,68,0.16)", border: "#EF4444" },
    { x1: 55, x2: 78, top: 1.415, bottom: 1.39, color: "rgba(239,68,68,0.16)", border: "#EF4444" },
    { x1: 85, x2: 118, top: 1.432, bottom: 1.407, color: "rgba(239,68,68,0.16)", border: "#EF4444" },
  ];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[300px] md:h-[440px] block">
      {/* Subtle grid */}
      <g opacity="0.25">
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            x2={width}
            y1={(height / 7) * (i + 1)}
            y2={(height / 7) * (i + 1)}
            stroke="#1a1a1f"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* Compression zones (rails) */}
      {zones.map((z, i) => {
        const x1 = padX + z.x1 * candleW;
        const x2 = padX + z.x2 * candleW;
        const yTop = yScale(z.top);
        const yBot = yScale(z.bottom);
        return (
          <g key={i}>
            <rect
              x={x1}
              y={yTop}
              width={x2 - x1}
              height={yBot - yTop}
              fill={z.color}
              stroke="none"
            />
            <line x1={x1} y1={yTop} x2={x2} y2={yTop} stroke={z.border} strokeWidth="1.4" />
            <line x1={x1} y1={yBot} x2={x2} y2={yBot} stroke={z.border} strokeWidth="1.4" />
          </g>
        );
      })}

      {/* Candles */}
      {candles.map((c, i) => {
        const x = xOf(i);
        const isUp = c.c >= c.o;
        const color = isUp ? "#10B981" : "#EF4444";
        const bodyTop = yScale(Math.max(c.o, c.c));
        const bodyBottom = yScale(Math.min(c.o, c.c));
        const wickTop = yScale(c.h);
        const wickBottom = yScale(c.l);
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={wickTop} y2={wickBottom} stroke={color} strokeWidth="1" />
            <rect
              x={x - candleW * 0.35}
              y={bodyTop}
              width={candleW * 0.7}
              height={Math.max(1, bodyBottom - bodyTop)}
              fill={color}
              opacity={isUp ? 0.95 : 0.9}
            />
          </g>
        );
      })}

      {/* Right axis price */}
      <g>
        <line x1={width - 60} x2={width - 60} y1="0" y2={height} stroke="#1a1a1f" strokeWidth="1" />
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const v = yMin + (yMax - yMin) * (1 - t);
          return (
            <text
              key={i}
              x={width - 50}
              y={padY + t * (height - padY * 2)}
              fill="#52525B"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
              alignmentBaseline="middle"
            >
              {v.toFixed(4)}
            </text>
          );
        })}
      </g>

      {/* Current price pill */}
      <g>
        <rect
          x={width - 70}
          y={yScale(candles[candles.length - 1].c) - 9}
          width={58}
          height={18}
          rx={3}
          fill="#10B981"
        />
        <text
          x={width - 41}
          y={yScale(candles[candles.length - 1].c) + 3}
          fill="#03110B"
          fontSize="10"
          fontFamily="JetBrains Mono, monospace"
          textAnchor="middle"
        >
          {candles[candles.length - 1].c.toFixed(4)}
        </text>
      </g>
    </svg>
  );
}

function generateCandles() {
  // Deterministic-ish candles that walk up-down to look like XRP chart
  const out = [];
  let price = 1.43;
  const seq = [
    -0.001, 0.002, 0.003, -0.004, 0.002, -0.003, 0.004, 0.006, -0.002, -0.001,
    0.002, -0.003, -0.004, -0.002, 0.003, -0.001, -0.002, -0.004, -0.006, -0.008,
    -0.004, -0.006, -0.002, -0.003, 0.002, -0.002, -0.004, -0.003, -0.002, -0.005,
    -0.003, -0.002, 0.001, -0.002, -0.004, -0.006, -0.008, -0.004, -0.006, -0.009,
    -0.004, 0.002, 0.004, 0.006, 0.003, -0.002, 0.001, -0.003, -0.002, -0.004,
    -0.003, -0.006, -0.003, -0.002, 0.002, 0.005, 0.004, 0.006, 0.002, -0.003,
    0.001, 0.002, 0.003, -0.002, 0.005, 0.003, -0.001, 0.002, 0.004, 0.005,
    0.006, 0.002, 0.003, 0.001, -0.002, 0.003, 0.004, 0.002, 0.006, 0.003,
    0.004, 0.005, 0.002, 0.003, 0.001, -0.002, -0.001, 0.003, 0.004, 0.006,
    0.002, -0.001, 0.001, 0.002, 0.001, -0.002, 0.003, 0.002, 0.001, 0.002,
    -0.001, 0.002, 0.003, -0.001, 0.002, 0.002, 0.001, 0.003, 0.002, -0.001,
    0.002, 0.003, 0.001, -0.001, 0.002, 0.002, 0.001, 0.002, 0.001, 0.002,
  ];
  for (let i = 0; i < seq.length; i++) {
    const o = price;
    const c = +(price + seq[i]).toFixed(5);
    const h = +(Math.max(o, c) + Math.random() * 0.002).toFixed(5);
    const l = +(Math.min(o, c) - Math.random() * 0.002).toFixed(5);
    out.push({ o, h, l, c });
    price = c;
  }
  return out;
}
