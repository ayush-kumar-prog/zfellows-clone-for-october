import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, KeyRound, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Vault — Solids",
  description: "Members-only restock access for the Solids circle.",
};

const benefits = [
  "Early restock access",
  "10% member price",
  "Quiet drop alerts",
  "Free returns pickup",
];

export default function VaultPaywall() {
  return (
    <main className="vault">
      <img className="vault-bg" src="/thesolids/walls/vault-hero.jpg" alt="" />
      <div className="vault-scrim" aria-hidden />

      <section className="vault-room" role="dialog" aria-modal="true" aria-label="Members-only gate">
        <div className="vault-dial" aria-hidden>
          <span />
          <KeyRound size={30} strokeWidth={1.15} />
        </div>

        <article className="vault-card">
          <p className="vault-eyebrow">Atelier circle</p>
          <h1>
            The good colors are
            <em> behind the key.</em>
          </h1>
          <p className="vault-sub">
            This restock opens to members first: jet black, dusty olive, pearl
            white, the sizes that disappear before noon. Joining is free.
          </p>

          <ul className="vault-benefits">
            {benefits.map((b) => (
              <li key={b}>
                <ShieldCheck size={14} strokeWidth={1.8} />
                {b}
              </li>
            ))}
          </ul>

          <div className="vault-actions">
            <Link href="/account/login" className="vault-cta">
              Use member key
              <ArrowRight size={14} strokeWidth={1.8} />
            </Link>
            <Link href="/account/register" className="vault-cta vault-cta--ghost">
              Join free
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
