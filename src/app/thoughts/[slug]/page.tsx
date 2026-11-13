import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { formatDate, getPost, getPosts } from "@/lib/posts";

// Only posts that exist at build time get a page; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/thoughts/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary || undefined };
}

export default async function PostPage(props: PageProps<"/thoughts/[slug]">) {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <PageShell
      title={post.title}
      intro={
        <time dateTime={post.date} className="font-mono text-xs text-muted">
          {formatDate(post.date, "long")}
        </time>
      }
      back={{ href: "/thoughts", label: "Thoughts" }}
    >
      <article className="prose-post" dangerouslySetInnerHTML={{ __html: post.html }} />
    </PageShell>
  );
}
