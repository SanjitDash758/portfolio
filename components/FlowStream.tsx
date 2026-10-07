"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const flow = [
  { label: "Request", sub: "Incoming HTTP", icon: "↓" },
  { label: "FastAPI", sub: "Validate + route", icon: "◆" },
  { label: "PostgreSQL", sub: "Persist state", icon: "▣" },
  { label: "Redis", sub: "Idempotency cache", icon: "◈" },
  { label: "Celery", sub: "Async worker", icon: "◐" },
  { label: "Agent", sub: "Reason + decide", icon: "◉" },
  { label: "Tools", sub: "External calls", icon: "▸" },
  { label: "Webhook", sub: "Execute + act", icon: "✦" },
];

// How long each card stays on screen (ms)
const STEP_MS = 2400;

export default function FlowStream() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % flow.length);
    }, STEP_MS);
    return () => clearInterval(t);
  }, []);

  // Show the current and the next card
  const current = flow[index];
  const next = flow[(index + 1) % flow.length];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-6 text-center text-xs text-muted">
        <span className="text-accent">$</span> cat flow.log
      </div>

      <div className="relative mx-auto flex w-[80%] items-center justify-center gap-0">
        {/* Current card — enters from left, exits left */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`cur-${index}`}
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -80, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative z-10 flex h-40 w-64 shrink-0 flex-col justify-between rounded-xl border border-border/60 bg-panel/60 p-5 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg text-accent">{current.icon}</span>
              <span className="text-[9px] tracking-widest text-muted">
                ACTIVE
              </span>
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">
                {current.label}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-muted">
                {current.sub}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Connector — dotted line with a traveling dot */}
        <div className="relative mx-4 h-0.5 w-24 shrink-0">
          {/* Base dotted line */}
          <div className="absolute inset-0 flex items-center">
            <div
              className="h-0.5 w-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, var(--color-border) 0, var(--color-border) 4px, transparent 4px, transparent 8px)",
              }}
            />
          </div>
          {/* Traveling dot */}
          <motion.div
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(34,211,168,0.6)]"
            animate={{ left: ["0%", "100%"] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Next card — enters from right, exits right */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`next-${index}`}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
            className="relative z-10 flex h-40 w-64 shrink-0 flex-col justify-between rounded-xl border border-border/60 bg-panel/40 p-5 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg text-accent/70">{next.icon}</span>
              <span className="text-[9px] tracking-widest text-muted">
                NEXT
              </span>
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight text-fg/80">
                {next.label}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-muted">
                {next.sub}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress indicator — dots showing where in the flow we are */}
      <div className="mt-8 flex items-center justify-center gap-1.5">
        {flow.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index ? "w-6 bg-accent" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
