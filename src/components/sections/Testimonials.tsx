"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="w-full bg-warm-white">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <h2 className="text-center font-bold text-foreground tracking-[-0.04em] leading-[1] mb-12 lg:mb-16"
          style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-2.2px" }}
        >
          Hear from
          <br /> our alumni
        </h2>

        <div className="relative min-h-[280px]">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={[
                "absolute inset-0 transition-opacity duration-500",
                i === active ? "opacity-100" : "opacity-0 pointer-events-none",
              ].join(" ")}
            >
              <div className="flex flex-col items-center text-center max-w-[820px] mx-auto">
                {t.authorImage && (
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mb-5 bg-card">
                    <Image
                      src={t.authorImage}
                      alt={t.author}
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <p className="text-foreground/85 text-[18px] lg:text-[22px] leading-snug mb-5 prose-zf">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="font-semibold text-foreground text-[16px] lg:text-[18px]">
                  {t.author}
                </p>
                <p className="text-grey-mid text-[14px] lg:text-[16px]">
                  {t.authorRole}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              className={[
                "h-2 rounded-full transition-all",
                i === active ? "w-6 bg-blue" : "w-2 bg-grey-cool",
              ].join(" ")}
              style={{ backgroundColor: i === active ? "#2067ff" : "#e1e4ea" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
