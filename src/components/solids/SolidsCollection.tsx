import Link from "next/link";
import { ChevronDown, Grid2X2, List } from "lucide-react";
import {
  collectionHeroTiles,
  getCollectionTitle,
  getProductsForCollection,
  type SolidsVariant,
} from "@/data/solids";
import { FloatingChrome } from "./FloatingChrome";
import { ProductCard } from "./ProductCard";
import { SolidsFooter } from "./SolidsFooter";
import { SolidsHeader } from "./SolidsHeader";

type SolidsCollectionProps = {
  handle?: string;
  variant?: SolidsVariant;
};

const filters = ["AVAILABILITY", "PRICE", "COLOR", "TYPE", "SIZE", "GENDER", "FIT"];

export function SolidsCollection({
  handle = "all",
  variant = "baseline",
}: SolidsCollectionProps) {
  const title = getCollectionTitle(handle);
  const products = getProductsForCollection(handle);

  return (
    <>
      <SolidsHeader variant={variant} />
      <main className="solids-main solids-main--collection">
        <section className="solids-collection">
          <h1>{title}</h1>

          <div className="solids-collection__tiles">
            {collectionHeroTiles.map((tile) => (
              <Link href={tile.href} key={tile.handle} className="solids-collection__tile">
                <img src={tile.image} alt={tile.title} />
              </Link>
            ))}
          </div>

          <div className="solids-filter-row">
            <div className="solids-filter-row__left">
              {filters.map((filter) => (
                <button key={filter} type="button">
                  {filter}
                  <ChevronDown size={13} strokeWidth={1.6} />
                </button>
              ))}
            </div>
            <div className="solids-filter-row__right">
              <span>{products.length} ITEMS</span>
              <button type="button">
                SORT
                <ChevronDown size={13} strokeWidth={1.6} />
              </button>
              <button type="button" aria-label="Grid view">
                <Grid2X2 size={15} strokeWidth={1.5} />
              </button>
              <button type="button" aria-label="List view">
                <List size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {variant === "collection-signal" && (
            <div className="solids-collection-signal">
              Buy more, save more on tanks and everyday essentials.
            </div>
          )}

          <div className="solids-product-grid solids-product-grid--collection">
            {products.map((product) => (
              <ProductCard
                key={product.handle}
                product={product}
                mode="collection"
                variant={variant}
              />
            ))}
          </div>
        </section>
      </main>
      <SolidsFooter />
      <FloatingChrome />
    </>
  );
}
