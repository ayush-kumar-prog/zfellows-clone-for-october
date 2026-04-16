import Image from "next/image";
import { investors } from "@/data/investors";

export function Investors() {
  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28 text-center">
        <h3 className="font-bold text-foreground tracking-[-0.04em] leading-[1.1] mb-12 lg:mb-16 max-w-[860px] mx-auto"
          style={{ fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-1.8px" }}
        >
          Z Fellows alumni have raised hundreds of millions from top investors
        </h3>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 items-center justify-items-center">
          {investors.map((inv) => (
            <div key={inv.name} className="flex items-center justify-center grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all">
              <Image
                src={inv.src}
                alt={inv.alt}
                width={140}
                height={50}
                className="object-contain max-h-[40px] lg:max-h-[50px] w-auto"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
