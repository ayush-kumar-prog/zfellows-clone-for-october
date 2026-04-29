import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product, SolidsVariant } from "@/data/solids";

type ProductCardProps = {
  product: Product;
  mode?: "home" | "collection" | "compact";
  variant?: SolidsVariant;
};

export function ProductCard({
  product,
  mode = "home",
  variant = "baseline",
}: ProductCardProps) {
  const showSignal = variant === "collection-signal" && product.available;

  return (
    <article className={`solids-product-card solids-product-card--${mode}`}>
      <Link href={`/products/${product.handle}`} className="solids-product-card__media">
        <img src={product.image} alt={product.title} />
        {product.hoverImage && <img src={product.hoverImage} alt="" aria-hidden="true" />}
        <div className="solids-product-card__tools">
          <span>
            <Heart size={16} strokeWidth={1.65} />
          </span>
          <span>
            <ShoppingBag size={16} strokeWidth={1.65} />
          </span>
        </div>
      </Link>

      <Link href={`/products/${product.handle}`} className="solids-product-card__title">
        {product.title}
      </Link>
      <p className="solids-product-card__price">{product.price}</p>
      {showSignal && (
        <p className="solids-product-card__signal">Delivers in 3-5 business days</p>
      )}
    </article>
  );
}
