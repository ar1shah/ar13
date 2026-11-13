import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { formatDate, getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "Notes on product engineering, applied AI, and whatever Ari Shah is into lately.",
};

export default function ThoughtsPage() {
  const posts = getPosts();
  return (
    <PageShell
      title="Thoughts"
      intro={<p>Notes on product engineering, applied AI, and whatever I’m into lately.</p>}
    >
      {posts.length === 0 ? (
        <p className="border-t border-rule pt-6 text-[15px] text-muted">First post coming soon.</p>
      ) : (
        <section aria-label="Posts" className="flex flex-col border-b border-rule">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/thoughts/${p.slug}`}
              className="group flex items-baseline justify-between gap-6 border-t border-rule py-[18px]"
            >
              <span className="flex min-w-0 flex-col gap-1.5">
                <span className="text-[17px] font-medium decoration-bullet underline-offset-4 group-hover:underline">
                  {p.title}
                  {p.draft ? <span className="ml-2 font-mono text-[11px] text-muted">draft</span> : null}
                </span>
                {p.summary ? <span className="text-sm leading-[1.55] text-muted">{p.summary}</span> : null}
              </span>
              <time dateTime={p.date} className="shrink-0 font-mono text-xs text-muted">
                {formatDate(p.date)}
              </time>
            </Link>
          ))}
        </section>
      )}
    </PageShell>
  );
}
