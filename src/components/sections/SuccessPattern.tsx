import Image from "next/image";
import { localAsset } from "@/lib/asset";

const CARDS = [
  {
    src: localAsset(
      "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f3d87c3e4789113105794c_google-founders-siiting-on-table-with%20computer.webp",
    ),
    alt: "Google founders early days",
    label: "Google",
  },
  {
    src: localAsset(
      "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f3d87c4fd702cb5465a7da_mark-zuckerberg-and-his-friends-looking-at-a-laptop.webp",
    ),
    alt: "Mark Zuckerberg & friends early days",
    label: "Facebook",
  },
  {
    src: localAsset(
      "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f3d87c36646f6f2fac557a_youtube-founders-looking-up.webp",
    ),
    alt: "YouTube founders early days",
    label: "YouTube",
  },
];

export function SuccessPattern() {
  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28 text-center">
        <h2 className="font-bold text-foreground tracking-[-0.04em] leading-[1.05] max-w-[1100px] mx-auto"
          style={{ fontSize: "clamp(36px, 5.2vw, 64px)", letterSpacing: "-2.5px" }}
        >
          There&rsquo;s a pattern among
          <br className="hidden md:inline" /> the most successful founders.
        </h2>
        <p className="mt-6 lg:mt-8 max-w-[760px] mx-auto text-[18px] lg:text-[22px] text-foreground/75 leading-snug">
          They all started by learning from those who have built multi billion dollar companies.
          <br className="hidden md:inline" />
          Getting mentored by proven founders is the fastest way to accelerate.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16 lg:mt-24">
          {CARDS.map((c) => (
            <div key={c.label} className="rounded-[20px] overflow-hidden bg-warm-white">
              <Image
                src={c.src}
                alt={c.alt}
                width={600}
                height={600}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
