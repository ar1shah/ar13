"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/photos";

/**
 * Masonry grid of photos. Clicking one opens it large over a blurred page.
 * Close with Esc, the close button, or a click outside the photo.
 * Arrow keys (or the side buttons) move between photos.
 */
export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [shown, setShown] = useState(false); // drives the fade/scale-in
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback(() => {
    setShown(false);
    setOpen((current) => {
      if (current !== null) triggerRefs.current[current]?.focus();
      return null;
    });
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const raf = requestAnimationFrame(() => setShown(true));
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const current = open === null ? null : photos[open];

  return (
    <>
      <section aria-label="Photo grid" className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <figure key={p.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              onClick={() => setOpen(i)}
              aria-label={`Open photo: ${p.alt}`}
              className="block w-full cursor-zoom-in overflow-hidden rounded-md"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
                preload={i === 0}
                className="block h-auto w-full transition-transform duration-300 ease-out hover:scale-[1.02]"
              />
            </button>
          </figure>
        ))}
      </section>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-paper/60 p-4 backdrop-blur-xl transition-opacity duration-200 sm:p-10 ${
            shown ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="100vw"
            onClick={(e) => e.stopPropagation()}
            className={`h-auto max-h-[86vh] w-auto max-w-[88vw] rounded-lg shadow-[0_30px_80px_-30px_rgba(28,27,25,0.55)] transition-transform duration-200 ease-out ${
              shown ? "scale-100" : "scale-[0.97]"
            }`}
          />

          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close photo"
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-ink/80 text-paper transition-colors hover:bg-ink"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {photos.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-paper transition-colors hover:bg-ink sm:flex"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-paper transition-colors hover:bg-ink sm:flex"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
