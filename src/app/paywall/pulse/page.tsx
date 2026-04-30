import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/solids";

export const metadata: Metadata = {
  title: "Pulse — Solids",
  description: "09:42 to checkout. Then the seats reopen.",
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
    (sum, it) => sum + (parseInt(it.price.replace(/[^\d]/g, ""), 10) || 0),
    0,
  );

  return (
    <main className="pulse">
      <img className="pulse-bg" src="/thesolids/walls/pulse-hero.jpg" alt="" />
      <div className="pulse-scrim" aria-hidden />

      <section className="pulse-clock" aria-label="Cart hold timer">
        <p className="pulse-tag">Cart held · seats released after</p>
        <div className="pulse-time">
          <span>09</span>
          <em>:</em>
          <span>42</span>
        </div>
        <p className="pulse-sub">
          Two cottons reserved for the next ten minutes. After that the
          seats reopen for the next person on the list.
        </p>
      </section>

      <section className="pulse-cart" aria-label="Your reservation">
        <ul>
          {items.map((it, i) => (
            <li key={it.handle} className="pulse-line">
              <span className="pulse-line__num">N°0{i + 1}</span>
              <div className="pulse-line__media">
                <img src={it.image} alt={it.title} />
              </div>
              <span className="pulse-line__name">{it.title}</span>
              <span className="pulse-line__meta">{it.color} · M</span>
              <span className="pulse-line__price">{it.price}</span>
            </li>
          ))}
        </ul>
        <div className="pulse-total">
          <span>Total</span>
          <strong>Rs. {subtotal.toLocaleString("en-IN")}</strong>
        </div>
        <button type="button" className="pulse-cta">
          Complete now
          <ArrowRight size={18} strokeWidth={2.2} />
        </button>
        <p className="pulse-fineprint">Hold expires at 09:42 · No restock once gone</p>
      </section>
    </main>
  );
}
