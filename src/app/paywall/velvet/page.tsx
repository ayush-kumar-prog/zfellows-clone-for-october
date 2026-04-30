import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Velvet — Solids",
  description: "A first-visit invitation for the Solids side room.",
};

export default function VelvetPaywall() {
  return (
    <main className="velvet">
      <img className="velvet-bg" src="/thesolids/walls/velvet-hero.jpg" alt="" />
      <div className="velvet-scrim" aria-hidden />

      <section className="velvet-room" role="dialog" aria-modal="true" aria-label="First-time entry">
        <article className="velvet-note">
          <span className="velvet-emblem" aria-hidden>
            <Sparkles size={18} strokeWidth={1.6} />
          </span>
          <p className="velvet-eyebrow">First visit privilege</p>
          <h1>
            A side room for
            <em> new regulars.</em>
          </h1>
          <p className="velvet-sub">
            Take fifteen percent on your first cotton. One note lands in your
            inbox, then the room goes quiet.
          </p>

          <div className="velvet-form" aria-label="Email">
            <input type="email" placeholder="email for the side-room code" aria-label="Email" />
            <button type="button">
              Send code
              <ArrowRight size={14} strokeWidth={1.6} />
            </button>
          </div>

          <Link href="/collections/mens-oversized-t-shirts" className="velvet-foot">
            Already know the cottons
            <ArrowRight size={13} strokeWidth={1.8} />
          </Link>
        </article>

        <aside className="velvet-ticket" aria-label="Offer">
          <span>First cotton</span>
          <strong>15</strong>
          <em>percent off</em>
        </aside>
      </section>
    </main>
  );
}
