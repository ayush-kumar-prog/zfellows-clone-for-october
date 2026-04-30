import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Studio — Solids",
  description: "Three taps to a stylist-picked first cotton.",
};

const sizes = ["S", "M", "L", "XL"];
const moods = ["Quiet", "Warm", "Sharp"];

export default function StudioPaywall() {
  return (
    <main className="studio">
      <img className="studio-bg" src="/thesolids/walls/studio-hero.jpg" alt="" />
      <div className="studio-scrim" aria-hidden />

      <section className="studio-card" role="dialog" aria-modal="true" aria-label="Studio fitting">
        <p className="studio-eyebrow">Three taps · stylist pick</p>
        <h1>
          Let the studio
          <em> choose for you.</em>
        </h1>
        <p className="studio-sub">
          Pick a size, pick a mood, drop an email. We&apos;ll send back one
          cotton, picked by hand from this week&apos;s rack.
        </p>

        <fieldset className="studio-row">
          <legend>Your size</legend>
          <div className="studio-pills">
            {sizes.map((s) => (
              <button key={s} type="button" className="studio-pill">
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="studio-row">
          <legend>Your mood</legend>
          <div className="studio-pills">
            {moods.map((m) => (
              <button key={m} type="button" className="studio-pill">
                {m}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="studio-form" aria-label="Email">
          <input type="email" placeholder="email for the pick" aria-label="Email" />
          <button type="button">
            Get my pick
            <ArrowRight size={14} strokeWidth={2} />
          </button>
        </div>

        <Link href="/collections/mens-oversized-t-shirts" className="studio-foot">
          Skip the studio — show me everything
        </Link>
      </section>
    </main>
  );
}
