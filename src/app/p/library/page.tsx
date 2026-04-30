import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/solids";

export const metadata: Metadata = {
  title: "Library — Solids",
  description: "An order, like a letter. The Solids Library checkout.",
};

const cart = [
  { handle: "mens-oversized-t-shirt-pearl-white", size: "M", qty: 1 },
  { handle: "mens-oversized-t-shirt-honey-beige", size: "M", qty: 1 },
];

const numerals = ["I.", "II.", "III.", "IV."];

type Item = {
  product: NonNullable<ReturnType<typeof products.find>>;
  size: string;
  qty: number;
  handle: string;
  numeral: string;
};

function priceToInt(price: string) {
  return parseInt(price.replace(/[^\d]/g, ""), 10) || 0;
}

export default function LibraryPaywall() {
  const items: Item[] = cart
    .map((c, i) => {
      const product = products.find((p) => p.handle === c.handle);
      return product ? { product, ...c, numeral: numerals[i] } : null;
    })
    .filter((x): x is Item => Boolean(x));

  const subtotal = items.reduce(
    (sum, it) => sum + priceToInt(it.product.price) * it.qty,
    0,
  );

  return (
    <main className="library">
      <header className="library-nav">
        <Link href="/" className="library-nav__brand">
          Solids <span>· Library</span>
        </Link>
        <span className="library-nav__order">Order N°04 · 04.29.26</span>
        <Link href="/cart" className="library-nav__bag">
          Cancel
        </Link>
      </header>

      <section className="library-hero">
        <img src="/thesolids/paywalls/library-hero.jpg" alt="A quiet desk" />
        <div className="library-hero__copy">
          <p className="library-eyebrow">Order N°04</p>
          <h1>
            An order,
            <br />
            <em>like a letter.</em>
          </h1>
          <p className="library-sub">
            Two cottons, wrapped in cream paper, posted on Tuesday morning.
            Take your time before you sign.
          </p>
        </div>
      </section>

      <section className="library-order">
        <div className="library-order__index">
          <p className="library-eyebrow">The order</p>
          <ol className="library-list">
            {items.map((it) => (
              <li key={it.handle} className="library-line">
                <span className="library-line__num">{it.numeral}</span>
                <div className="library-line__media">
                  <img src={it.product.image} alt={it.product.title} />
                </div>
                <div className="library-line__copy">
                  <p className="library-line__title">{it.product.title}</p>
                  <p className="library-line__meta">
                    {it.product.color} · Size {it.size} · qty {it.qty}
                  </p>
                </div>
                <p className="library-line__price">{it.product.price}</p>
              </li>
            ))}
          </ol>
          <p className="library-leaf">
            Wrapped in cream paper. A small handwritten card inside, signed
            from the studio. Posted Tuesday, by the morning&rsquo;s second post.
          </p>
        </div>

        <aside className="library-summary">
          <p className="library-eyebrow">Summary</p>
          <dl className="library-totals">
            <div>
              <dt>Subtotal</dt>
              <dd>Rs.&nbsp;{subtotal.toLocaleString("en-IN")}</dd>
            </div>
            <div>
              <dt>Posting</dt>
              <dd>Free, second post</dd>
            </div>
            <div className="library-totals__total">
              <dt>Total</dt>
              <dd>Rs.&nbsp;{subtotal.toLocaleString("en-IN")}</dd>
            </div>
          </dl>
          <button type="button" className="library-cta">
            Complete the order
            <ArrowRight size={14} strokeWidth={1.4} />
          </button>
          <p className="library-note">
            Returns within 30 days, no questions, no forms. Reply to the card.
          </p>
        </aside>
      </section>

      <footer className="library-foot">
        <span>© Solids — Library</span>
        <span>Order N°04 / 144</span>
        <Link href="/">Return to Solids</Link>
      </footer>
    </main>
  );
}
