import fs from "fs";
import path from "path";
import matter from "gray-matter";

const WRITING_DIR = path.join(process.cwd(), "content", "writing");

export type PostMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  source: "Substack" | "Substack Note" | "LinkedIn";
  sourceUrl: string;
  tags: string[];
  summary: string;
  cover?: string;
  coverAlt?: string;
  readingTime?: string;
};

export type Post = PostMeta & {
  content: string;
};

function readPost(file: string): PostMeta {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(WRITING_DIR, file), "utf8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    subtitle: data.subtitle,
    date: data.date ?? "",
    source: data.source ?? "Substack",
    sourceUrl: data.sourceUrl ?? "",
    tags: data.tags ?? [],
    summary: data.summary ?? "",
    cover: data.cover,
    coverAlt: data.coverAlt,
    readingTime: data.readingTime,
  };
}

export function getAllPostsMeta(): PostMeta[] {
  if (!fs.existsSync(WRITING_DIR)) return [];
  const files = fs.readdirSync(WRITING_DIR).filter((f) => f.endsWith(".mdx"));
  return files.map(readPost).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const file = path.join(WRITING_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    ...readPost(`${slug}.mdx`),
    content,
  };
}
