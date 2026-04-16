import Image from "next/image";
import { localAsset } from "@/lib/asset";

const IMESSAGES = [
  {
    src: localAsset(
      "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f3df7bff21b8acd32a0ceb_ludvig-imessage-ss.webp",
    ),
    alt: "Message from Ludvig",
    rotate: -6,
  },
  {
    src: localAsset(
      "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f3df7b8e64c12fd9484975_ali-imessage-ss.webp",
    ),
    alt: "Message from Ali",
    rotate: 0,
  },
  {
    src: localAsset(
      "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f3df7b802d358fc1f7f94a_serlin-imessage-ss.webp",
    ),
    alt: "Message from Selin",
    rotate: 6,
  },
];

export function WhyZFellows() {
  return (
    <section className="w-full bg-warm-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28 text-center">
        <h2 className="font-bold text-foreground tracking-[-0.04em] leading-[1] mb-12 lg:mb-16"
          style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-2.2px" }}
        >
          Why<br />Z Fellows?
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10">
          {IMESSAGES.map((m) => (
            <div
              key={m.src}
              className="rounded-[20px] overflow-hidden bg-card shadow-md w-[260px] lg:w-[320px]"
              style={{ transform: `rotate(${m.rotate}deg)` }}
            >
              <Image
                src={m.src}
                alt={m.alt}
                width={400}
                height={600}
                className="w-full h-auto"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
