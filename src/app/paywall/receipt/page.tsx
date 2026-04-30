import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Receipt — Solids",
  description: "An itemized hold for two cottons.",
};

const lines = [
  { sku: "OVT-PRL-M", name: "Pearl White oversized", price: "699.00" },
  { sku: "OVT-HNY-M", name: "Honey Beige oversized", price: "699.00" },
];

export default function ReceiptPaywall() {
  const total = lines.reduce((s, l) => s + parseFloat(l.price), 0);
  const totalStr = total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <main className="receipt">
      <img className="receipt-bg" src="/thesolids/walls/receipt-hero.jpg" alt="" />

      <article className="receipt-paper" role="dialog" aria-modal="true" aria-label="Receipt">
        <header className="receipt-head">
          <p className="receipt-stamp">SOLIDS · CO.</p>
          <p className="receipt-meta">
            <span>Receipt</span>
            <span>№ 00432</span>
          </p>
          <p className="receipt-meta">
            <span>Hold</span>
            <span>10 min</span>
          </p>
        </header>

        <div className="receipt-divider" aria-hidden>
          <span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
        </div>

        <ul className="receipt-lines">
          {lines.map((l) => (
            <li key={l.sku}>
              <span className="receipt-sku">{l.sku}</span>
              <span className="receipt-name">{l.name}</span>
              <span className="receipt-price">Rs. {l.price}</span>
            </li>
          ))}
        </ul>

        <div className="receipt-divider" aria-hidden>
          <span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
        </div>

        <div className="receipt-total">
          <span>Total due</span>
          <strong>Rs. {totalStr}</strong>
        </div>

        <p className="receipt-note">
          Sign to keep the hold. We&apos;ll honor this slip until you walk away.
        </p>

        <div className="receipt-sign" aria-hidden>
          <em>x</em>
          <span />
        </div>

        <Link href="/account/login" className="receipt-cta">
          Sign &amp; finish
          <ArrowRight size={15} strokeWidth={2} />
        </Link>

        <p className="receipt-foot">SOLIDS · MUMBAI · NO REFUNDS ASKED</p>
      </article>
    </main>
  );
}
