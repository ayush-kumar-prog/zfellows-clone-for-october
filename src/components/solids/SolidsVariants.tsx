import Link from "next/link";

type Card = {
  tag: string;
  title: string;
  description: string;
  href: string;
  image: string;
};

const capsules: Card[] = [
  {
    tag: "Capsule N°04",
    title: "Atelier — quiet luxury.",
    description:
      "Cream linen, slow serif, a single full-bleed editorial portrait. The cotton you reach for on mornings that matter.",
    href: "/v/atelier",
    image: "/thesolids/variants/atelier-hero.jpg",
  },
  {
    tag: "Capsule N°05",
    title: "Tokyo — the late hours.",
    description:
      "Ink black, warm amber, a city interior at twilight. Four cottons cut for the late hours.",
    href: "/v/tokyo",
    image: "/thesolids/variants/tokyo-hero.jpg",
  },
  {
    tag: "Capsule N°06",
    title: "Coast — slow mornings.",
    description:
      "Cream and sea-blue, dawn light on folded cotton. The first thing you reach for, the last thing you take off.",
    href: "/v/coast",
    image: "/thesolids/variants/coast-hero.jpg",
  },
];

const checkouts: Card[] = [
  {
    tag: "Checkout 01 — Library",
    title: "An order, like a letter.",
    description:
      "A bookshop checkout. Roman numerals, cream paper, no urgency. Wrapped in a card and posted on Tuesday.",
    href: "/p/library",
    image: "/thesolids/paywalls/library-hero.jpg",
  },
  {
    tag: "Checkout 02 — Members",
    title: "Two cottons, held for you.",
    description:
      "A concierge hold. Members pay ten percent less, always. Sage and brass, a key on a tray, no email storm.",
    href: "/p/member",
    image: "/thesolids/paywalls/member-hero.jpg",
  },
  {
    tag: "Checkout 03 — Edition",
    title: "Edition 04 · 04 / 144.",
    description:
      "A museum print acquire. One hundred and forty-four pieces. Stamped by hand. Closes when 144 are gone.",
    href: "/p/edition",
    image: "/thesolids/paywalls/edition-hero.jpg",
  },
];

const paywalls: Card[] = [
  {
    tag: "Paywall 01 — Wall",
    title: "The room is locked for you.",
    description:
      "A locked checkout ledger with product lines, timer pressure, and a premium brass-on-night mood.",
    href: "/paywall/wall",
    image: "/thesolids/walls/wall-hero.jpg",
  },
  {
    tag: "Paywall 02 — Glass",
    title: "A quiet code through the glass.",
    description:
      "A translucent email gate: soft studio daylight, one private discount, no sale-blast energy.",
    href: "/paywall/glass",
    image: "/thesolids/walls/glass-hero.jpg",
  },
  {
    tag: "Paywall 03 — Vault",
    title: "The good colors sit behind the key.",
    description:
      "A members-only restock room with a vault dial, key ritual, and tangible member benefits.",
    href: "/paywall/vault",
    image: "/thesolids/walls/vault-hero.jpg",
  },
  {
    tag: "Paywall 04 — Pulse",
    title: "The cart has a pulse.",
    description:
      "A live hold timer with reserved items, progress pressure, and a finish-now checkout path.",
    href: "/paywall/pulse",
    image: "/thesolids/walls/pulse-hero.jpg",
  },
  {
    tag: "Paywall 05 — Velvet",
    title: "A side room for new regulars.",
    description:
      "A first-visit concierge note in burgundy velvet: intimate, generous, and still conversion-focused.",
    href: "/paywall/velvet",
    image: "/thesolids/walls/velvet-hero.jpg",
  },
];

function Grid({ items }: { items: Card[] }) {
  return (
    <div className="variants-canvas__grid">
      {items.map((card) => (
        <Link key={card.href} href={card.href} className="variants-canvas__card">
          <div className="variants-canvas__media">
            <img src={card.image} alt="" />
          </div>
          <div className="variants-canvas__copy">
            <span className="variants-canvas__tag">{card.tag}</span>
            <h3 className="variants-canvas__title">{card.title}</h3>
            <p className="variants-canvas__desc">{card.description}</p>
            <span className="variants-canvas__link">Open surface</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function SolidsVariants() {
  return (
    <main className="variants-canvas">
      <div className="variants-canvas__inner">
        <Link href="/" className="variants-canvas__back">
          ← Solids
        </Link>

        <header className="variants-canvas__head">
          <span className="variants-canvas__eyebrow">Solids — gallery</span>
          <h1>
            Eleven rooms,
            <br />
            <em>one wardrobe.</em>
          </h1>
          <p className="variants-canvas__lede">
            Three capsules, three checkouts, five paywalls — eleven surfaces
            for the same Solids essential, each one in a different room. Tap
            any tile to open the surface.
          </p>
        </header>

        <section className="variants-canvas__section">
          <header className="variants-canvas__section-head">
            <span className="variants-canvas__section-tag">The capsules</span>
            <p>Three landings — Atelier, Tokyo, Coast.</p>
          </header>
          <Grid items={capsules} />
        </section>

        <section className="variants-canvas__section">
          <header className="variants-canvas__section-head">
            <span className="variants-canvas__section-tag">The checkouts</span>
            <p>Three checkout flows — Library, Members, Edition.</p>
          </header>
          <Grid items={checkouts} />
        </section>

        <section className="variants-canvas__section">
          <header className="variants-canvas__section-head">
            <span className="variants-canvas__section-tag">The paywalls</span>
            <p>Five walls — Wall, Glass, Vault, Pulse, Velvet.</p>
          </header>
          <Grid items={paywalls} />
        </section>
      </div>
    </main>
  );
}
