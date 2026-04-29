import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  categoryButtons,
  homeCategoryTiles,
  homeNewArrivals,
  type SolidsVariant,
} from "@/data/solids";
import { FloatingChrome } from "./FloatingChrome";
import { ProductCard } from "./ProductCard";
import { SolidsFooter } from "./SolidsFooter";
import { SolidsHeader } from "./SolidsHeader";

type SolidsHomeProps = {
  variant?: SolidsVariant;
};

export function SolidsHome({ variant = "baseline" }: SolidsHomeProps) {
  const showHeroCta = variant === "hero-cta";

  return (
    <>
      <SolidsHeader variant={variant} page="home" />
      <main className="solids-main">
        <section className="solids-home-hero" aria-label="Solids hero carousel">
          <picture className="solids-home-hero__picture">
            <source media="(max-width: 720px)" srcSet="/thesolids/hero-womens.png" />
            <img src="/thesolids/hero-frame-24.jpg" alt="Solids essentials" />
          </picture>

          <div className="solids-home-hero__controls" aria-hidden="true">
            <button type="button">
              <ChevronLeft size={20} strokeWidth={1.8} />
            </button>
            <span />
            <button type="button">
              <ChevronRight size={20} strokeWidth={1.8} />
            </button>
          </div>

          <Link
            href="/collections/men"
            className={`solids-home-hero__shop${showHeroCta ? " is-emphasized" : ""}`}
          >
            Shop Now
          </Link>
        </section>

        <section className="solids-buy-more">
          <div className="solids-buy-more__inner">
            <h1>BUY MORE SAVE MORE</h1>
            <p>
              Bigger carts unlock better prices. Mix your daily solids across
              categories and save more on the pieces you keep reaching for.
            </p>
            <div className="solids-buy-more__buttons">
              {categoryButtons.map((item) => (
                <Link key={item} href="/collections/all">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="solids-category-section">
          <div className="solids-section-heading">
            <h2>Shop By Category</h2>
          </div>
          <div className="solids-category-scroller">
            {homeCategoryTiles.map((collection) => (
              <Link
                key={collection.handle}
                href={collection.href}
                className="solids-category-card"
              >
                <img src={collection.image} alt={collection.title} />
                <span>{collection.title}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="solids-new-arrivals">
          <div className="solids-container">
            <div className="solids-section-heading">
              <h2>New Arrivals</h2>
              <Link href="/collections/all">View all</Link>
            </div>
            <div className="solids-product-grid solids-product-grid--home">
              {homeNewArrivals.map((product) => (
                <ProductCard key={product.handle} product={product} variant={variant} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SolidsFooter />
      <FloatingChrome />
    </>
  );
}
