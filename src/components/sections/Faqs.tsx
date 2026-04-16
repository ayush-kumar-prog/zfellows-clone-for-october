"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";

export function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="w-full">
      <div className="max-w-[800px] mx-auto px-6 lg:px-10 py-20 lg:py-32">
        <h2 className="text-center text-foreground font-bold text-[40px] md:text-[56px] tracking-[-0.04em] mb-12 lg:mb-16 leading-[1]">
          FAQs
        </h2>

        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.question}
                className="border border-border rounded-2xl bg-card overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 lg:px-8 lg:py-6 text-left hover:bg-warm-white/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <p className="text-[18px] lg:text-[24px] font-semibold text-foreground tracking-[-0.02em]">
                    {item.question}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    className="shrink-0 transition-transform duration-300"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <path
                      d="M14 1.74121L8 7.74121L2 1.74121"
                      stroke="#363636"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <div
                    className="px-6 pb-5 lg:px-8 lg:pb-6 text-[16px] lg:text-[18px] text-foreground/80 leading-relaxed prose-zf"
                    dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
