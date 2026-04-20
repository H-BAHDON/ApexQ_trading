/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#030303",
          s1: "#0A0A0A",
          s2: "#121212",
        },
        line: {
          DEFAULT: "#27272A",
          light: "#3F3F46",
        },
      },
      fontFamily: {
        display: ["'Cabinet Grotesk'", "'IBM Plex Sans'", "system-ui", "sans-serif"],
        body: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      boxShadow: {
        glow: "0 0 60px -20px rgba(16,185,129,0.35)",
        glowRed: "0 0 60px -20px rgba(239,68,68,0.35)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "ticker": "ticker 40s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
