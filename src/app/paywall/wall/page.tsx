import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { products } from "@/data/solids";

export const metadata: Metadata = {
  title: "Wall — Solids",
  description: "Your seat at the table. Sign in to keep your cart.",
};

const cart = [
  "mens-oversized-t-shirt-pearl-white",
  "mens-oversized-t-shirt-honey-beige",
];

export default function WallPaywall() {
  const items = cart
    .map((h) => products.find((p) => p.handle === h))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main className="wall">
      <img className="wall-bg" src="/thesolids/walls/wall-hero.jpg" alt="" />
      <div className="wall-scrim" aria-hidden />

      <article className="wall-card" role="dialog" aria-modal="true" aria-label="Sign in to continue">
        <header className="wall-card__head">
          <span className="wall-eyebrow">
            <Lock size={11} strokeWidth={2} />
            Solids · Checkout · Held
          </span>
          <h1>
            Your seat
            <br />
            at the table.
          </h1>
          <p className="wall-timer">
            <span>This cart releases in</span>
            <strong>09 : 42</strong>
          </p>
        </header>

        <ul className="wall-cart">
          {items.map((it) => (
            <li key={it.handle}>
              <span className="wall-cart__name">{it.title}</span>
              <span className="wall-cart__meta">{it.color} · M</span>
              <span className="wall-cart__price">{it.price}</span>
            </li>
          ))}
        </ul>

        <p className="wall-sub">
          We&rsquo;ve held this cart in your name. Sign in to keep your
          seat, or create an account in under thirty seconds.
        </p>

        <div className="wall-actions">
          <Link href="/account/login" className="wall-cta">
            Sign in &amp; continue
            <ArrowRight size={16} strokeWidth={1.8} />
          </Link>
          <Link href="/account/register" className="wall-link">
            or create an account →
          </Link>
        </div>
      </article>
    </main>
  );
}
