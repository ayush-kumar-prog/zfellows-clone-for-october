import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Stage — Solids",
  description: "One size, held under the spotlight.",
};

export default function StagePaywall() {
  return (
    <main className="stage">
      <img className="stage-bg" src="/thesolids/walls/stage-hero.jpg" alt="" />
      <div className="stage-scrim" aria-hidden />

      <section className="stage-card" role="dialog" aria-modal="true" aria-label="Reserve">
        <p className="stage-eyebrow">Tonight only</p>
        <h1>
          Take the
          <em> spotlight.</em>
        </h1>
        <p className="stage-sub">
          One pearl-white oversized cotton, size M, held under the lamp for the
          next ten minutes. Step in or step away.
        </p>

        <Link href="/cart" className="stage-cta">
          Reserve my size
          <ArrowRight size={18} strokeWidth={2} />
        </Link>

        <Link href="/collections/mens-oversized-t-shirts" className="stage-skip">
          Walk past the stage
        </Link>
      </section>
    </main>
  );
}
