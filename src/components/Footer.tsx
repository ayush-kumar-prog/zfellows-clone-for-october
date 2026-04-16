import Link from "next/link";

const FOOTER_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Mentors", href: "/#mentors" },
  { label: "FAQs", href: "/#faqs" },
  { label: "Blog", href: "/blog" },
  { label: "Startup Workshop", href: "/startup-workshop" },
];

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border mt-0">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Brand + nav */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start lg:items-center">
            <Link href="/" className="font-brand text-[20px] font-medium text-foreground">
              Z Fellows
            </Link>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[15px] text-foreground hover:opacity-70 transition-opacity"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/zfellows"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Z Fellows on X"
              className="text-foreground hover:opacity-70 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  d="M10.1405 7.00562L16.152 0.167969H14.7277L9.5055 6.10378L5.33762 0.167969H0.529297L6.83342 9.14475L0.529297 16.3145H1.95365L7.46504 10.0446L11.8675 16.3145H16.6758L10.1405 7.00562ZM8.18898 9.22358L7.54929 8.32912L2.46728 1.2187H4.65543L8.75791 6.9592L9.39495 7.8536L14.727 15.315H12.5389L8.18898 9.22358Z"
                  fill="#363636"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-[13px] text-grey-mid">
          © {new Date().getFullYear()} Z Fellows
        </div>
      </div>
    </footer>
  );
}
