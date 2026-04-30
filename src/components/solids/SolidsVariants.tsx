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
    title: "Sign in to keep your seat.",
    description:
      "Hard sign-in wall. Navy + brass + spotlight. The cart is held for nine minutes, then the seat opens.",
    href: "/paywall/wall",
    image: "/thesolids/walls/wall-hero.jpg",
  },
  {
    tag: "Paywall 02 — Glass",
    title: "Drop your email. Take ten.",
    description:
      "An email gate over a sun-fogged window. Cream and serif. One code, then quiet — no email storm.",
    href: "/paywall/glass",
    image: "/thesolids/walls/glass-hero.jpg",
  },
  {
    tag: "Paywall 03 — Vault",
    title: "Reserved for members.",
    description:
      "Members-only restock. A brass key on emerald velvet. Sign in or join the Atelier circle for free.",
    href: "/paywall/vault",
    image: "/thesolids/walls/vault-hero.jpg",
  },
  {
    tag: "Paywall 04 — Pulse",
    title: "Nine minutes to checkout.",
    description:
      "Urgency timer. Ink, tomato red, and a watch face that ticks. After ten minutes the seats reopen.",
    href: "/paywall/pulse",
    image: "/thesolids/walls/pulse-hero.jpg",
  },
  {
    tag: "Paywall 05 — Velvet",
    title: "Slip in the side door.",
    description:
      "First-time soft entry. Burgundy curtain, cream card, fifteen percent for friends arriving for the first time.",
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
