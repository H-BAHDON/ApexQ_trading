import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#030303]/75 border-b border-zinc-900"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-2 group">
          <LogoMark />
          <div className="leading-none">
            <div className="font-display text-[15px] tracking-tight font-semibold text-white">
              ApexQ
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500 mt-0.5">
              Compression Ladder
            </div>
          </div>
        </Link>

        <nav
          data-testid="nav-links"
          className="hidden md:flex items-center gap-8 text-sm text-zinc-400"
        >
          <a href="#features" onClick={scrollTo("features")} className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#how" onClick={scrollTo("how")} className="hover:text-white transition-colors">
            How it works
          </a>
          <a href="#examples" onClick={scrollTo("examples")} className="hover:text-white transition-colors">
            Examples
          </a>
          <a href="#pricing" onClick={scrollTo("pricing")} className="hover:text-white transition-colors">
            Pricing
          </a>
        </nav>

        <a
          href="#pricing"
          onClick={scrollTo("pricing")}
          data-testid="nav-get-access-btn"
          className="group inline-flex items-center gap-2 text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-emerald-400 transition-colors"
        >
          Get Access
          <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <div className="relative w-8 h-8 grid place-items-center">
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <defs>
          <linearGradient id="aq" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="30" height="30" rx="8" fill="#0A0A0A" stroke="#27272A" />
        {/* three ladder rungs */}
        <line x1="8" y1="11" x2="24" y2="11" stroke="url(#aq)" strokeWidth="1.5" />
        <line x1="8" y1="16" x2="20" y2="16" stroke="#3F3F46" strokeWidth="1.5" />
        <line x1="8" y1="21" x2="18" y2="21" stroke="#3F3F46" strokeWidth="1.5" />
        <circle cx="24" cy="11" r="2" fill="#10B981" />
      </svg>
    </div>
  );
}
