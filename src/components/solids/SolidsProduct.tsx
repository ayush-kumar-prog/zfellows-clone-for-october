import Link from "next/link";
import {
  ChevronDown,
  Minus,
  Plus,
  Ruler,
  Share2,
  ShoppingBag,
  Truck,
} from "lucide-react";
import {
  collectionProducts,
  getProduct,
  type Product,
  type SolidsVariant,
} from "@/data/solids";
import { FloatingChrome } from "./FloatingChrome";
import { SolidsFooter } from "./SolidsFooter";
import { SolidsHeader } from "./SolidsHeader";

type SolidsProductProps = {
  handle: string;
  variant?: SolidsVariant;
};

const defaultSizes = ["XS", "S", "M", "L", "XL", "2XL"];
const accordions = [
  "Product Information",
  "Fit",
  "Length & Neck",
  "Care Instructions",
  "Shipping and Delivery",
];

export function SolidsProduct({
  handle,
  variant = "baseline",
}: SolidsProductProps) {
  const product = getProduct(handle) ?? collectionProducts[0];

  return (
    <>
      <SolidsHeader variant={variant} />
      <main className="solids-main solids-main--product">
        <ProductDetail product={product} variant={variant} />
      </main>
      <SolidsFooter />
      <FloatingChrome />
    </>
  );
}

function ProductDetail({
  product,
  variant,
}: {
  product: Product;
  variant: SolidsVariant;
}) {
  const images = product.images?.length
    ? product.images
    : [product.image, product.hoverImage ?? product.image];
  const related =
    collectionProducts.find((item) => item.handle !== product.handle) ??
    collectionProducts[0];

  return (
    <div className="solids-product">
      <section className="solids-product__gallery" aria-label={`${product.title} gallery`}>
        {images.map((image, index) => (
          <div className="solids-product__image" key={`${image}-${index}`}>
            <img src={image} alt={`${product.title} ${index + 1}`} />
          </div>
        ))}
      </section>

      <aside className="solids-product__summary">
        <h1>{product.title}</h1>
        <p className="solids-product__price">{product.price}</p>

        <button type="button" className="solids-product__combo">
          Combo Offers
        </button>

        <div className="solids-product__option">
          <p>
            <span>Color</span>
            <strong>{product.color}</strong>
          </p>
          <button
            type="button"
            className="solids-product__swatch"
            style={{ backgroundColor: product.colorHex }}
            aria-label={product.color}
          />
        </div>

        <div className="solids-product__size-head">
          <span>Size</span>
          <a href="#size-chart">
            <Ruler size={14} strokeWidth={1.7} />
            Size chart
          </a>
        </div>
        <div className="solids-product__sizes">
          {(product.sizes ?? defaultSizes).map((size, index) => (
            <button key={size} type="button" className={index === 1 ? "is-selected" : ""}>
              {size}
            </button>
          ))}
        </div>

        <div className="solids-product__cart-row">
          <div className="solids-quantity" aria-label="Quantity">
            <button type="button" aria-label="Decrease quantity">
              <Minus size={13} strokeWidth={1.7} />
            </button>
            <span>1</span>
            <button type="button" aria-label="Increase quantity">
              <Plus size={14} strokeWidth={1.7} />
            </button>
          </div>
          <button type="button" className="solids-product__add">
            <ShoppingBag size={18} strokeWidth={1.8} />
            Add to cart
          </button>
        </div>

        <button type="button" className="solids-product__buy">
          Buy it now
        </button>

        {variant === "pdp-reassurance" && (
          <div className="solids-product__reassurance">
            Free size exchanges on unworn pieces within the support window.
          </div>
        )}

        <div className="solids-product__explore">
          <p>Explore More</p>
          <Link href={`/products/${related.handle}`}>
            <img src={related.image} alt={related.title} />
            <span>{related.title}</span>
          </Link>
          <button type="button">Add</button>
        </div>

        <div className="solids-product__delivery">
          <Truck size={20} strokeWidth={1.7} />
          <div>
            <strong>Delivery Timeline</strong>
            <span>Delivers in 3-5 business days</span>
          </div>
        </div>

        <div className="solids-product__accordions">
          {accordions.map((item) => (
            <button key={item} type="button">
              {item}
              <ChevronDown size={17} strokeWidth={1.6} />
            </button>
          ))}
        </div>

        <button type="button" className="solids-product__share">
          <Share2 size={16} strokeWidth={1.8} />
          Share
        </button>
      </aside>
    </div>
  );
}
