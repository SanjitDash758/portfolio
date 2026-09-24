import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostsMeta, getPost } from "@/lib/writing";
import { ArrowLeft, ExternalLink, Clock } from "lucide-react";
import TableOfContents, { type TocItem } from "@/components/TableOfContents";

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

// Turn "The apprenticeship pipeline" → "the-apprenticeship-pipeline"
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Extract ## headings from raw MDX to build the ToC
function extractToc(content: string): TocItem[] {
  const lines = content.split("\n");
  const items: TocItem[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^##\s+(.+)$/.exec(line.trim());
    if (match) {
      const label = match[1].trim();
      items.push({ id: slugify(label), label });
    }
  }
  return items;
}

// Inject id= into every ## heading so the anchor links work
function withHeadingIds(content: string) {
  const lines = content.split("\n");
  let inCodeBlock = false;

  return lines
    .map((line) => {
      if (line.trim().startsWith("```")) {
        inCodeBlock = !inCodeBlock;
        return line;
      }
      if (inCodeBlock) return line;

      const match = /^##\s+(.+)$/.exec(line);
      if (match) {
        const label = match[1].trim();
        const id = slugify(label);
        return `## ${label} {#${id}}`;
      }
      return line;
    })
    .join("\n");
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = extractToc(post.content);
  const content = withHeadingIds(post.content);

  return (
    <main className="mx-auto max-w-6xl px-6 pt-24 pb-24">
      {/* Back link */}
      <Link
        href="/writing"
        className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={12} /> All writing
      </Link>

      {/* Title block */}
      <header className="mt-10 max-w-3xl">
        <div className="flex items-center gap-3 text-[10px]">
          <span className="text-muted">{post.date}</span>
          <span className="text-border">/</span>
          <span className="rounded-full border border-accent/30 bg-accent/5 px-2 py-0.5 tracking-widest text-accent">
            {post.source.toUpperCase()}
          </span>
          {post.readingTime && (
            <>
              <span className="text-border">/</span>
              <span className="inline-flex items-center gap-1 text-muted">
                <Clock size={10} /> {post.readingTime}
              </span>
            </>
          )}
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">
          {post.title}
        </h1>

        {post.subtitle && (
          <p className="mt-4 text-base text-fg/70 md:text-lg">
            {post.subtitle}
          </p>
        )}
      </header>

      {/* Intent / summary callout */}
      {post.summary && (
        <div className="mt-10 max-w-3xl rounded-lg border border-border/60 bg-panel/40 p-5">
          <div className="text-[10px] tracking-widest text-muted">
            IN THIS POST
          </div>
          <p className="mt-2 text-sm leading-relaxed text-fg/85">
            {post.summary}
          </p>
        </div>
      )}

      {/* Cover image */}
      <div className="relative mt-10 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-xl border border-border/60 bg-panel">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.coverAlt ?? post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-grid">
            <span className="text-xs text-muted">
              No cover image — add one to{" "}
              <code className="text-accent">content/writing/</code> frontmatter
            </span>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="mt-8 flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Body + ToC */}
      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_200px]">
        <article className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-14 prose-h2:border-t prose-h2:border-border/60 prose-h2:pt-8 prose-h2:text-2xl prose-h3:text-lg prose-p:text-fg/80 prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-fg prose-code:text-accent prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-border prose-pre:bg-panel prose-hr:border-border/60 prose-blockquote:border-l-accent prose-blockquote:text-fg/70 prose-li:text-fg/80">
          <MDXRemote source={content} />
        </article>

        <aside className="hidden lg:block">
          <TableOfContents items={toc} />
        </aside>
      </div>

      {/* Outbound link */}
      {post.sourceUrl && (
        <div className="mt-20 max-w-3xl rounded-xl border border-border/60 bg-panel/40 p-5">
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
