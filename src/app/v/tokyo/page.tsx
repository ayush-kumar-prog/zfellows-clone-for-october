import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bell, ShoppingBag } from "lucide-react";
import { products } from "@/data/solids";

export const metadata: Metadata = {
  title: "Drop 04 — Tokyo // Solids",
  description:
    "144 pieces. One color. Friday 22:00 JST. The Solids x Tokyo capsule drop.",
};

const dropHandles = [
  "mens-oversized-t-shirt-jet-black",
  "mens-oversized-t-shirt-chocolate-fudge",
  "mens-oversized-t-shirt-midnight-navy",
  "mens-oversized-t-shirt-cocoa-brown",
];

const dropStock = ["3 LEFT", "12 LEFT", "44 LEFT", "57 LEFT"];

export default function TokyoPage() {
  const items = dropHandles
    .map((handle, index) => {
      const product = products.find((p) => p.handle === handle);
      return product ? { product, stock: dropStock[index] } : null;
    })
    .filter((entry): entry is { product: NonNullable<ReturnType<typeof products.find>>; stock: string } => Boolean(entry));

  return (
    <main className="tokyo">
      <div className="tokyo-marquee" role="status" aria-label="Drop status">
        <div>
          <span>DROP 04 // TOKYO</span>
          <span>·</span>
          <span>FRIDAY 22:00 JST</span>
          <span>·</span>
          <span>144 PIECES</span>
          <span>·</span>
          <span>SHIPS GLOBAL</span>
          <span>·</span>
          <span>ONE COLOR</span>
          <span>·</span>
          <span>NEVER PRINTED. ALWAYS EMBROIDERED.</span>
          <span>·</span>
          <span>DROP 04 // TOKYO</span>
          <span>·</span>
          <span>FRIDAY 22:00 JST</span>
          <span>·</span>
          <span>144 PIECES</span>
          <span>·</span>
          <span>SHIPS GLOBAL</span>
        </div>
      </div>

      <header className="tokyo-nav">
        <Link href="/" className="tokyo-nav__brand">
          SOLIDS
          <span>/// 渋谷</span>
        </Link>
        <nav>
          <Link href="/v/tokyo">DROP</Link>
          <Link href="/collections/all">CATALOG</Link>
          <Link href="/pages/brand-story">MANIFESTO</Link>
        </nav>
        <div className="tokyo-nav__right">
          <Link href="/cart" className="tokyo-pill">
            <ShoppingBag size={14} strokeWidth={2} />
            <span>0</span>
          </Link>
          <Link href="/account/login" className="tokyo-pill tokyo-pill--solid">
            <Bell size={14} strokeWidth={2.2} />
            <span>JOIN LIST</span>
          </Link>
        </div>
      </header>

      <section className="tokyo-hero" aria-label="Tokyo hero">
        <img src="/thesolids/variants/tokyo-hero.jpg" alt="Tokyo street" />
        <div className="tokyo-hero__overlay">
          <p>SOLIDS // CAPSULE 04</p>
          <h1>
            Don&rsquo;t
            <br />
            blink.
          </h1>
          <p className="tokyo-hero__sub">
            One color. 144 pieces. Friday 22:00 JST. After that, gone.
          </p>
          <div className="tokyo-hero__cta">
            <Link href="#drop" className="tokyo-cta tokyo-cta--yellow">
              SEE THE DROP
              <ArrowRight size={14} strokeWidth={2.4} />
            </Link>
            <Link href="/account/login" className="tokyo-cta">
              JOIN LIST
            </Link>
          </div>
          <div className="tokyo-hero__stats">
            <div>
              <span>STARTS</span>
              <strong>06.13.26</strong>
              <small>22:00 JST</small>
            </div>
            <div>
              <span>PIECES</span>
              <strong>144</strong>
              <small>across 4 colorways</small>
            </div>
            <div>
              <span>RESERVED</span>
              <strong>2,841</strong>
              <small>on the list</small>
            </div>
          </div>
        </div>
      </section>

      <section className="tokyo-drop" id="drop" aria-label="The drop">
        <div className="tokyo-drop__head">
          <div>
            <p className="tokyo-eyebrow">// THE DROP</p>
            <h2>
              FOUR <span>BLACKS</span> THAT AREN&rsquo;T BLACK.
            </h2>
          </div>
          <p>
            Embroidered SOLIDS at the cuff. 240 GSM combed cotton. Boxy fit
            that breaks at the hip. Same tee, four moods.
          </p>
        </div>
        <div className="tokyo-drop__grid">
          {items.map(({ product, stock }, index) => (
            <Link
              key={product.handle}
              href={`/products/${product.handle}`}
              className="tokyo-tile"
              data-index={String(index + 1).padStart(2, "0")}
            >
              <div className="tokyo-tile__media">
                <img src={product.image} alt={product.title} />
                <span className="tokyo-tile__badge">{stock}</span>
              </div>
              <div className="tokyo-tile__row">
                <span>0{index + 1} / {product.color.toUpperCase()}</span>
                <span>{product.price.replace("Rs. ", "₹")}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="tokyo-detail" aria-label="Detail">
        <img src="/thesolids/variants/tokyo-detail.jpg" alt="Sleeve detail" />
        <div className="tokyo-detail__copy">
          <p className="tokyo-eyebrow">// DETAIL</p>
          <h2>EMBROIDERED.<br />NEVER PRINTED.</h2>
          <p>
            Every Tokyo capsule tee carries a 6mm SOLIDS wordmark embroidered
            on the cuff in pearl thread, finished by hand in our Mumbai
            atelier. Three minutes per cuff. We don&rsquo;t do iron-ons.
          </p>
          <ul>
            <li>240 GSM combed cotton, double-stitched hem</li>
            <li>Boxy fit, breaks 2cm below the hip</li>
            <li>Embroidered cuff in pearl thread</li>
            <li>Wash inside out. Dry in shadow.</li>
          </ul>
        </div>
      </section>

      <section className="tokyo-list" aria-label="Join list">
        <p className="tokyo-eyebrow">// JOIN THE LIST</p>
        <h2>2,841 ARE ALREADY ON IT.</h2>
        <form>
          <input aria-label="Email" placeholder="email" type="email" />
          <button type="submit">
            RESERVE A SLOT
            <ArrowRight size={14} strokeWidth={2.4} />
          </button>
        </form>
        <p className="tokyo-list__note">
          We email once when the drop opens. After that, never again unless
          you ask.
        </p>
      </section>

      <footer className="tokyo-foot">
        <div>
          <p>SOLIDS // 渋谷 // CAPSULE 04 // © 2026</p>
        </div>
        <div className="tokyo-foot__links">
          <Link href="/">RETURN TO STORE</Link>
          <Link href="/policies/privacy-policy">PRIVACY</Link>
          <Link href="/pages/brand-story">MANIFESTO</Link>
        </div>
      </footer>
    </main>
  );
}
