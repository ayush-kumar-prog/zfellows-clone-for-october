import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Glass — Solids",
  description: "A quiet email gate for the first Solids cotton.",
};

export default function GlassPaywall() {
  return (
    <main className="glass">
      <img className="glass-bg" src="/thesolids/walls/glass-hero.jpg" alt="" />
      <div className="glass-scrim" aria-hidden />

      <section className="glass-panel" role="dialog" aria-modal="true" aria-label="Email gate">
        <aside className="glass-proof" aria-label="What you get">
          <span>First order</span>
          <strong>10% off</strong>
          <p>One private code. No sale blast.</p>
        </aside>

        <article className="glass-card">
          <p className="glass-eyebrow">Soft entry</p>
          <h1>
            Let the first cotton
            <em> find you quietly.</em>
          </h1>
          <p className="glass-sub">
            Drop an email and we send one clean code for the first oversized
            tee. After that, silence unless you ask for drops.
          </p>

          <div className="glass-form" aria-label="Email">
            <span className="glass-mail" aria-hidden>
              <Mail size={16} strokeWidth={1.8} />
            </span>
            <input type="email" placeholder="your@email.com" aria-label="Email" />
            <button type="button">
              Send code
              <ArrowRight size={14} strokeWidth={1.8} />
            </button>
          </div>

          <Link href="/collections/mens-oversized-t-shirts" className="glass-foot">
            Continue without the code
            <ArrowRight size={14} strokeWidth={1.6} />
          </Link>
        </article>
      </section>
    </main>
  );
}
