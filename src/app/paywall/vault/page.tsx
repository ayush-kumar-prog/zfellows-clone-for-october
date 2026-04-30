import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, KeyRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Vault — Solids",
  description: "Reserved for the Atelier circle. Members pay ten percent less.",
};

const benefits = [
  "10% off every order, always",
  "Early access to every restock",
  "Member-only colours each season",
  "Free returns · no forms",
];

export default function VaultPaywall() {
  return (
    <main className="vault">
      <img className="vault-bg" src="/thesolids/walls/vault-hero.jpg" alt="" />
      <div className="vault-scrim" aria-hidden />

      <article className="vault-card" role="dialog" aria-modal="true" aria-label="Members-only gate">
        <div className="vault-emblem" aria-hidden>
          <KeyRound size={22} strokeWidth={1.2} />
        </div>

        <p className="vault-eyebrow">Members · The Atelier circle</p>
        <h1>
          Reserved for
          <br />
          <em>members.</em>
        </h1>
        <p className="vault-sub">
          This restock is held for the Atelier circle. Members pay ten
          percent less &mdash; always &mdash; and see every drop a day early.
          The circle is free. No fee, no email storm.
        </p>

        <div className="vault-actions">
          <Link href="/account/login" className="vault-cta">
            Sign in
            <ArrowRight size={14} strokeWidth={1.8} />
          </Link>
          <Link href="/account/register" className="vault-cta vault-cta--ghost">
            Join the circle · free
          </Link>
        </div>

        <ul className="vault-benefits">
          {benefits.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </article>
    </main>
  );
}
