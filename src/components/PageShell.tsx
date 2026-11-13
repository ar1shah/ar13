import Link from "next/link";
import SiteFooter from "./SiteFooter";
import { ArrowLeft } from "./Icons";

/** Layout for the inner pages: back link, title, intro, then content. */
export default function PageShell({
  title,
  intro,
  back = { href: "/", label: "Ari Shah" },
  width = "max-w-[680px]",
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  back?: { href: string; label: string };
  width?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <main className={`mx-auto flex w-full ${width} flex-1 flex-col gap-10 px-8 pb-16 pt-[72px]`}>
        <Link
          href={back.href}
          className="inline-flex min-h-8 items-center gap-1.5 self-start text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft />
          {back.label}
        </Link>
        <header className="flex flex-col gap-3">
          <h1 className="text-[40px] font-medium leading-[1.1] tracking-[-0.02em]">{title}</h1>
          {intro ? <div className="text-[15px] leading-[1.65] text-body">{intro}</div> : null}
        </header>
        {children}
      </main>
      <SiteFooter maxWidth={width} />
    </>
  );
}
