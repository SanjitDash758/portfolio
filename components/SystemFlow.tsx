"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { systemFlow } from "@/lib/content";
import { onOpenFlowNode } from "@/lib/flowBus";

// icons per node — matches hero flow for visual continuity
const iconFor: Record<string, string> = {
  request: "↓",
  api: "◆",
  db: "▣",
  agent: "◉",
  tools: "▸",
  automation: "✦",
};

export default function SystemFlow() {
  const [active, setActive] = useState<string>("request");

  // Listen for clicks from the hero flow
  useEffect(() => {
    const unsubscribe = onOpenFlowNode((id) => {
      setActive(id);
    });
    return () => unsubscribe();
  }, []);

  // Keyboard nav: left / right arrows cycle through nodes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const idx = systemFlow.findIndex((n) => n.id === active);
      const next =
        e.key === "ArrowRight"
          ? (idx + 1) % systemFlow.length
          : (idx - 1 + systemFlow.length) % systemFlow.length;
      setActive(systemFlow[next].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const activeNode = systemFlow.find((n) => n.id === active)!;
  const activeIndex = systemFlow.findIndex((n) => n.id === active);

  return (
    <section id="flow" className="mx-auto max-w-6xl px-6 py-24">
      {/* Section heading */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <div className="text-xs text-muted">
            <span className="text-accent">$</span> cat system-flow.json
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            How a request becomes an action.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-fg/70">
            Click any node to see what happens at that layer.
          </p>
        </div>
        <div className="hidden text-[10px] text-muted md:block">
          <span className="rounded border border-border px-1.5 py-0.5">←</span>{" "}
          <span className="rounded border border-border px-1.5 py-0.5">→</span>{" "}
          to navigate
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* LEFT — flow diagram */}
        <div className="relative rounded-xl border border-border/60 bg-panel/40 p-5 backdrop-blur-sm">
          {/* header */}
          <div className="mb-4 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-2 text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="tracking-widest">SYSTEM FLOW</span>
            </div>
            <span className="tracking-widest text-muted">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(systemFlow.length).padStart(2, "0")}
            </span>
          </div>

          {/* spine + nodes */}
          <div className="relative flex flex-col gap-3">
            {/* vertical spine */}
            <div className="pointer-events-none absolute left-[30px] top-4 bottom-4 w-px bg-border/70" />

            {systemFlow.map((node, i) => {
              const isActive = node.id === active;
              return (
                <motion.button
                  key={node.id}
                  type="button"
                  onClick={() => setActive(node.id)}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 2 }}
                  className="group relative z-10 flex items-center gap-4 text-left focus:outline-none"
                  aria-pressed={isActive}
                  aria-label={`Show ${node.label} details`}
                >
                  {/* spine bubble */}
                  <span
                    className={`relative flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border text-[8px] transition-colors ${
                      isActive
                        ? "border-accent bg-accent text-bg"
                        : "border-border bg-bg text-muted group-hover:border-accent/50"
                    }`}
                  >
                    {i + 1}
                    {isActive && (
                      <motion.span
                        layoutId="flow-ping"
                        className="absolute -inset-1 rounded-full bg-accent/20"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </span>

                  {/* card */}
                  <div
                    className={`relative flex flex-1 items-center justify-between rounded-md border px-4 py-3 transition-colors ${
                      isActive
                        ? "border-accent bg-accent/5"
                        : "border-border bg-panel group-hover:border-accent/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-3 text-center text-[11px] ${
                          isActive ? "text-accent" : "text-accent/60"
                        }`}
                      >
                        {iconFor[node.id]}
                      </span>
                      <span
                        className={`text-[11px] font-semibold tracking-[0.14em] ${
                          isActive ? "text-fg" : "text-fg/80"
                        }`}
                      >
                        {node.label}
                      </span>
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.18em] text-muted">
                      {node.short}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* RIGHT — detail panel */}
        <div className="rounded-xl border border-border/60 bg-panel/40 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between text-[10px] text-muted">
            <span className="tracking-widest">DETAIL</span>
            <span className="tracking-widest">
              {activeNode.label.toLowerCase()}.ts
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-accent text-xs">{activeNode.short}</div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">
                {activeNode.label}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-fg/75">
                {activeNode.detail}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Footer nav within the panel */}
          <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-4 text-[10px] text-muted">
            <button
              onClick={() => {
                const prev =
                  (activeIndex - 1 + systemFlow.length) % systemFlow.length;
                setActive(systemFlow[prev].id);
              }}
              className="rounded border border-border px-2 py-1 transition-colors hover:border-accent/40 hover:text-fg"
            >
              ← prev
            </button>
            <span>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(systemFlow.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => {
                const next = (activeIndex + 1) % systemFlow.length;
                setActive(systemFlow[next].id);
              }}
              className="rounded border border-border px-2 py-1 transition-colors hover:border-accent/40 hover:text-fg"
            >
              next →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
