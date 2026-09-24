"use client";
import { useEffect, useState } from "react";

export type TocItem = {
  id: string;
  label: string;
};

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-24">
      <div className="text-[10px] tracking-widest text-muted">
        ON THIS PAGE
      </div>
      <ul className="mt-3 space-y-2 border-l border-border/60">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <li key={it.id} className="relative">
              {isActive && (
                <span className="absolute -left-px top-0 h-full w-px bg-accent" />
              )}
              <a
                href={`#${it.id}`}
                className={`block pl-4 text-xs transition-colors ${
                  isActive
                    ? "text-accent"
                    : "text-muted hover:text-fg"
                }`}
              >
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
