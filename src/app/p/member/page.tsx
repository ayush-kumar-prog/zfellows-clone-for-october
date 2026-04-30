import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { products } from "@/data/solids";

export const metadata: Metadata = {
  title: "Members — Solids",
  description: "Reserved for members. The Solids member-only checkout.",
};

const cart = [
  { handle: "mens-oversized-t-shirt-pearl-white", size: "M", qty: 1 },
  { handle: "mens-oversized-t-shirt-blue-breeze", size: "M", qty: 1 },
];

const benefits = [
  "10% off the second tee — every order, always",
  "Early access to every Atelier restock",
  "Free returns, no forms, no questions",
  "Member-only colours each season",
];

type Item = {
  product: NonNullable<ReturnType<typeof products.find>>;
  size: string;
  qty: number;
  handle: string;
};

function priceToInt(price: string) {
  return parseInt(price.replace(/[^\d]/g, ""), 10) || 0;
}

export default function MemberPaywall() {
  const items: Item[] = cart
    .map((c) => {
      const product = products.find((p) => p.handle === c.handle);
      return product ? { product, ...c } : null;
    })
    .filter((x): x is Item => Boolean(x));

  const subtotalRaw = items.reduce(
    (sum, it) => sum + priceToInt(it.product.price) * it.qty,
    0,
  );
  const memberTotal = Math.round(subtotalRaw * 0.9);

  return (
    <main className="member">
      <div className="member-ribbon">
        <Lock size={12} strokeWidth={1.8} />
        <span>Reserved for members · 24 hour hold · Hold N°042</span>
      </div>

      <header className="member-nav">
        <Link href="/" className="member-nav__brand">
          Solids <span>· Members</span>
        </Link>
        <Link href="/cart" className="member-nav__back">
          Cancel hold
        </Link>
      </header>

      <section className="member-hero">
        <img src="/thesolids/paywalls/member-hero.jpg" alt="A small concierge tray" />
        <div className="member-hero__copy">
          <p className="member-eyebrow">Members only · Hold N°042</p>
          <h1>
            Two cottons,
            <br />
            held for you.
          </h1>
          <p className="member-sub">
            We&rsquo;ve held this order in your name for the next twenty-four hours.
            Members pay ten percent less, always. Sign in to release the hold,
            or join the Atelier — no fee, no email storm.
          </p>
        </div>
      </section>

      <section className="member-cart">
        <div className="member-cart__items">
          <p className="member-eyebrow">Your hold</p>
          <div className="member-cart__lines">
            {items.map((it) => (
              <article key={it.handle} className="member-line">
                <div className="member-line__media">
                  <img src={it.product.image} alt={it.product.title} />
                </div>
                <div className="member-line__copy">
                  <p className="member-line__name">{it.product.title}</p>
                  <p className="member-line__meta">
                    {it.product.color} · Size {it.size}
                  </p>
                </div>
                <p className="member-line__price">{it.product.price}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="member-summary">
          <p className="member-eyebrow">Member pricing</p>
          <dl className="member-totals">
            <div>
              <dt>Standard total</dt>
              <dd className="member-strike">
                Rs.&nbsp;{subtotalRaw.toLocaleString("en-IN")}
              </dd>
            </div>
            <div className="member-totals__total">
              <dt>Member total</dt>
              <dd>Rs.&nbsp;{memberTotal.toLocaleString("en-IN")}</dd>
            </div>
          </dl>

          <div className="member-cta-row">
            <Link href="/account/login" className="member-cta">
              Sign in &amp; release the hold
              <ArrowRight size={14} strokeWidth={1.6} />
            </Link>
            <Link href="/account/register" className="member-cta member-cta--ghost">
              Become a member · free
            </Link>
          </div>

          <ul className="member-benefits">
            {benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </aside>
      </section>

      <footer className="member-foot">
        <span>© Solids — Members</span>
        <span>No fee · No email storm · Cancel any time</span>
      </footer>
    </main>
  );
}
