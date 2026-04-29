import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { FloatingChrome } from "./FloatingChrome";
import { SolidsFooter } from "./SolidsFooter";
import { SolidsHeader } from "./SolidsHeader";

const variantCards = [
  {
    title: "Baseline clone",
    description: "TheSolids.co homepage and catalog surface, kept close to the live store.",
    href: "/",
    image: "/thesolids/hero-frame-24.jpg",
  },
  {
    title: "Hero CTA test",
    description: "Same carousel image with the existing Shop Now action made a little clearer.",
    href: "/?variant=hero-cta",
    image: "/thesolids/hero-womens.png",
  },
  {
    title: "Collection offer signal",
    description: "A small bundle reminder above the product grid, no layout redesign.",
    href: "/collections/men?variant=collection-signal",
    image: "/thesolids/products/mens-oversized-t-shirt-jet-black-1.jpg",
  },
  {
    title: "PDP reassurance",
    description: "A brief exchange reassurance near the existing add-to-cart block.",
    href: "/products/mens-oversized-t-shirt-jet-black?variant=pdp-reassurance",
    image: "/thesolids/products/mens-oversized-t-shirt-jet-black-2.jpg",
  },
];

export function SolidsVariants() {
  return (
    <>
      <SolidsHeader />
      <main className="solids-main solids-main--variants">
        <section className="solids-variants solids-container">
          <div className="solids-variants__intro">
            <LayoutDashboard size={22} strokeWidth={1.8} />
            <h1>October demo canvas</h1>
            <p>
              Small TheSolids.co tests that look like merchandising changes the
              team could ship tomorrow.
            </p>
          </div>

          <div className="solids-variants__grid">
            {variantCards.map((card) => (
              <Link key={card.title} href={card.href} className="solids-variant-card">
                <img src={card.image} alt="" />
                <div>
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                  <span>
                    Open variant <ArrowRight size={15} strokeWidth={1.8} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SolidsFooter />
      <FloatingChrome />
    </>
  );
}
