import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { ArrowUpRight } from "@/components/Icons";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things Ari Shah has built.",
};

export default function ProjectsPage() {
  return (
    <PageShell
      title="Projects"
      intro={<p>things I’ve built</p>}
      width="max-w-[760px]"
    >
      <section aria-label="All projects" className="flex flex-col border-b border-rule">
        {projects.map((p) => (
          <article key={p.slug} id={p.slug} className="flex scroll-mt-8 flex-col gap-2.5 border-t border-rule py-6">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-lg font-medium">{p.name}</h2>
                {p.status ? (
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${
                      p.status === "In production"
                        ? "bg-[#e3eadb] text-[#2f6b3f]"
                        : "bg-[#ece5d6] text-[#7a5a1f]"
                    }`}
                  >
                    {p.status}
                  </span>
                ) : null}
              </div>
              <span className="font-mono text-xs text-muted">{p.year}</span>
            </div>
            <p className="text-[15px] leading-relaxed text-body">{p.blurb}</p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <ul className="flex flex-wrap gap-1.5" aria-label="Tech">
                {p.tech.map((t) => (
                  <li key={t} className="rounded-full border border-[#d6d1c6] px-2.5 py-[3px] text-xs text-body">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                {p.live ? (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-8 items-center gap-1.5 text-sm">
                    Live <ArrowUpRight />
                  </a>
                ) : null}
                <a href={p.repo} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-8 items-center gap-1.5 text-sm">
                  GitHub <ArrowUpRight />
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
