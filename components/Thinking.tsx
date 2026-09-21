"use client";
import { useState } from "react";

export default function Thinking() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return setState("err");
    // TODO: wire to a real endpoint (Resend, Buttondown, Formspree)
    // await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
    setState("ok");
  }

  return (
    <section id="notes" className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-6 text-xs text-muted">
        <span className="text-accent">$</span> cat notes.md
      </div>

      <div className="rounded-md border border-border bg-panel p-6">
        <div className="text-sm text-fg/80">
          I'm drafting a few notes on backend architecture, agent design, and
          where deterministic workflows end. Nothing published yet.
        </div>

        <form onSubmit={submit} className="mt-5 flex max-w-md gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            className="flex-1 rounded-md border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
            aria-label="Email"
          />
          <button
            type="submit"
            className="rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-xs text-accent hover:bg-accent/20"
          >
            notify me
          </button>
        </form>

        {state === "ok" && (
          <div className="mt-3 text-xs text-accent">✓ You're on the list.</div>
        )}
        {state === "err" && (
          <div className="mt-3 text-xs text-danger">
            Please enter a valid email.
          </div>
        )}
      </div>
    </section>
  );
}
