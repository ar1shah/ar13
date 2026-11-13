import Link from "next/link";
import AsciiBackground from "@/components/AsciiBackground";
import HalftonePortrait from "@/components/HalftonePortrait";
import PreviewLink from "@/components/PreviewLink";
import SiteFooter from "@/components/SiteFooter";
import { ArrowRight } from "@/components/Icons";
import { previews } from "@/lib/site";
import { featuredProjects } from "@/content/projects";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <AsciiBackground />
      <main className="relative z-10 mx-auto flex w-full max-w-[1120px] flex-1 flex-wrap items-center justify-center gap-[72px] px-8 pb-10 pt-16 md:pt-[88px]">
        <div data-ascii-clear className="flex max-w-[440px] flex-[1_1_360px] flex-col items-center">
          <HalftonePortrait
            src="/portrait.png"
            label="Halftone portrait of Ari Shah"
            className="block w-full max-w-[420px]"
          />
        </div>

        <div data-ascii-clear className="flex max-w-[470px] flex-[1_1_420px] flex-col gap-[30px]">
          <header className="flex flex-col gap-2.5">
            <h1 className="text-[44px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[52px]">
              Ari Shah
            </h1>
            <p className="text-base">
              Computer Science at <PreviewLink preview={previews.ucf}>UCF</PreviewLink>
            </p>
          </header>

          <p className="text-[15px] leading-[1.65] text-body">
            I’m interested in product engineering and applied AI. I also like traveling,
            photography, training MMA, and F1.
          </p>

          <section className="flex flex-col gap-3">
            <h2 className="text-[15px] font-semibold">Work</h2>
            <ul className="flex list-disc flex-col gap-2.5 pl-[18px] text-[15px] text-body">
              <li>
                Contract Developer at{" "}
                <PreviewLink preview={previews.blackridge}>Blackridge North</PreviewLink>
              </li>
              <li>
                Volunteer Software Developer at{" "}
                <PreviewLink preview={previews.ghana}>Ghana Medical Help</PreviewLink>
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-[15px] font-semibold">Projects</h2>
            <ul className="flex list-disc flex-col gap-2.5 pl-[18px] text-[15px] text-body">
              {featuredProjects.map((p) => (
                <li key={p.slug}>
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className="link text-ink">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
            <Link
              href="/projects"
              className="inline-flex min-h-8 items-center gap-1.5 self-start text-sm text-muted transition-colors hover:text-ink"
            >
              More projects <ArrowRight />
            </Link>
          </section>

          <nav aria-label="More of Ari" className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/thoughts"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink bg-ink px-5 text-sm font-medium text-paper transition-opacity hover:opacity-85"
            >
              Thoughts <ArrowRight />
            </Link>
            <Link
              href="/photos"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink px-5 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
            >
              Photos <ArrowRight />
            </Link>
            <a
              href="/Ari_Shah_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center px-2 text-sm text-body underline underline-offset-4 hover:text-ink"
            >
              Résumé
            </a>
          </nav>
        </div>
      </main>
      <SiteFooter className="relative z-10" asciiClear />
    </div>
  );
}
