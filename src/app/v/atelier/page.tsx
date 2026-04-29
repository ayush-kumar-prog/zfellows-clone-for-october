import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/solids";

export const metadata: Metadata = {
  title: "Atelier — Solids",
  description:
    "Quiet essentials, made once and worn forever. The Atelier capsule from Solids.",
};

const capsule = [
  "mens-oversized-t-shirt-pearl-white",
  "mens-oversized-t-shirt-honey-beige",
  "mens-oversized-t-shirt-mocha-latte",
];

export default function AtelierPage() {
  const items = capsule
    .map((handle) => products.find((p) => p.handle === handle))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main className="atelier">
      <header className="atelier-nav">
        <Link href="/" className="atelier-nav__brand">
          Solids
        </Link>
        <nav>
          <Link href="/v/atelier">Atelier</Link>
          <Link href="/collections/all">Capsule</Link>
          <Link href="/pages/brand-story">Journal</Link>
        </nav>
        <Link href="/cart" className="atelier-nav__bag">
          Bag &nbsp; (0)
        </Link>
      </header>

      <section className="atelier-hero" aria-label="Atelier hero">
        <img src="/thesolids/variants/atelier-hero.jpg" alt="Atelier" />
        <div className="atelier-hero__copy">
          <p className="atelier-eyebrow">Capsule N°04 — Atelier</p>
          <h1>
            Quiet
            <br />
            essentials.
          </h1>
          <p className="atelier-sub">
            Loud confidence is over-rated. We make the cotton you reach for on
            mornings that matter.
          </p>
          <Link href="/collections/all" className="atelier-btn">
            See the capsule
            <ArrowUpRight size={16} strokeWidth={1.4} />
          </Link>
        </div>
      </section>

      <section className="atelier-quote" aria-label="Manifesto">
        <p>
          <span aria-hidden="true">“</span>
          Made once.
          <em> Worn forever.</em>
          <span aria-hidden="true">”</span>
        </p>
      </section>

      <section className="atelier-rituals" aria-label="Daily rituals">
        <div>
          <p className="atelier-eyebrow">Morning</p>
          <h3>The first cup.</h3>
          <p>
            Espresso, light through linen, the soft weight of a tee that
            won&rsquo;t fight you. Small, not slow.
          </p>
        </div>
        <div>
          <p className="atelier-eyebrow">Hours</p>
          <h3>Made to disappear.</h3>
          <p>
            We obsess over the seam, the hand-feel, the one centimetre of fall
            below the shoulder. So you stop thinking about clothes.
          </p>
        </div>
        <div>
          <p className="atelier-eyebrow">Evening</p>
          <h3>The same again.</h3>
          <p>
            One cotton, eleven colours. Buy two. Buy them again next year. The
            atelier is open.
          </p>
        </div>
      </section>

      <section className="atelier-detail" aria-label="Atelier still life">
        <img src="/thesolids/variants/atelier-detail.jpg" alt="" />
        <aside>
          <p className="atelier-eyebrow">Notes</p>
          <h2>Cream linen, slow weight, no logo larger than 4mm.</h2>
          <p>
            The Atelier capsule is woven on slow looms in Coimbatore and
            finished in our Mumbai studio. Three colours, three fits, no
            seasons.
          </p>
          <Link href="/pages/brand-story" className="atelier-link">
            Read the studio note <ArrowUpRight size={14} strokeWidth={1.4} />
          </Link>
        </aside>
      </section>

      <section className="atelier-capsule" aria-label="The Atelier capsule">
        <header>
          <p className="atelier-eyebrow">The capsule</p>
          <h2>Three cottons. One uniform.</h2>
        </header>
        <div className="atelier-capsule__grid">
          {items.map((item) => (
            <Link
              key={item.handle}
              href={`/products/${item.handle}`}
              className="atelier-card"
            >
              <div className="atelier-card__media">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="atelier-card__row">
                <span>{item.color}</span>
                <span>{item.price}</span>
              </div>
              <p className="atelier-card__name">{item.title.replace(/^Mens? Oversized T Shirt /, "Atelier Tee — ")}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="atelier-letter" aria-label="The studio">
        <p className="atelier-eyebrow">Studio letter</p>
        <h2>
          We don&rsquo;t do drops.
          <br />
          We do uniforms.
        </h2>
        <p>
          The Atelier is the slowest part of Solids — three cottons made in
          small batches, restocked when they sell through, never re-released
          in a different colour next season. Buy a tee. Wear it for a year.
          Send us the photograph.
        </p>
        <form className="atelier-form" aria-label="Studio newsletter">
          <input aria-label="Email" placeholder="your@studio.com" type="email" />
          <button type="submit">Slow news, one Friday a month</button>
        </form>
      </section>

      <footer className="atelier-foot">
        <span>© Solids — Atelier</span>
        <span>India · Cotton · 04</span>
        <Link href="/">Return to Solids</Link>
      </footer>
    </main>
  );
}
