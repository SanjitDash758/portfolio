import Link from "next/link";
import { getAllPostsMeta } from "@/lib/writing";

export const metadata = {
  title: "Writing — Sanjit Dash",
  description:
    "Notes on backend systems, agent architecture, and how teams actually build with AI.",
};

export default function WritingIndex() {
  const posts = getAllPostsMeta();

  return (
    <main className="mx-auto max-w-4xl px-6 pt-24 pb-24">
      <div className="text-xs text-muted">
        <span className="text-accent">$</span> ls writing/
      </div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
        Writing
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-fg/70">
        Notes on systems, agents, and how teams build with AI. Long enough to be
        useful, short enough to finish.
      </p>

      <div className="mt-12 divide-y divide-border/60">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className="group block py-6 transition-opacity hover:opacity-90"
          >
            <div className="flex items-center gap-3 text-[10px]">
              <span className="text-muted">{post.date}</span>
              <span className="text-border">/</span>
              <span className="rounded-full border border-accent/30 bg-accent/5 px-2 py-0.5 tracking-widest text-accent">
                {post.source.toUpperCase()}
              </span>
            </div>

            <h2 className="mt-3 text-lg font-semibold tracking-tight group-hover:text-accent">
              {post.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-fg/70">{post.summary}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
