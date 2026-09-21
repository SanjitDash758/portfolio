"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const root = document.documentElement;
    if (next === "light") root.classList.add("light");
    else root.classList.remove("light");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  // Prevent icon flash before mount
  const showLight = mounted && theme === "light";

  return (
    <button
      onClick={toggle}
      aria-label={showLight ? "Switch to dark mode" : "Switch to light mode"}
      className="relative flex h-8 w-8 items-center justify-center rounded-md border border-border bg-panel text-muted transition-colors hover:border-accent/40 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={showLight ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.18 }}
          className="absolute"
        >
          {showLight ? <Sun size={14} /> : <Moon size={14} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
