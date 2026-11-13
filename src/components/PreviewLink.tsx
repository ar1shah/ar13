import Image from "next/image";
import type { Preview } from "@/lib/site";

/**
 * A link that shows a preview card of the site on hover or keyboard focus.
 * Pure CSS, so it costs no JS. On touch screens the card never shows and the
 * link just opens the site.
 */
export default function PreviewLink({
  preview,
  children,
}: {
  preview: Preview;
  children: React.ReactNode;
}) {
  return (
    <span className="group relative inline-block">
      <a href={preview.href} target="_blank" rel="noopener noreferrer" className="link text-ink">
        {children}
      </a>
      <span
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-full z-20 mt-2.5 hidden w-[340px] [@media(hover:hover)]:flex max-w-[calc(100vw-48px)] translate-y-1.5 scale-[.98] flex-col overflow-hidden rounded-2xl border border-edge bg-card text-left opacity-0 shadow-[0_22px_44px_-20px_rgba(28,27,25,0.38)] transition duration-200 ease-out [@media(hover:hover)]:group-hover:visible [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:scale-100 [@media(hover:hover)]:group-hover:opacity-100 group-has-[a:focus-visible]:visible group-has-[a:focus-visible]:translate-y-0 group-has-[a:focus-visible]:scale-100 group-has-[a:focus-visible]:opacity-100"
      >
        <Image
          src={preview.image}
          alt=""
          width={746}
          height={330}
          sizes="340px"
          className="block h-[150px] w-full border-b border-edge object-cover object-top"
        />
        <span className="flex flex-col gap-1.5 px-[18px] pb-[18px] pt-3.5">
          <span className="text-xs text-muted">{preview.domain}</span>
          <span className="text-base font-medium text-ink">{preview.title}</span>
          <span className="text-[13px] leading-normal text-body">{preview.description}</span>
        </span>
      </span>
    </span>
  );
}
