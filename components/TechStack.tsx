"use client";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiRedis,
  SiCelery,
  SiDocker,
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiWoocommerce,
  SiSupabase,
  SiPrometheus,
} from "react-icons/si";

type StackItem = {
  name: string;
  Icon: IconType;
  color: string;
};

const stack: StackItem[] = [
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "Redis", Icon: SiRedis, color: "#FF4438" },
  { name: "Celery", Icon: SiCelery, color: "#37814A" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Next.js", Icon: SiNextdotjs, color: "currentColor" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "WooCommerce", Icon: SiWoocommerce, color: "#96588A" },
  { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
  { name: "Prometheus", Icon: SiPrometheus, color: "#E6522C" },
];

// Duration of one full pass (seconds). Higher = slower.
const SCROLL_DURATION_SEC = 40;

export default function TechStack() {
  // Duplicate the array so the loop is seamless.
  // The CSS animation moves the track exactly 50% of its width,
  // which is the width of one copy — so the reset is invisible.
  const items = [...stack, ...stack];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-6 text-center text-xs text-muted">
        <span className="text-accent">$</span> ls stack/
      </div>

      <div className="relative mx-auto w-[80%] overflow-hidden">
        {/* Left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32"
          style={{
            background:
              "linear-gradient(to right, var(--color-bg), transparent)",
          }}
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32"
          style={{
            background:
              "linear-gradient(to left, var(--color-bg), transparent)",
          }}
        />

        {/* The scrolling track — pure CSS animation, GPU-accelerated */}
        <div
          className="tech-stack-track flex gap-3 whitespace-nowrap"
          style={{
            animationDuration: `${SCROLL_DURATION_SEC}s`,
          }}
        >
          {items.map(({ name, Icon, color }, i) => (
            <div
              key={`${name}-${i}`}
              className="flex shrink-0 items-center gap-2.5 rounded-md border border-border/60 bg-panel/40 px-4 py-2.5 backdrop-blur-sm text-fg"
            >
              <Icon size={16} style={{ color }} className="shrink-0" />
              <span className="text-xs text-fg/80">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
