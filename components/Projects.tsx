"use client";
import { motion } from "framer-motion";
import { projects, Project } from "@/lib/content";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Github } from "./BrandIcons";

const statusStyles: Record<Project["status"], string> = {
  live: "border-accent/40 text-accent bg-accent/5",
  "in-progress": "border-amber/40 text-amber bg-amber/5",
  designing: "border-border text-muted bg-panel",
};

const statusLabel: Record<Project["status"], string> = {
  live: "SHIPPED",
  "in-progress": "IN PROGRESS",
  designing: "DESIGNING",
};

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24">
      {/* Section heading */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <div className="text-xs text-muted">
            <span className="text-accent">$</span> ls projects/
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Things I've shipped.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-fg/70">
            Real products, real users, real constraints. Each one taught me
            something the docs couldn't.
          </p>
        </div>
        <div className="hidden text-[10px] text-muted md:block">
          {String(projects.length).padStart(2, "0")} total
        </div>
      </div>

      {/* Featured project */}
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="group relative mb-6 overflow-hidden rounded-xl border border-border/60 bg-panel/40 p-6 backdrop-blur-sm transition-colors hover:border-accent/40 md:p-8"
      >
        {/* Subtle gradient glow on hover */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />

        <div className="relative grid gap-6 md:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="text-muted">01</span>
              <span className="text-border">/</span>
              <span
                className={`rounded-full border px-2 py-0.5 tracking-widest ${statusStyles[featured.status]}`}
              >
                ● {statusLabel[featured.status]}
              </span>
              <span className="text-muted">{featured.lastUpdated}</span>
            </div>

            <h3 className="mt-5 text-2xl font-semibold tracking-tight md:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg/75">
              {featured.blurb}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-xs">
              {featured.live && (
                <a
                  href={featured.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-3 py-1.5 text-accent transition-colors hover:bg-accent/20"
                >
                  <ExternalLink size={12} /> Visit live site
                </a>
              )}
              {featured.repo && (
                <a
                  href={featured.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-panel px-3 py-1.5 text-muted transition-colors hover:border-accent/40 hover:text-fg"
                >
                  <Github size={12} /> View code
                </a>
              )}
            </div>
          </div>

          {/* Right column: stack + tags */}
          <div className="flex flex-col justify-between gap-6 md:border-l md:border-border/60 md:pl-6">
            <div>
              <div className="text-[10px] tracking-widest text-muted">
                STACK
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {featured.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-border px-2 py-0.5 text-[10px] text-fg/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] tracking-widest text-muted">
                FOCUS
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {featured.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-accent/30 bg-accent/5 px-2 py-0.5 text-[10px] text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.article>

      {/* Secondary projects — two-column grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {rest.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-panel/40 p-6 backdrop-blur-sm transition-colors hover:border-accent/40"
          >
            <div className="flex items-center gap-3 text-[10px]">
              <span className="text-muted">
                {String(i + 2).padStart(2, "0")}
              </span>
              <span className="text-border">/</span>
              <span
                className={`rounded-full border px-2 py-0.5 tracking-widest ${statusStyles[p.status]}`}
              >
                ● {statusLabel[p.status]}
              </span>
              <span className="ml-auto text-muted">{p.lastUpdated}</span>
            </div>

            <h3 className="mt-5 text-lg font-semibold tracking-tight leading-snug">
              {p.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-fg/70">
              {p.blurb}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded border border-border px-2 py-0.5 text-[10px] text-fg/60"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4 border-t border-border/60 pt-4 text-xs">
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-accent transition-opacity hover:opacity-80"
                >
                  <ExternalLink size={12} /> Live
                </a>
              )}
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-muted transition-colors hover:text-fg"
                >
                  <Github size={12} /> Code
                </a>
              )}
              <span className="ml-auto flex gap-1.5">
                {p.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-accent/30 bg-accent/5 px-2 py-0.5 text-[10px] text-accent"
                  >
                    {t}
                  </span>
                ))}
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Footer link */}
      <div className="mt-10 flex justify-center">
        <a
          href="https://github.com/SanjitDash758"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-md border border-border bg-panel px-4 py-2 text-xs text-muted transition-colors hover:border-accent/40 hover:text-fg"
        >
          View everything on GitHub
          <ArrowRight
            size={12}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </section>
  );
}
