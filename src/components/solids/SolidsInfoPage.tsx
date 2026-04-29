import Link from "next/link";
import { FloatingChrome } from "./FloatingChrome";
import { SolidsFooter } from "./SolidsFooter";
import { SolidsHeader } from "./SolidsHeader";

type SolidsInfoPageProps = {
  title: string;
  kind?: "contact" | "brand" | "policy" | "cart" | "account" | "search";
};

export function SolidsInfoPage({ title, kind = "policy" }: SolidsInfoPageProps) {
  return (
    <>
      <SolidsHeader />
      <main className="solids-main solids-main--info">
        <section className="solids-info solids-container">
          <nav aria-label="Breadcrumb" className="solids-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>{title}</span>
          </nav>
          <h1>{title}</h1>
          {kind === "contact" && <ContactContent />}
          {kind === "brand" && <BrandContent />}
          {kind === "cart" && <CartContent />}
          {kind === "account" && <AccountContent />}
          {kind === "search" && <SearchContent />}
          {kind === "policy" && <PolicyContent title={title} />}
        </section>
      </main>
      <SolidsFooter />
      <FloatingChrome />
    </>
  );
}

function ContactContent() {
  return (
    <div className="solids-info__grid">
      <div>
        <h2>Contact Us</h2>
        <p>
          For order, sizing, or shipping queries, send a message and the Solids
          team will get back to you.
        </p>
      </div>
      <form className="solids-info__form">
        <input aria-label="Name" placeholder="Name" />
        <input aria-label="Email" placeholder="Email" type="email" />
        <textarea aria-label="Message" placeholder="Message" rows={6} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function BrandContent() {
  return (
    <div className="solids-info__narrow">
      <p>
        Solids focuses on premium everyday essentials, clean colors, and
        comfortable silhouettes across t-shirts, tanks, joggers, and sweatshirts.
      </p>
      <p>
        The store is built around easy-to-repeat wardrobe pieces with simple
        fits and fabric-first merchandising.
      </p>
    </div>
  );
}

function CartContent() {
  return (
    <div className="solids-empty-state">
      <h2>Shopping Cart</h2>
      <p>0 items</p>
      <Link href="/collections/all" className="solids-button">
        Continue shopping
      </Link>
    </div>
  );
}

function AccountContent() {
  return (
    <form className="solids-info__form solids-info__form--account">
      <input aria-label="Email Address" placeholder="Email Address *" type="email" />
      <input aria-label="Password" placeholder="Password *" type="password" />
      <button type="submit">Login</button>
      <div className="solids-info__account-links">
        <Link href="/account/login">Forgot your password?</Link>
        <Link href="/account/register">Create account</Link>
      </div>
    </form>
  );
}

function SearchContent() {
  return (
    <form className="solids-info__form solids-info__form--search">
      <input aria-label="Search" placeholder="Search" />
      <button type="submit">Search</button>
    </form>
  );
}

function PolicyContent({ title }: { title: string }) {
  return (
    <div className="solids-info__narrow">
      <p>
        {title} information for Solids orders. Delivery timelines are 3-5
        business days unless stated otherwise on the product page.
      </p>
      <p>
        Items must be unused, in their original packaging, and accompanied by
        order details for any support request.
      </p>
    </div>
  );
}
