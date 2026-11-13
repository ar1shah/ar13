import type { Metadata } from "next";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Photos",
  description: "Photos by Ari Shah.",
};

export default function PhotosPage() {
  return (
    <PageShell
      title="Photos"
      intro={<p>Places, people, and things I’ve pointed a camera at.</p>}
      width="max-w-[1120px]"
    >
      <section aria-label="Photo grid" className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <figure key={p.src} className="mb-4 break-inside-avoid">
            <Image
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
              preload={i === 0}
              className="block h-auto w-full rounded-md"
            />
          </figure>
        ))}
      </section>
    </PageShell>
  );
}
