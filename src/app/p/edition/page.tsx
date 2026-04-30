import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/solids";

export const metadata: Metadata = {
  title: "Edition 04 — Solids",
  description: "Solids Edition 04 · Lot 04 of 144 · Acquire.",
};

const cart = [
  { handle: "mens-oversized-t-shirt-pearl-white", size: "M", lot: "04 / 144" },
];

const facts: ReadonlyArray<readonly [string, string]> = [
  ["GSM", "240"],
  ["Cotton", "Combed, Coimbatore"],
  ["Edition", "Lot 04"],
  ["Run", "144 pieces"],
  ["Wash", "Garment, slow"],
  ["Stamp", "Black wax, by hand"],
];

type Item = {
  product: NonNullable<ReturnType<typeof products.find>>;
  size: string;
  lot: string;
  handle: string;
};

export default function EditionPaywall() {
  const items: Item[] = cart
    .map((c) => {
      const product = products.find((p) => p.handle === c.handle);
      return product ? { product, ...c } : null;
    })
    .filter((x): x is Item => Boolean(x));

  return (
    <main className="edition">
      <header className="edition-nav">
        <Link href="/" className="edition-nav__brand">
          SOLIDS
        </Link>
        <span className="edition-nav__lot">EDITION 04 · LOT 04 / 144</span>
        <Link href="/cart" className="edition-nav__bag">
          CANCEL
        </Link>
      </header>

      <section className="edition-hero">
        <p className="edition-tag">04 / 144 · PEARL WHITE · 240 GSM · COIMBATORE</p>
        <h1>
          EDITION
          <br />
          04
        </h1>
        <p className="edition-sub">
          One hundred and forty-four pieces. Stamped by hand. Acquire one.
        </p>
      </section>

      <section className="edition-image">
        <img src="/thesolids/paywalls/edition-hero.jpg" alt="Solids edition print" />
        <span className="edition-image__stamp">04 / 144</span>
      </section>

      <section className="edition-facts">
        {facts.map(([k, v]) => (
          <div key={k} className="edition-fact">
            <span>{k}</span>
            <strong>{v}</strong>
          </div>
        ))}
      </section>

      <section className="edition-acquire">
        <div className="edition-rows">
          {items.map((it) => (
            <div key={it.handle} className="edition-row">
              <span className="edition-row__num">N°01</span>
              <span className="edition-row__name">{it.product.title.toUpperCase()}</span>
              <span className="edition-row__lot">{it.lot}</span>
              <span className="edition-row__price">
                {it.product.price.replace("Rs. ", "₹")}
              </span>
            </div>
          ))}
        </div>
        <button type="button" className="edition-cta">
          ACQUIRE
          <ArrowRight size={14} strokeWidth={2.2} />
        </button>
        <p className="edition-fineprint">
          Edition closes when 144 are gone · No restock · Stamped by hand
        </p>
      </section>

      <footer className="edition-foot">
        <span>SOLIDS · EDITION 04 · 04 / 144</span>
        <Link href="/">RETURN TO STORE</Link>
      </footer>
    </main>
  );
}
