import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { products } from "@/data/solids";

export const metadata: Metadata = {
  title: "Pulse — Solids",
  description: "A live cart hold timer for reserved Solids cotton.",
};

const cart = [
  "mens-oversized-t-shirt-jet-black",
  "mens-oversized-t-shirt-pearl-white",
];

export default function PulsePaywall() {
  const items = cart
    .map((h) => products.find((p) => p.handle === h))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const subtotal = items.reduce(
    (sum, it) => sum + (parseFloat(it.price.replace(/[^\d.]/g, "")) || 0),
    0,
  );

  return (
    <main className="pulse">
      <img className="pulse-bg" src="/thesolids/walls/pulse-hero.jpg" alt="" />
      <div className="pulse-scrim" aria-hidden />

      <section className="pulse-board" aria-label="Cart hold timer">
        <div className="pulse-clock">
          <p className="pulse-tag">
            <Clock3 size={15} strokeWidth={2} />
            Live cart hold
          </p>
          <div className="pulse-time" aria-label="Eight minutes and fifty nine seconds remaining">
            <span>08</span>
            <em>:</em>
            <span>59</span>
          </div>
          <p className="pulse-sub">
            Two high-demand colors are reserved now. Miss the pulse and they
            return to the queue.
          </p>
        </div>

        <article className="pulse-cart" aria-label="Your reservation">
          <ul>
            {items.map((it, i) => (
              <li key={it.handle} className="pulse-line">
                <span className="pulse-line__num">0{i + 1}</span>
                <div className="pulse-line__media">
                  <img src={it.image} alt="" />
                </div>
                <span className="pulse-line__name">{it.color} oversized tee</span>
                <span className="pulse-line__price">{it.price}</span>
              </li>
            ))}
          </ul>
          <div className="pulse-meter" aria-hidden>
            <span />
          </div>
          <div className="pulse-total">
            <span>Reserved total</span>
            <strong>Rs. {subtotal.toLocaleString("en-IN")}</strong>
          </div>
          <Link href="/cart" className="pulse-cta">
            Finish hold
            <ArrowRight size={18} strokeWidth={2.2} />
          </Link>
          <p className="pulse-fineprint">Size M held. Queue reopens at zero.</p>
        </article>
      </section>
    </main>
  );
}
