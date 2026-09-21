import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostsMeta, getPost } from "@/lib/writing";
import { ArrowLeft, ExternalLink } from "lucide-react";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllPostsMeta().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — Sanjit Dash`,
    description: post.summary,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 pt-24 pb-24">
      {/* Back link */}
      <Link
        href="/writing"
        className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={12} /> All writing
      </Link>

      {/* Header */}
      <div className="mt-8 flex items-center gap-3 text-[10px]">
        <span className="text-muted">{post.date}</span>
        <span className="text-border">/</span>
        <span className="rounded-full border border-accent/30 bg-accent/5 px-2 py-0.5 tracking-widest text-accent">
          {post.source.toUpperCase()}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 text-sm text-fg/70">{post.summary}</p>

      {/* Tags */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      <hr className="my-10 border-border/60" />

      {/* Body */}
      <article className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-xl prose-h3:text-base prose-p:text-fg/80 prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-fg prose-code:text-accent prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-border prose-pre:bg-panel prose-hr:border-border/60 prose-blockquote:border-l-accent prose-blockquote:text-fg/70">
        <MDXRemote source={post.content} />
      </article>

      {/* Outbound link */}
      {post.sourceUrl && (
        <div className="mt-16 rounded-xl border border-border/60 bg-panel/40 p-5">
          <div className="text-[10px] tracking-widest text-muted">
            ORIGINALLY PUBLISHED
          </div>
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
          >
            Read on {post.source} <ExternalLink size={12} />
          </a>
        </div>
      )}
    </main>
  );
}
