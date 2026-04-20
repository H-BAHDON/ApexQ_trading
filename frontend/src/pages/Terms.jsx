import React from "react";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="min-h-screen bg-bg-base text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-sm text-zinc-500 hover:text-white">
          ← Back
        </Link>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight font-medium mt-8">
          Terms &amp; Disclaimer
        </h1>
        <div className="mt-8 space-y-5 text-zinc-400 leading-relaxed">
          <p>
            ApexQ and the Compression Ladder tool are provided for educational and
            informational purposes only. Nothing on this website, nor anything produced by
            the tool, constitutes financial, investment, or trading advice.
          </p>
          <p>
            The Compression Ladder tool does not generate buy or sell signals. It is a
            market-structure visualisation designed to help experienced traders read
            multi-timeframe context. You remain solely responsible for your trading
            decisions.
          </p>
          <p>
            Trading in any market involves substantial risk. You may lose some or all of
            your capital. Past market structure does not guarantee future results. Do not
            trade with money you cannot afford to lose.
          </p>
          <p>
            Subscription access is billed monthly via Stripe. You can cancel at any time;
            cancellation stops future billing but does not refund the current billing
            period unless required by law.
          </p>
          <p className="text-zinc-600">© {new Date().getFullYear()} ApexQ.</p>
        </div>
      </div>
    </div>
  );
}
