import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Mirror — Solids",
  description: "A 24-hour try-on hold for your size.",
};

const checks = [
  "Free 24-hour try-on hold",
  "Pickup at any Solids point",
  "Walk-in returns, no form",
];

export default function MirrorPaywall() {
  return (
    <main className="mirror">
      <img className="mirror-bg" src="/thesolids/walls/mirror-hero.jpg" alt="" />

      <section className="mirror-stage" aria-label="Try-on hold">
        <article className="mirror-card" role="dialog" aria-modal="true" aria-label="Reserve a try-on">
          <p className="mirror-eyebrow">Try-on hold</p>
          <h1>
            See it on you
            <em> first.</em>
          </h1>
          <p className="mirror-sub">
            We&apos;ll keep the cotton in your size for the next 24 hours. Try it
            in the mirror, decide quietly, walk back if it isn&apos;t the one.
          </p>

          <ul className="mirror-checks">
            {checks.map((c) => (
              <li key={c}>
                <Check size={14} strokeWidth={2.4} />
                {c}
              </li>
            ))}
          </ul>

          <div className="mirror-form" aria-label="Email">
            <input
              type="email"
              placeholder="email for the hold ticket"
              aria-label="Email"
            />
            <button type="button">
              Hold my fit
              <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>

          <Link href="/collections/mens-oversized-t-shirts" className="mirror-foot">
            Skip — I know what I want
          </Link>
        </article>
      </section>
    </main>
  );
}
