import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Instagram } from "lucide-react";
import { sendContact } from "../lib/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.includes("@") || msg.trim().length < 4) {
      toast.error("Please enter a valid email and message");
      return;
    }
    try {
      setLoading(true);
      await sendContact({ email, message: msg });
      toast.success("Message sent. We'll get back to you.");
      setEmail("");
      setMsg("");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not send");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      id="contact"
      data-testid="site-footer"
      className="relative border-t border-zinc-900 bg-[#020202]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-emerald-500 to-red-500/80 grid place-items-center">
                <span className="font-display text-black font-bold text-sm">A</span>
              </div>
              <div className="font-display text-white font-semibold tracking-tight">
                ApexQ
              </div>
            </div>
            <p className="mt-5 text-zinc-500 leading-relaxed max-w-sm">
              Quiet, structure-based tools for traders who've done the work.
              Compression Ladder is the first tool in the ApexQ series.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                data-testid="footer-instagram"
                className="w-9 h-9 rounded-full border border-zinc-800 grid place-items-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <Link
                to="/terms"
                data-testid="footer-terms-link"
                className="text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <a
                href="#contact"
                className="text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-zinc-500 mb-4">
              Contact
            </div>
            <form
              onSubmit={submit}
              className="space-y-3"
              data-testid="footer-contact-form"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                data-testid="footer-email-input"
                className="w-full bg-[#0A0A0A] border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/60 transition"
              />
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Your message…"
                rows={3}
                data-testid="footer-message-input"
                className="w-full bg-[#0A0A0A] border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/60 transition resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                data-testid="footer-submit-btn"
                className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-emerald-400 transition-colors disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send"}
                <span>→</span>
              </button>
            </form>
          </div>
        </div>

        <div className="hairline mt-16" />

        <div className="mt-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs text-zinc-600">
          <div>
            © {new Date().getFullYear()} ApexQ. All rights reserved.
          </div>
          <div className="max-w-2xl leading-relaxed">
            Compression Ladder is a market-structure tool for educational use. It does not
            provide buy / sell signals or financial advice. Trading involves risk — only
            trade what you can afford to lose.
          </div>
        </div>
      </div>
    </footer>
  );
}
