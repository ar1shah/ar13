import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const DIR = path.join(process.cwd(), "src/content/thoughts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  draft: boolean;
};

/** Drafts show up in `npm run dev` only, never on the live site. */
const showDrafts = process.env.NODE_ENV !== "production";

function readMeta(file: string): PostMeta {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data } = matter(raw);
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title ?? "Untitled"),
    date: String(data.date ?? ""),
    summary: String(data.summary ?? ""),
    draft: Boolean(data.draft),
  };
}

export function getPosts(): PostMeta[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readMeta)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string) {
  const meta = getPosts().find((p) => p.slug === slug);
  if (!meta) return null;
  const raw = fs.readFileSync(path.join(DIR, `${slug}.md`), "utf8");
  const { content } = matter(raw);
  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(content),
  );
  return { ...meta, html };
}

export function formatDate(date: string, style: "short" | "long" = "short") {
  if (!date) return "";
  const d = new Date(`${date}T12:00:00Z`);
  return d.toLocaleDateString("en-US", {
    month: style === "short" ? "short" : "long",
    ...(style === "long" ? { day: "numeric" } : {}),
    year: "numeric",
    timeZone: "UTC",
  });
}
