import Link from "next/link";
import { ChevronLeft, ChevronRight, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { navItems, type SolidsVariant } from "@/data/solids";

type SolidsHeaderProps = {
  variant?: SolidsVariant;
  page?: "home" | "store";
};

export function SolidsHeader({ page = "store" }: SolidsHeaderProps) {
  const announcement =
    page === "home"
      ? "5% Prepaid Discount - Shop Now & Save"
      : "Tank Top Summer Deal - Buy 1 @399 | 2 @699 | 3 @999";

  return (
    <header className="solids-header">
      <div className="solids-announcement" aria-label="Announcement">
        <ChevronLeft size={18} strokeWidth={1.6} />
        <span>{announcement}</span>
        <ChevronRight size={18} strokeWidth={1.6} />
      </div>

      <div className="solids-mobile-header">
        <div className="solids-mobile-header__left">
          <button className="solids-icon-button" aria-label="Open menu">
            <Menu size={24} strokeWidth={1.9} />
          </button>
          <Link href="/search" className="solids-icon-button" aria-label="Search">
            <Search size={21} strokeWidth={1.9} />
          </Link>
        </div>
        <Link href="/" className="solids-header__mobile-logo" aria-label="Solids home">
          <img src="/thesolids/logo.svg" alt="Solids" />
        </Link>
        <Link href="/cart" className="solids-icon-button" aria-label="Cart">
          <ShoppingBag size={22} strokeWidth={1.8} />
        </Link>
      </div>

      <div className="solids-desktop-header">
        <nav className="solids-header__nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.title} href={item.href}>
              {item.title}
            </Link>
          ))}
        </nav>

        <Link href="/" className="solids-header__logo" aria-label="Solids home">
          <img src="/thesolids/logo.svg" alt="Solids" />
        </Link>

        <div className="solids-header__actions">
          <Link href="/search" className="solids-icon-button" aria-label="Search">
            <Search size={20} strokeWidth={1.7} />
          </Link>
          <Link href="/account/login" className="solids-icon-button" aria-label="Account">
            <UserRound size={20} strokeWidth={1.7} />
          </Link>
          <Link href="/cart" className="solids-icon-button" aria-label="Cart">
            <ShoppingBag size={21} strokeWidth={1.7} />
          </Link>
        </div>
      </div>
    </header>
  );
}
