import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass, Sunrise, Waves } from "lucide-react";
import { products } from "@/data/solids";

export const metadata: Metadata = {
  title: "Coast — Solids x The Coast",
  description:
    "Built for the morning. Solids x The Coast capsule one — tank, tee, jogger.",
};

const coastCapsule = [
  "womens-crop-boxy-t-shirt-pearl-white",
  "womens-joggers-midnight-navy",
  "mens-oversized-t-shirt-blue-breeze",
];

const routes = [
  {
    title: "Pacific",
    location: "Half Moon Bay · 06:14",
    distance: "9.4 km",
    weather: "4°C swim · zero crowd",
    icon: <Waves size={18} strokeWidth={1.6} />,
  },
  {
    title: "Highline",
    location: "Hudson River · 06:42",
    distance: "12.1 km",
    weather: "fog burning off",
    icon: <Compass size={18} strokeWidth={1.6} />,
  },
  {
    title: "Bali",
    location: "Bingin · 05:48",
    distance: "8.0 km",
    weather: "sunrise paddle",
    icon: <Sunrise size={18} strokeWidth={1.6} />,
  },
];

export default function CoastPage() {
  const items = coastCapsule
    .map((handle) => products.find((p) => p.handle === handle))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main className="coast">
      <header className="coast-nav">
        <Link href="/" className="coast-nav__brand">
          <span className="coast-nav__pill">Solids × The Coast</span>
        </Link>
        <nav>
          <Link href="/v/coast">Capsule</Link>
          <Link href="/collections/women">Routes</Link>
          <Link href="/pages/brand-story">Field notes</Link>
        </nav>
        <Link href="/cart" className="coast-nav__bag">
          Bag · 0
        </Link>
      </header>

      <section className="coast-hero" aria-label="Coast capsule hero">
        <img src="/thesolids/variants/coast-hero.jpg" alt="Dawn run" />
        <div className="coast-hero__copy">
          <p className="coast-eyebrow">Capsule One — Coast</p>
          <h1>
            Built for the
            <br />
            <em>morning.</em>
          </h1>
          <p>
            Run before sunrise. Swim before the wind picks up. Be back in the
            kitchen before the city wakes.
          </p>
          <div className="coast-hero__cta">
            <Link href="#capsule" className="coast-btn">
              Shop the capsule
              <ArrowUpRight size={14} strokeWidth={1.6} />
            </Link>
            <Link href="#routes" className="coast-btn coast-btn--ghost">
              Find a route
            </Link>
          </div>
        </div>
        <div className="coast-hero__strip">
          <div>
            <span>06:14</span>
            <small>Sunrise</small>
          </div>
          <div>
            <span>4°C</span>
            <small>Pacific swim</small>
          </div>
          <div>
            <span>9.4km</span>
            <small>Half Moon Bay</small>
          </div>
          <div>
            <span>Zero</span>
            <small>Crowd</small>
          </div>
        </div>
      </section>

      <section className="coast-letter" aria-label="The letter">
        <p className="coast-eyebrow">A letter to the early</p>
        <p>
          The capsule is for the people who don&rsquo;t set an alarm because
          they&rsquo;re already up. Three pieces. Soft cotton. Built around
          the morning kilometer, the cold swim, the coffee that comes after.
          Capsule one is sand-toned, pearl, and a navy you can sweat in
          without it telling.
        </p>
      </section>

      <section className="coast-routes" id="routes" aria-label="Routes">
        <header>
          <p className="coast-eyebrow">Routes — week 04</p>
          <h2>Three places we keep going back to.</h2>
        </header>
        <div className="coast-routes__grid">
          {routes.map((route) => (
            <article key={route.title} className="coast-route">
              <div className="coast-route__icon">{route.icon}</div>
              <h3>{route.title}</h3>
              <p className="coast-route__location">{route.location}</p>
              <p className="coast-route__distance">
                <strong>{route.distance}</strong>
                <span>{route.weather}</span>
              </p>
              <span className="coast-route__cta">
                Route notes <ArrowUpRight size={13} strokeWidth={1.6} />
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="coast-detail" aria-label="Detail">
        <img src="/thesolids/variants/coast-detail.jpg" alt="" />
        <div>
          <p className="coast-eyebrow">The fit</p>
          <h2>The capsule fits like sea air on bare skin.</h2>
          <p>
            Slim seams that don&rsquo;t bite. Cotton that dries in twenty
            minutes on the hood of the car. Cuffs that hold their shape
            after three hundred mornings.
          </p>
          <ul>
            <li>240 GSM combed cotton, sun-set hand-feel</li>
            <li>Saltwater-rinsed yarn, won&rsquo;t pill</li>
            <li>Quick-dry inseam on the joggers</li>
            <li>Made in small runs in Coimbatore, India</li>
          </ul>
        </div>
      </section>

      <section className="coast-capsule" id="capsule" aria-label="The capsule">
        <header>
          <p className="coast-eyebrow">The capsule — three pieces</p>
          <h2>
            One tank. One jogger.
            <br /> One blue tee for the road home.
          </h2>
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
          <em>Run</em> before sunrise.
          <br />
          <em>Ship</em> before the hype.
        </h2>
        <form>
          <input aria-label="Email" placeholder="your email" type="email" />
          <button type="submit">Send me the morning routes</button>
        </form>
        <p>
          One Sunday email. The route, the swim window, and which Solids piece
          we&rsquo;re wearing.
        </p>
      </section>

      <footer className="coast-foot">
        <span>© Solids × The Coast — Capsule One</span>
        <Link href="/">Return to Solids</Link>
      </footer>
    </main>
  );
}
