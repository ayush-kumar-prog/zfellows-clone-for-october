import Image from "next/image";
import { localAsset } from "@/lib/asset";

const GALLERY_PHOTOS = [
  "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f3d8611674ba3122ea2536_zfellows-people-at-a-workshop-image.webp",
  "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f3d85ff9b458d2c86ef823_zfellows-with-naval-ravikant.webp",
  "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f41547ad68b9c0e3011893_zfellows-cory%27s-tweet%201.png",
  "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f41547ee5c1e3f82efaf31_zuck%201.webp.crdownload%201.png",
  "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f41544fa7bd0dc4a8c0177_google%20dorm%201.png",
  "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f4154522d4fd2295b8069e_IMG_9615%201.png",
];

export function Gallery() {
  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28 text-center">
        <h3 className="font-bold text-foreground tracking-[-0.04em] leading-[1] mb-12"
          style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-2.2px" }}
        >
          It&rsquo;s happening now.
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {GALLERY_PHOTOS.map((src) => (
            <div key={src} className="rounded-[18px] overflow-hidden bg-warm-white aspect-[4/3] relative">
              <Image
                src={localAsset(src)}
                alt="Z Fellows gallery"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
