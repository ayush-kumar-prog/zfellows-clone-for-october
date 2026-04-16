import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { localAsset } from "@/lib/asset";
import type { WritingArticle, WritingIndexEntry } from "@/types/content";

export const dynamicParams = false;

async function loadAll(): Promise<WritingIndexEntry[]> {
  const p = join(process.cwd(), "src/data/writings/_index.json");
  return JSON.parse(await readFile(p, "utf8")) as WritingIndexEntry[];
}

async function loadArticle(slug: string): Promise<WritingArticle | null> {
  try {
    const p = join(process.cwd(), "src/data/writings", `${slug}.json`);
    return JSON.parse(await readFile(p, "utf8")) as WritingArticle;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const all = await loadAll();
  return all.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await loadArticle(slug);
  return {
    title: article?.title ? `${article.title} | Z Fellows` : "Z Fellows",
    description: article?.plainText?.slice(0, 160),
  };
}

/**
 * Rewrite Webflow CDN URLs in HTML to local /images/ paths.
 */
function rewriteHtml(html: string): string {
  return html.replace(/(src|href)=["']([^"']+)["']/g, (m, attr, url) => {
    if (url.includes("cdn.prod.website-files.com")) {
      return `${attr}="${localAsset(url)}"`;
    }
    return m;
  });
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await loadArticle(slug);
  if (!article) return notFound();

  const all = await loadAll();
  const idx = all.findIndex((a) => a.slug === slug);
  const related = [
    all[(idx + 1) % all.length],
    all[(idx + 2) % all.length],
    all[(idx + 3) % all.length],
  ].filter((a) => a && a.slug !== slug);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Article body */}
        <article className="w-full">
          <div className="max-w-[720px] mx-auto px-6 lg:px-8 py-12 lg:py-20">
            {article.date && (
              <p className="text-grey-mid text-[14px] lg:text-[16px] mb-4">
                {article.date}
              </p>
            )}
            <h1
              className="font-bold text-foreground tracking-[-0.04em] leading-[1.05] mb-8 lg:mb-12"
              style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-2.4px" }}
            >
              {article.title}
            </h1>
            {article.heroImage && (
              <div className="relative aspect-[16/9] rounded-[18px] overflow-hidden bg-warm-white mb-10">
                <Image
                  src={localAsset(article.heroImage)}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            <div
              className="prose-zf font-brand text-foreground text-[16px] lg:text-[18px] leading-[1.7] [&_p]:mb-5 [&_h2]:font-semibold [&_h2]:text-[24px] [&_h2]:lg:text-[28px] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-semibold [&_h3]:text-[20px] [&_h3]:mt-8 [&_h3]:mb-3 [&_a]:text-blue [&_a]:underline [&_img]:rounded-[14px] [&_img]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-blue [&_blockquote]:pl-5 [&_blockquote]:italic"
              style={{ color: "#000b1c", fontFamily: "var(--font-brand)" }}
              dangerouslySetInnerHTML={{ __html: rewriteHtml(article.html) }}
            />
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="w-full bg-warm-white">
            <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-16">
              <h2 className="font-bold text-foreground tracking-[-0.04em] mb-8"
                style={{ fontSize: "clamp(24px, 3vw, 32px)", letterSpacing: "-1.2px" }}
              >
                Related articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/writings/${r.slug}`}
                    className="group rounded-[16px] bg-card p-5 lg:p-6 hover:shadow-md transition-all"
                  >
                    {r.date && (
                      <p className="text-grey-mid text-[12px] mb-2">{r.date}</p>
                    )}
                    <h3 className="font-semibold text-foreground text-[16px] lg:text-[18px] leading-snug tracking-[-0.02em]">
                      {r.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cory CTA */}
        <section className="w-full">
          <div className="max-w-[800px] mx-auto px-6 lg:px-10 py-12 text-center">
            <p className="text-foreground text-[18px] lg:text-[22px] tracking-[-0.02em]">
              Questions? Text Cory at{" "}
              <a href="sms:6505059984" className="text-blue underline" style={{ color: "#2067ff" }}>
                650-505-9984
              </a>
            </p>
          </div>
        </section>

        {/* Newsletter (link out — keep simple) */}
        <section className="w-full bg-warm-white">
          <div className="max-w-[800px] mx-auto px-6 lg:px-10 py-16 text-center">
            <h3 className="font-bold text-foreground tracking-[-0.04em] mb-4"
              style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-1.6px" }}
            >
              Subscribe to our newsletter
            </h3>
            <p className="text-foreground/75 text-[16px] lg:text-[18px] mb-6">
              Weekly writings on building, founders, and Silicon Valley wisdom.
            </p>
            <Link href="/blog" className="btn-zf-primary inline-block">
              Read more
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
