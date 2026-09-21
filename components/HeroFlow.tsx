"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { openFlowNode } from "@/lib/flowBus";

const nodes = [
  { id: "request", label: "REQUEST", sub: "inbound", icon: "↓" },
  { id: "api", label: "FASTAPI", sub: "validate", icon: "◆" },
  { id: "db", label: "DATABASE", sub: "persist", icon: "▣" },
  { id: "agent", label: "AGENT", sub: "reason", icon: "◉" },
  { id: "tools", label: "TOOLS", sub: "invoke", icon: "▸" },
  { id: "automation", label: "AUTOMATION", sub: "act", icon: "✦" },
];

const LOOP = 9;
const STEP = LOOP / nodes.length;
const NODE_GLOW = 1.6;

export default function HeroFlow() {
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  function handleClick(id: string) {
    openFlowNode(id);
    const el = document.getElementById("flow");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setHovered(null);
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.15]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative flex h-full flex-col rounded-xl border border-border/60 bg-panel/40 p-5 backdrop-blur-sm">
        {/* header */}
        <div className="mb-4 flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-2 text-muted">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                paused ? "bg-amber" : "bg-accent animate-pulse"
              }`}
            />
            <span className="tracking-widest">PIPELINE</span>
          </div>
          <span className="tracking-widest text-muted">
            {paused ? "PAUSED" : "RUNNING"}
          </span>
        </div>

        {/* the flow */}
        <div className="relative flex flex-1 flex-col justify-between">
          <div className="pointer-events-none absolute left-[26px] top-3 bottom-3 w-px bg-border/70" />

          {/* traveling packet — only visible when not paused */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-[21px] z-20 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_16px_4px_rgba(34,211,168,0.65)]"
            initial={{ top: "2%" }}
            animate={{ top: paused ? "2%" : ["2%", "98%"] }}
            transition={{
              duration: LOOP,
              repeat: paused ? 0 : Infinity,
              ease: "linear",
            }}
          />

          {nodes.map((node, i) => {
            const isHovered = hovered === node.id;

            return (
              <motion.button
                key={node.id}
                type="button"
                onClick={() => handleClick(node.id)}
                onMouseEnter={() => setHovered(node.id)}
                onFocus={() => {
                  setPaused(true);
                  setHovered(node.id);
                }}
                onBlur={() => {
                  setPaused(false);
                  setHovered(null);
                }}
                initial={{ opacity: 0.4 }}
                animate={{
                  opacity: paused ? (isHovered ? 1 : 0.5) : [0.4, 1, 0.4],
                }}
                transition={{
                  duration: NODE_GLOW,
                  times: [0, 0.5, 1],
                  repeat: paused ? 0 : Infinity,
                  repeatDelay: LOOP - NODE_GLOW,
                  delay: paused ? 0 : i * STEP,
                  ease: "easeInOut",
                }}
                className="group relative z-10 flex cursor-pointer items-center gap-3 text-left focus:outline-none"
                aria-label={`Open ${node.label} in system flow`}
              >
                <span className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border border-border bg-bg text-[8px] text-muted">
                  {i + 1}
                </span>

                <motion.div
                  animate={
                    paused
                      ? {
                          borderColor: isHovered
                            ? "var(--color-accent)"
                            : "var(--color-border)",
                          boxShadow: isHovered
                            ? "0 0 24px 0 rgba(34,211,168,0.35)"
                            : "0 0 0 0 rgba(34,211,168,0)",
                        }
                      : {
                          borderColor: [
                            "var(--color-border)",
                            "var(--color-accent)",
                            "var(--color-border)",
                          ],
                          boxShadow: [
                            "0 0 0 0 rgba(34,211,168,0)",
                            "0 0 24px 0 rgba(34,211,168,0.35)",
                            "0 0 0 0 rgba(34,211,168,0)",
                          ],
                        }
                  }
                  transition={
                    paused
                      ? { duration: 0.18 }
                      : {
                          duration: NODE_GLOW,
                          times: [0, 0.5, 1],
                          repeat: Infinity,
                          repeatDelay: LOOP - NODE_GLOW,
                          delay: i * STEP,
                          ease: "easeInOut",
                        }
                  }
                  className="flex flex-1 items-center justify-between rounded-md border bg-panel px-3.5 py-2.5 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-3 text-center text-[11px] text-accent/80">
                      {node.icon}
                    </span>
                    <span className="text-[11px] font-semibold tracking-[0.14em]">
                      {node.label}
                    </span>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.18em] text-muted">
                    {node.sub}
                  </span>
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        {/* footer legend */}
        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-[9px] text-muted">
          <span>
            <span className="text-accent">●</span>{" "}
            {paused ? "paused — hover" : "packet in transit"}
          </span>
          <span>{paused ? "click a node ↓" : `${LOOP}s cycle`}</span>
        </div>
      </div>
    </div>
  );
}
