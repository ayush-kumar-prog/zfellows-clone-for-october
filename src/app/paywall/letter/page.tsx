import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Letter — Solids",
  description: "A note from the studio, sent before the cotton.",
};

export default function LetterPaywall() {
  return (
    <main className="letter">
      <img className="letter-bg" src="/thesolids/walls/letter-hero.jpg" alt="" />
      <div className="letter-scrim" aria-hidden />

      <article className="letter-note" role="dialog" aria-modal="true" aria-label="Letter from studio">
        <p className="letter-stamp">A note from the studio</p>

        <p className="letter-body">
          Reader — we made eleven oversized cottons this season. Just enough
          to dress the people who notice cotton. If that&apos;s you, leave an
          address and we&apos;ll mail one over before they go on the rack.
        </p>

        <p className="letter-body letter-body--small">
          One letter, never two. After that, silence unless you ask.
        </p>

        <div className="letter-form" aria-label="Email">
          <input type="email" placeholder="address for the letter" aria-label="Email" />
          <button type="button">
            Mail me the cotton
            <ArrowRight size={14} strokeWidth={2} />
          </button>
        </div>

        <p className="letter-sign">
          — <em>The studio,</em> Mumbai
        </p>

        <Link href="/collections/mens-oversized-t-shirts" className="letter-foot">
          Walk in unannounced
        </Link>
      </article>
    </main>
  );
}
