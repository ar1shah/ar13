import Link from "next/link";
import { ArrowLeft } from "@/components/Icons";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-[680px] flex-1 flex-col justify-center gap-4 px-8 py-24">
      <p className="font-mono text-xs text-muted">404</p>
      <h1 className="text-[40px] font-medium leading-[1.1] tracking-[-0.02em]">Nothing here.</h1>
      <Link
        href="/"
        className="inline-flex min-h-8 items-center gap-1.5 self-start text-sm text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft /> Back home
      </Link>
    </main>
  );
}
