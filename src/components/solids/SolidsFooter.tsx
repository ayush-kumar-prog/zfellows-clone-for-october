import Link from "next/link";

export function SolidsFooter() {
  return (
    <footer className="solids-footer">
      <div className="solids-footer__inner">
        <div className="solids-footer__brand">
          <img src="/thesolids/logo.svg" alt="Solids" />
          <p>Premium everyday solids in clean colors, easy fits, and soft cotton.</p>
        </div>

        <div className="solids-footer__column">
          <h2>Shop</h2>
          <Link href="/collections/men">Men</Link>
          <Link href="/collections/women">Women</Link>
          <Link href="/collections/colors">Colors</Link>
          <Link href="/collections/all">All Products</Link>
        </div>

        <div className="solids-footer__column">
          <h2>Information</h2>
          <Link href="/pages/brand-story">Brand Story</Link>
          <Link href="/pages/contact-us">Contact Us</Link>
          <Link href="/policies/privacy-policy">Privacy Policy</Link>
          <Link href="/policies/refund-policy">Refund Policy</Link>
        </div>

        <form className="solids-footer__newsletter">
          <h2>Stay in the loop</h2>
          <label>
            <span>Email</span>
            <input type="email" aria-label="Email" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </footer>
  );
}
