import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Velvet — Solids",
  description: "Slip in the side door. Fifteen percent on your first cotton.",
};

export default function VelvetPaywall() {
  return (
    <main className="velvet">
      <img className="velvet-bg" src="/thesolids/walls/velvet-hero.jpg" alt="" />
      <div className="velvet-scrim" aria-hidden />

      <article className="velvet-card" role="dialog" aria-modal="true" aria-label="First-time entry">
        <span className="velvet-emblem" aria-hidden>※</span>

        <p className="velvet-eyebrow">A side door</p>
        <h1>
          Slip in,
          <br />
          <em>friend.</em>
        </h1>
        <p className="velvet-sub">
          First time at Solids? Take fifteen percent on the first cotton,
          just because. Drop your email below and we&rsquo;ll send the
          code by hand. One note. No email storm.
        </p>

        <form className="velvet-form" aria-label="Email">
          <input type="email" placeholder="your name @ studio" aria-label="Email" />
          <button type="submit">
            Send the code
            <ArrowRight size={14} strokeWidth={1.6} />
          </button>
        </form>

        <p className="velvet-foot">
          <a href="#">Already a friend? Skip the door →</a>
        </p>
      </article>
    </main>
  );
}
