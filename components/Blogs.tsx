"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import type { PostMeta } from "@/lib/writing";

const MotionLink = motion(Link);

const sourceStyles: Record<PostMeta["source"], string> = {
  Substack: "border-accent/40 text-accent bg-accent/5",
  "Substack Note": "border-accent/30 text-accent/90 bg-accent/5",
  LinkedIn: "border-border text-fg/70 bg-panel",
};

export default function Blogs({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;
  const [featured, ...rest] = posts;

  return (
    <section id="writing" className="mx-auto max-w-6xl px-6 py-24">
      {/* Section heading */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <div className="text-xs text-muted">
            <span className="text-accent">$</span> ls writing/
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Notes on systems and agents.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-fg/70">
            Writing about backend systems, agent architecture, and how teams
            actually build with AI.
          </p>
        </div>
        <div className="hidden items-center gap-4 text-[10px] text-muted md:flex">
          <span>{String(posts.length).padStart(2, "0")} posts</span>
          <Link
            href="/writing"
            className="inline-flex items-center gap-1 text-accent hover:underline"
          >
            All writing →
          </Link>
        </div>
      </div>

      {/* Featured post */}
      <MotionLink
        href={`/writing/${featured.slug}`}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="group relative mb-6 block overflow-hidden rounded-xl border border-border/60 bg-panel/40 p-6 backdrop-blur-sm transition-colors hover:border-accent/40 md:p-8"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />

        <div className="relative grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="text-muted">01</span>
              <span className="text-border">/</span>
              <span
                className={`rounded-full border px-2 py-0.5 tracking-widest ${sourceStyles[featured.source]}`}
              >
                {featured.source.toUpperCase()}
              </span>
              <span className="text-muted">{featured.date}</span>
            </div>

            <h3 className="mt-5 text-2xl font-semibold tracking-tight md:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg/75">
              {featured.summary}
            </p>

            <div className="mt-6 inline-flex items-center gap-1.5 text-xs text-accent">
              Read the full post
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 md:border-l md:border-border/60 md:pl-6">
            <div>
              <div className="text-[10px] tracking-widest text-muted">
                TOPICS
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
      </MotionLink>

      {/* Secondary posts */}
      <div className="grid gap-6 md:grid-cols-2">
        {rest.map((post, i) => (
          <MotionLink
            key={post.slug}
            href={`/writing/${post.slug}`}
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
                className={`rounded-full border px-2 py-0.5 tracking-widest ${sourceStyles[post.source]}`}
              >
                {post.source.toUpperCase()}
              </span>
              <span className="ml-auto text-muted">{post.date}</span>
            </div>

            <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight">
              {post.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-fg/70">
              {post.summary}
            </p>

            <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-accent/30 bg-accent/5 px-2 py-0.5 text-[10px] text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-accent">
                Read
                <ArrowRight
                  size={12}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </MotionLink>
        ))}
      </div>
    </section>
  );
}
