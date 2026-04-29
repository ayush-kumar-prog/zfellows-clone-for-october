import Link from "next/link";

type VariantCard = {
  tag: string;
  title: string;
  description: string;
  href: string;
  image: string;
};

const variantCards: VariantCard[] = [
  {
    tag: "Variant · Atelier",
    title: "Quiet luxury, magazine cut.",
    description:
      "Cream linen, slow serif headlines, a single full-bleed editorial portrait. For the customer who already owns five black tees and is ready to spend on the soft cream one.",
    href: "/v/atelier",
    image: "/thesolids/variants/atelier-hero.jpg",
  },
  {
    tag: "Variant · Tokyo",
    title: "Drop 04 — Tokyo, 22:00 JST.",
    description:
      "Black background, acid yellow ticker, a Shibuya hero, embroidered SOLIDS at the cuff. For the streetwear customer who treats every restock like a release week.",
    href: "/v/tokyo",
    image: "/thesolids/variants/tokyo-hero.jpg",
  },
  {
    tag: "Variant · Coast",
    title: "Built for the morning.",
    description:
      "Sun-bleached pastels, route cards, dawn beach lifestyle. For the customer who runs before the city wakes — solids paired with miles, swims, and slow coffee.",
    href: "/v/coast",
    image: "/thesolids/variants/coast-hero.jpg",
  },
];

export function SolidsVariants() {
  return (
    <main className="variants-canvas">
      <div className="variants-canvas__inner">
        <Link href="/" className="variants-canvas__back">
          ← Back to baseline store
        </Link>
        <h1>
          Three paywall variants
          <br />
          <em>for the same customer.</em>
        </h1>
        <p className="variants-canvas__lede">
          The Solids buyer is one person — premium essentials, age 18-30 — but
          they show up in three different rooms. Each variant below speaks to
          one of those rooms. Tap a card to open the full variant. Hero
          imagery generated with Gemini 3 Pro Image (&ldquo;Nano Banana Pro&rdquo;).
        </p>

        <div className="variants-canvas__grid">
          {variantCards.map((card) => (
            <Link key={card.href} href={card.href} className="variants-canvas__card">
              <div className="variants-canvas__media">
                <img src={card.image} alt="" />
              </div>
              <div className="variants-canvas__copy">
                <span className="variants-canvas__tag">{card.tag}</span>
                <h2 className="variants-canvas__title">{card.title}</h2>
                <p className="variants-canvas__desc">{card.description}</p>
                <span className="variants-canvas__link">Open variant</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
