import Image from "next/image";
import { heroCollage } from "@/data/heroCollage";

const APPLY_URL =
  "https://docs.google.com/forms/u/0/d/1z5HG9Pj0hIxS2oZL_wcJS5QqDZlcVbkhYGHp5Kp_IGM/viewform?edit_requested=true";

export function Hero() {
  // Split collage into 6 columns of ~3 photos each (matches live site layout)
  const columns: typeof heroCollage[] = [[], [], [], [], [], []];
  heroCollage.forEach((p, i) => {
    columns[i % 6].push(p);
  });

  return (
    <header className="relative w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-12 lg:pt-20 pb-16 lg:pb-24">
        {/* Top label */}
        <p className="text-center font-display text-[14px] lg:text-[16px] tracking-[0.2em] uppercase text-grey-mid mb-6 lg:mb-8">
          1 WEEK. $10,000.
        </p>

        {/* h1 — 80px Inter 700 letter-spacing -3.2px — exact match */}
        <h1
          className="text-center font-sans font-bold text-foreground leading-[0.95] tracking-[-0.04em] mb-6 lg:mb-8"
          style={{
            fontSize: "clamp(40px, 7.5vw, 80px)",
            letterSpacing: "-3.2px",
          }}
        >
          Your Fast-Track
          <br />
          Into Silicon Valley.
        </h1>

        {/* Sub */}
        <p className="text-center text-foreground/80 max-w-[640px] mx-auto text-[18px] lg:text-[20px] leading-snug mb-8 lg:mb-10">
          A one-week experience bringing you together
          <br className="hidden md:inline" />
          with founders of multi billion dollar companies.
        </p>

        {/* CTA */}
        <div className="flex justify-center mb-12 lg:mb-16">
          <a
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-zf-primary"
          >
            Apply Now
          </a>
        </div>

        {/* Collage grid */}
        <div className="relative">
          <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3 lg:gap-4">
            {heroCollage.map((p, i) => (
              <div
                key={p.src + i}
                className={[
                  "relative rounded-[14px] overflow-hidden bg-white-smoke",
                  p.hideUnder1280 ? "hidden xl:block" : "",
                ].join(" ")}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
          {/* Cream fade-out at bottom (matches live site linear-gradient overlay) */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 lg:h-48"
            style={{
              background:
                "linear-gradient(rgba(255, 253, 243, 0), rgb(255, 253, 243))",
            }}
          />
        </div>
      </div>
    </header>
  );
}
