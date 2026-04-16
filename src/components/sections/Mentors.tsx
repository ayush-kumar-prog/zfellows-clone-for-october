import Image from "next/image";
import { mentors } from "@/data/mentors";

export function Mentors() {
  return (
    <section id="mentors" className="w-full">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <h2 className="text-center font-bold text-foreground tracking-[-0.04em] leading-[1] mb-12 lg:mb-16"
          style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-2.2px" }}
        >
          Meet the mentors
        </h2>

        {/* Desktop grid (5 cols) */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
          {mentors.map((m) => (
            <div key={m.name} className="flex flex-col">
              <div className="relative aspect-square rounded-[16px] overflow-hidden bg-warm-white mb-3">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width: 1024px) 33vw, 20vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <p className="font-semibold text-foreground text-[16px] lg:text-[18px] tracking-[-0.02em]">
                {m.name}
              </p>
              <p className="text-grey-mid text-[13px] lg:text-[14px]">{m.role}</p>
            </div>
          ))}
        </div>

        {/* Mobile carousel (horizontal scroll-snap) */}
        <div className="md:hidden -mx-6 px-6 overflow-x-auto snap-x snap-mandatory flex gap-4 pb-2">
          {mentors.map((m) => (
            <div key={m.name + "-m"} className="snap-start shrink-0 w-[70%] flex flex-col">
              <div className="relative aspect-square rounded-[16px] overflow-hidden bg-warm-white mb-3">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="70vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <p className="font-semibold text-foreground text-[18px] tracking-[-0.02em]">
                {m.name}
              </p>
              <p className="text-grey-mid text-[14px]">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
