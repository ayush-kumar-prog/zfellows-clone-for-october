import Image from "next/image";
import { localAsset } from "@/lib/asset";

const NAVAL_PIC = localAsset(
  "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f3d85ff9b458d2c86ef823_zfellows-with-naval-ravikant.webp",
);

export function WhoAreZFellows() {
  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="font-bold text-foreground tracking-[-0.04em] leading-[1] mb-6"
              style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-2.2px" }}
            >
              Who are Z Fellows?
            </h2>
            <p className="text-[18px] lg:text-[20px] text-foreground/80 leading-snug">
              Z Fellows are technical builders of all ages working on side projects and startups.
              <br /><br />
              We are your first believer.
              <br /><br />
              We&rsquo;ve worked with high school dropouts, college students, and people with full-time jobs across a variety of industries including consumer, social, enterprise, defense, healthcare, edtech, fintech, cloud infrastructure, cybersecurity, crypto, Web3, AI, ML, climate, biotech, and more.
            </p>
          </div>
          <div className="rounded-[20px] overflow-hidden bg-warm-white">
            <Image
              src={NAVAL_PIC}
              alt="Naval Ravikant & Z Fellows"
              width={800}
              height={800}
              className="w-full h-auto object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
