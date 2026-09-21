"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const sections = [
  { id: "top", label: "~/" },
  { id: "flow", label: "flow" },
  { id: "work", label: "projects" },
  { id: "writing", label: "blog" },
  { id: "notes", label: "notes" },
  { id: "contact", label: "contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("top");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // If we're near the top of the page, force the active item to "top".
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (window.scrollY < 80) setActive("top");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Otherwise, use IntersectionObserver to track the current section.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function go(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-3">
        {/* Brand — clicking still scrolls to top, but is no longer part of the pill list */}
        <button
          onClick={() => go("top")}
          className="group flex items-center gap-2 text-xs"
          aria-label="Scroll to top"
        >
          <span className="text-accent">$</span>
          <span className="text-fg/80 group-hover:text-fg">sanjit</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="inline-block h-3 w-[6px] bg-accent"
          />
        </button>

        {/* Section links — now includes ~/ so the pill can slide to it */}
        <ul className="flex items-center gap-1 rounded-full border border-border bg-panel/70 p-1 backdrop-blur-sm">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  className={`relative rounded-full px-3 py-1.5 text-[11px] transition-colors ${
                    isActive ? "text-[#0a0b0d]" : "text-muted hover:text-fg"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{s.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Theme toggle */}
        <ThemeToggle />
      </nav>
    </header>
  );
}
