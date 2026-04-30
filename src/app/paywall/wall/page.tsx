import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { products } from "@/data/solids";

export const metadata: Metadata = {
  title: "Wall — Solids",
  description: "A locked checkout hold for two premium cottons.",
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

      <section className="wall-stage" aria-label="Locked checkout">
        <div className="wall-ledger">
          <span className="wall-kicker">Checkout hold</span>
          <h1>
            The room is
            <br />
            locked for you.
          </h1>
          <p>
            Your cottons are reserved behind a short sign-in wall. Keep the
            hold, finish the order, leave with the best colors before the
            queue opens again.
          </p>
        </div>

        <article className="wall-card" role="dialog" aria-modal="true" aria-label="Sign in to continue">
          <span className="wall-eyebrow">
            <Lock size={11} strokeWidth={2} />
            Solids private checkout
          </span>

          <p className="wall-timer">
            <span>Cart releases in</span>
            <strong>08:59</strong>
          </p>

          <ul className="wall-cart">
            {items.map((it, index) => (
            <li key={it.handle}>
              <img src={it.image} alt="" />
              <span className="wall-cart__index">0{index + 1}</span>
              <span className="wall-cart__name">{it.color} oversized</span>
              <span className="wall-cart__price">{it.price}</span>
            </li>
            ))}
          </ul>

          <div className="wall-assurance">
            <ShieldCheck size={15} strokeWidth={1.8} />
            <span>No spam account. Just a saved cart and faster returns.</span>
          </div>

          <div className="wall-actions">
            <Link href="/account/login" className="wall-cta">
              Unlock checkout
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
            <Link href="/account/register" className="wall-link">
              Create account in 30 seconds
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
