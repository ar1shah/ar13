import { socials } from "@/lib/site";

export default function SiteFooter({
  maxWidth = "max-w-[1120px]",
  className = "",
  asciiClear = false,
}: {
  maxWidth?: string;
  className?: string;
  /** Keep the homepage ASCII background clear behind the links. */
  asciiClear?: boolean;
}) {
  return (
    <footer
      {...(asciiClear ? { "data-ascii-clear": "" } : {})}
      className={`mx-auto flex w-full ${maxWidth} flex-wrap gap-6 px-8 pb-10 text-[13px] ${className}`}>
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-body transition-colors hover:text-ink"
        >
          {s.label}
        </a>
      ))}
    </footer>
  );
}
