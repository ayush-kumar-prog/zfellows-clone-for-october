import Image from "next/image";
import Link from "next/link";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { localAsset } from "@/lib/asset";
import type { WritingIndexEntry, WritingArticle } from "@/types/content";

export const dynamic = "force-static";

async function loadIndex(): Promise<WritingIndexEntry[]> {
  const p = join(process.cwd(), "src/data/writings/_index.json");
  const json = JSON.parse(await readFile(p, "utf8"));
  return json as WritingIndexEntry[];
}

// Walk every article to surface its hero image (the index file may not have it).
async function withHeroImages(
  entries: WritingIndexEntry[],
): Promise<WritingIndexEntry[]> {
  const out: WritingIndexEntry[] = [];
  for (const e of entries) {
    if (e.heroImage) {
      out.push({ ...e, heroImage: localAsset(e.heroImage) });
      continue;
    }
    try {
      const p = join(process.cwd(), "src/data/writings", `${e.slug}.json`);
      const article = JSON.parse(await readFile(p, "utf8")) as WritingArticle;
      // Use the first <img> in the article body as a fallback
      const m = article.html?.match(/<img[^>]+src=["']([^"']+)["']/i);
      out.push({ ...e, heroImage: m ? localAsset(m[1]) : null });
    } catch {
      out.push(e);
    }
  }
  return out;
}

export default async function BlogPage() {
  const raw = await loadIndex();
  const index = await withHeroImages(raw);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="w-full">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <h1 className="font-bold text-foreground tracking-[-0.04em] leading-[1] mb-12 lg:mb-16 text-center"
              style={{ fontSize: "clamp(48px, 7vw, 80px)", letterSpacing: "-3.2px" }}
            >
              Blog
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {index.map((post) => (
                <Link
                  key={post.slug}
                  href={`/writings/${post.slug}`}
                  className="group flex flex-col rounded-[18px] overflow-hidden bg-card border border-border hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  {post.heroImage ? (
                    <div className="relative aspect-[4/3] bg-warm-white overflow-hidden">
                      <Image
                        src={post.heroImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-gradient-to-br from-warm-white to-grey-cool" />
                  )}
                  <div className="flex flex-col gap-2 p-5 lg:p-6 flex-1">
                    {post.date && (
                      <p className="text-grey-mid text-[13px]">{post.date}</p>
                    )}
                    <h3 className="font-semibold text-foreground text-[18px] lg:text-[20px] tracking-[-0.02em] leading-snug">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
