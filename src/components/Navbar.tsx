import Link from "next/link";

const APPLY_URL =
  "https://docs.google.com/forms/u/0/d/1z5HG9Pj0hIxS2oZL_wcJS5QqDZlcVbkhYGHp5Kp_IGM/viewform?edit_requested=true";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Mentors", href: "/#mentors" },
  { label: "FAQs", href: "/#faqs" },
  { label: "Blog", href: "/blog" },
  { label: "Startup Workshop", href: "/startup-workshop" },
];

export function Navbar() {
  return (
    <nav className="w-full bg-background relative z-[1000]">
      <div className="max-w-[1280px] mx-auto h-[81.5938px] px-6 lg:px-10 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center">
          <span
            className="font-brand text-[24px] font-medium text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-brand)" }}
          >
            Z Fellows
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[16px] text-foreground hover:opacity-70 transition-opacity"
            >
              {l.label}
            </Link>
          ))}
          <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="btn-zf-primary">
            Apply Now
          </a>
        </div>

        {/* Mobile: just the apply button (no hamburger for simplicity — matches Webflow's collapsed look) */}
        <div className="lg:hidden flex items-center gap-3">
          <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="btn-zf-primary !text-[16px] !px-6 !py-2">
            Apply Now
          </a>
        </div>
      </div>
    </nav>
  );
}
