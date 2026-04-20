import React, { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getCheckoutStatus } from "../lib/api";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

export default function Success() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState("checking"); // checking | paid | pending | expired | error
  const [attempts, setAttempts] = useState(0);
  const poller = useRef(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }
    let cancelled = false;
    const maxAttempts = 8;

    const poll = async (n) => {
      if (cancelled) return;
      try {
        const res = await getCheckoutStatus(sessionId);
        if (res.payment_status === "paid") {
          setStatus("paid");
          return;
        }
        if (res.status === "expired") {
          setStatus("expired");
          return;
        }
        setStatus("pending");
        if (n >= maxAttempts) return;
        poller.current = setTimeout(() => {
          setAttempts(n + 1);
          poll(n + 1);
        }, 2500);
      } catch (e) {
        setStatus("error");
      }
    };

    poll(0);
    return () => {
      cancelled = true;
      if (poller.current) clearTimeout(poller.current);
    };
  }, [sessionId]);

  return (
    <div
      className="min-h-screen bg-bg-base text-white flex items-center justify-center px-6"
      data-testid="success-page"
    >
      <div className="max-w-lg w-full relative">
        <div className="absolute -inset-10 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="relative rounded-3xl border border-zinc-800 bg-[#0A0A0A] p-10 text-center">
          {status === "paid" && (
            <>
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/40 grid place-items-center mx-auto">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" strokeWidth={1.5} />
              </div>
              <h1 className="font-display text-3xl md:text-4xl tracking-tight font-medium mt-6">
                You're in.
              </h1>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Payment confirmed. Your Compression Ladder access link will be delivered to
                your email within the next few minutes. If you don't see it, check spam or
                reach out on the contact form.
              </p>
              <Link
                to="/"
                data-testid="success-home-link"
                className="mt-8 inline-flex items-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-full font-medium hover:bg-emerald-400 transition-colors"
              >
                Back to site →
              </Link>
            </>
          )}
          {(status === "checking" || status === "pending") && (
            <>
              <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 grid place-items-center mx-auto">
                <Loader2 className="w-7 h-7 text-emerald-400 animate-spin" strokeWidth={1.5} />
              </div>
              <h1 className="font-display text-3xl tracking-tight font-medium mt-6">
                Verifying payment…
              </h1>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Hang tight for a moment. {attempts > 0 && `Checked ${attempts} time${attempts > 1 ? "s" : ""}.`}
              </p>
            </>
          )}
          {status === "expired" && (
            <>
              <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/40 grid place-items-center mx-auto">
                <XCircle className="w-7 h-7 text-red-400" strokeWidth={1.5} />
              </div>
              <h1 className="font-display text-3xl tracking-tight font-medium mt-6">
                Session expired
              </h1>
              <p className="mt-4 text-zinc-400">The checkout session expired. Please try again.</p>
              <Link
                to="/"
                className="mt-8 inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-emerald-400 transition-colors"
              >
                Go back →
              </Link>
            </>
          )}
          {status === "error" && (
            <>
              <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/40 grid place-items-center mx-auto">
                <XCircle className="w-7 h-7 text-red-400" strokeWidth={1.5} />
              </div>
              <h1 className="font-display text-3xl tracking-tight font-medium mt-6">
                Something went wrong
              </h1>
              <p className="mt-4 text-zinc-400">
                We couldn't verify your session. If you were charged, please contact us.
              </p>
              <Link
                to="/"
                className="mt-8 inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-emerald-400 transition-colors"
              >
                Go back →
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
