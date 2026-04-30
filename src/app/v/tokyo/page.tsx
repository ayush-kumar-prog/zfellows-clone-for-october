import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/solids";

export const metadata: Metadata = {
  title: "Tokyo — Solids",
  description:
    "Quiet essentials for the late hours. The Solids Tokyo capsule — four blacks, no hype.",
};

const capsule = [
  "mens-oversized-t-shirt-jet-black",
  "mens-oversized-t-shirt-chocolate-fudge",
  "mens-oversized-t-shirt-midnight-navy",
  "mens-oversized-t-shirt-cocoa-brown",
];

export default function TokyoPage() {
  const items = capsule
    .map((handle) => products.find((p) => p.handle === handle))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main className="tokyo">
      <header className="tokyo-nav">
        <Link href="/" className="tokyo-nav__brand">
          Solids
        </Link>
        <nav>
          <Link href="/v/tokyo">Tokyo</Link>
          <Link href="/collections/all">Capsule</Link>
          <Link href="/pages/brand-story">Atelier</Link>
        </nav>
        <Link href="/cart" className="tokyo-nav__bag">
          Bag (0)
        </Link>
      </header>

      <section className="tokyo-hero" aria-label="Tokyo hero">
        <img src="/thesolids/variants/tokyo-hero.jpg" alt="Solids cotton, dusk interior" />
        <div className="tokyo-hero__copy">
          <p className="tokyo-eyebrow">Capsule N°05 — Tokyo</p>
          <h1>
            Made for the
            <br />
            late hours.
          </h1>
          <p className="tokyo-sub">
            A quiet wardrobe for nights that don&rsquo;t end early. Four cottons,
            cut for the city.
          </p>
          <Link href="#capsule" className="tokyo-btn">
            See the capsule
            <ArrowUpRight size={14} strokeWidth={1.4} />
          </Link>
        </div>
      </section>

      <section className="tokyo-manifesto" aria-label="Manifesto">
        <p className="tokyo-eyebrow">A note from the studio</p>
        <p>
          The city wears black for a reason. We cut the same Solids cotton four
          ways &mdash; deeper, warmer, quieter &mdash; so the tee disappears and
          the night holds. No drops. No countdowns. The cotton is the moment.
        </p>
      </section>

      <section className="tokyo-detail" aria-label="Cotton detail">
        <img src="/thesolids/variants/tokyo-detail.jpg" alt="Folded ink cotton on concrete" />
        <aside>
          <p className="tokyo-eyebrow">The cotton</p>
          <h2>240 GSM combed cotton, washed soft, cut quiet.</h2>
          <p>
            We start the dye at midnight to keep the depth in the fibre. The
            shoulder breaks one centimetre below where you expect it. The hem
            sits flat. The wordmark is 4mm and embroidered, not printed.
          </p>
          <ul>
            <li>240 GSM combed cotton, garment-washed</li>
            <li>Boxy fit, breaks 2cm below the hip</li>
            <li>Embroidered SOLIDS at the cuff, 4mm</li>
            <li>Made in small batches in Coimbatore</li>
          </ul>
        </aside>
      </section>

      <section className="tokyo-capsule" id="capsule" aria-label="The capsule">
        <header>
          <p className="tokyo-eyebrow">The capsule — four cottons</p>
          <h2>Four blacks that aren&rsquo;t black.</h2>
          <p className="tokyo-capsule__lede">
            One tee, four depths. Wear it once. Wear it for a year. The Tokyo
            capsule is restocked when it sells through, never re-released in a
            different colour next season.
          </p>
        </header>
        <div className="tokyo-capsule__grid">
          {items.map((item, idx) => (
            <Link
              key={item.handle}
              href={`/products/${item.handle}`}
              className="tokyo-card"
            >
              <div className="tokyo-card__media">
                <img src={item.image} alt={item.title} />
                <span className="tokyo-card__index">0{idx + 1}</span>
              </div>
              <div className="tokyo-card__row">
                <span>{item.color}</span>
                <span>{item.price}</span>
              </div>
              <p className="tokyo-card__name">
                {item.title.replace(/^Mens? Oversized T Shirt /, "Tokyo Tee — ")}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="tokyo-letter" aria-label="Studio letter">
        <p className="tokyo-eyebrow">Studio letter</p>
        <h2>
          We don&rsquo;t do drops.
          <br />
          We do uniforms for the late hours.
        </h2>
        <p>
          Tokyo is the slowest part of Solids &mdash; four cottons, made in
          small batches, restocked when they sell through. Buy a tee. Wear it
          for a year. We&rsquo;ll send one quiet note a month.
        </p>
        <form className="tokyo-form" aria-label="Newsletter">
          <input aria-label="Email" placeholder="your@city.com" type="email" />
          <button type="submit">Stay close</button>
        </form>
      </section>

      <footer className="tokyo-foot">
        <span>© Solids — Tokyo</span>
        <span>India · Cotton · 05</span>
        <Link href="/">Return to Solids</Link>
      </footer>
    </main>
  );
}
