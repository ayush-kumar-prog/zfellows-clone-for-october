import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/solids";

export const metadata: Metadata = {
  title: "Coast — Solids",
  description:
    "Made for slow mornings. The Solids Coast capsule — soft cotton in cream, sand and sea-blue.",
};

const capsule = [
  "womens-crop-boxy-t-shirt-pearl-white",
  "mens-oversized-t-shirt-blue-breeze",
  "womens-joggers-midnight-navy",
];

export default function CoastPage() {
  const items = capsule
    .map((handle) => products.find((p) => p.handle === handle))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main className="coast">
      <header className="coast-nav">
        <Link href="/" className="coast-nav__brand">
          Solids
        </Link>
        <nav>
          <Link href="/v/coast">Coast</Link>
          <Link href="/collections/all">Capsule</Link>
          <Link href="/pages/brand-story">Studio</Link>
        </nav>
        <Link href="/cart" className="coast-nav__bag">
          Bag (0)
        </Link>
      </header>

      <section className="coast-hero" aria-label="Coast hero">
        <img src="/thesolids/variants/coast-hero.jpg" alt="Soft cotton at first light" />
        <div className="coast-hero__copy">
          <p className="coast-eyebrow">Capsule N°06 — Coast</p>
          <h1>
            Made for
            <br />
            <em>slow mornings.</em>
          </h1>
          <p>
            Soft cotton in cream, sand, and sea-blue. The first thing you reach
            for, the last thing you take off.
          </p>
          <Link href="#capsule" className="coast-btn">
            See the capsule
            <ArrowUpRight size={14} strokeWidth={1.4} />
          </Link>
        </div>
      </section>

      <section className="coast-letter" aria-label="A letter">
        <p className="coast-eyebrow">A letter for the early</p>
        <p>
          The Coast capsule is for the people whose mornings start with light,
          not an alarm. Three pieces. Soft cotton. Built around the first cup,
          the open window, the slow hour before anyone else is up.
        </p>
      </section>

      <section className="coast-detail" aria-label="Detail">
        <img src="/thesolids/variants/coast-detail.jpg" alt="Folded cotton at dawn" />
        <div>
          <p className="coast-eyebrow">The fit</p>
          <h2>Cotton that holds its shape after three hundred mornings.</h2>
          <p>
            Slim seams that don&rsquo;t bite. A weight that disappears the
            longer you wear it. We start the wash slow so the fibre stays
            quiet.
          </p>
          <ul>
            <li>240 GSM combed cotton, sand-soft hand-feel</li>
            <li>Garment-washed yarn, won&rsquo;t pill</li>
            <li>Cuffs that hold their shape</li>
            <li>Made in small runs in Coimbatore, India</li>
          </ul>
        </div>
      </section>

      <section className="coast-capsule" id="capsule" aria-label="The capsule">
        <header>
          <p className="coast-eyebrow">The capsule — three pieces</p>
          <h2>
            One crop. One blue tee.
            <br />
            One soft jogger.
          </h2>
          <p className="coast-capsule__lede">
            Three colours of one quiet uniform. Cream, sea-blue, and a navy you
            can rumple without it telling.
          </p>
        </header>
        <div className="coast-capsule__grid">
          {items.map((item, idx) => (
            <Link
              key={item.handle}
              href={`/products/${item.handle}`}
              className="coast-card"
            >
              <div className="coast-card__media">
                <img src={item.image} alt={item.title} />
                <span>0{idx + 1}</span>
              </div>
              <div className="coast-card__row">
                <p className="coast-card__name">{item.title}</p>
                <p className="coast-card__price">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="coast-cta" aria-label="Newsletter">
        <h2>
          <em>Slow news,</em>
          <br />
          one Sunday a month.
        </h2>
        <form>
          <input aria-label="Email" placeholder="your email" type="email" />
          <button type="submit">Send me the morning note</button>
        </form>
        <p>
          One quiet email when the capsule restocks. Never anything else.
        </p>
      </section>

      <footer className="coast-foot">
        <span>© Solids — Coast</span>
        <span>India · Cotton · 06</span>
        <Link href="/">Return to Solids</Link>
      </footer>
    </main>
  );
}
