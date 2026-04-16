#!/usr/bin/env node
/**
 * Scrape every /writings/<slug> article from zfellows.com and write its content
 * to src/data/writings/<slug>.json so the Next.js [slug] route can statically
 * render all 50 posts via generateStaticParams().
 *
 * Output JSON shape:
 *   { slug, title, date, heroImage?, html, plainText }
 *
 * Re-runnable (overwrites existing files).
 */

import { mkdir, writeFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "src/data/writings");
const URL_INVENTORY = join(ROOT, "docs/research/URL_INVENTORY.md");

// Parse the slug list from URL_INVENTORY.md (the fenced ``` block under "All `/writings/*` slugs").
async function loadSlugs() {
  const md = await readFile(URL_INVENTORY, "utf8");
  const match = md.match(/All `\/writings\/\*` slugs[\s\S]*?```([\s\S]*?)```/);
  if (!match) throw new Error("Could not find slug list in URL_INVENTORY.md");
  return match[1].trim().split("\n").map((s) => s.trim()).filter(Boolean);
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"');
}

function extractBetween(html, openRegex, closeTag) {
  const m = html.match(openRegex);
  if (!m) return null;
  const start = m.index + m[0].length;
  const closeIdx = html.indexOf(closeTag, start);
  if (closeIdx < 0) return null;
  return html.slice(start, closeIdx);
}

function stripTags(s) {
  return decode(s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function parseArticle(html, slug) {
  // Title is in <h1> inside .section_writing-body
  const titleMatch =
    html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [, slug];
  const title = stripTags(titleMatch[1]);

  // Date: Webflow CMS typically renders date inside .blog-collection-date or as part of the meta header
  let date = "";
  const dateMatches = [
    /<div[^>]+class=["'][^"']*(?:date|publish)[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
    /<time[^>]*>([\s\S]*?)<\/time>/i,
  ];
  for (const re of dateMatches) {
    const m = html.match(re);
    if (m) {
      date = stripTags(m[1]);
      break;
    }
  }

  // Article body: capture .new-rich-text (this is where the post content lives on writings pages)
  let bodyHtml = extractBetween(
    html,
    /<div[^>]+class=["'][^"']*(?:w-richtext|new-rich-text)[^"']*["'][^>]*>/i,
    "</div>"
  );
  // The above naive close tag won't match nested divs. Use a smarter approach:
  bodyHtml = extractRichText(html);

  // Hero image
  const heroMatch = html.match(
    /<img[^>]+class=["'][^"']*(?:writing-hero|blog-hero|hero-image)[^"']*["'][^>]*src=["']([^"']+)["']/i
  );
  const heroImage = heroMatch ? heroMatch[1] : null;

  return {
    slug,
    title,
    date,
    heroImage,
    html: bodyHtml || "",
    plainText: bodyHtml ? stripTags(bodyHtml).slice(0, 500) : "",
  };
}

// Smarter rich-text extractor that respects nested divs.
function extractRichText(html) {
  const re = /<div[^>]+class=["'][^"']*(?:new-rich-text|w-richtext)[^"']*["'][^>]*>/i;
  const m = html.match(re);
  if (!m) return "";
  const start = m.index + m[0].length;
  // Walk forward, tracking <div> depth.
  let depth = 1;
  let i = start;
  while (i < html.length) {
    const openIdx = html.indexOf("<div", i);
    const closeIdx = html.indexOf("</div>", i);
    if (closeIdx < 0) break;
    if (openIdx >= 0 && openIdx < closeIdx) {
      depth++;
      i = openIdx + 4;
    } else {
      depth--;
      if (depth === 0) {
        return html.slice(start, closeIdx).trim();
      }
      i = closeIdx + 6;
    }
  }
  return html.slice(start).trim();
}

async function fetchSlug(slug) {
  const url = `https://www.zfellows.com/writings/${slug}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function batch(items, limit, fn) {
  const results = [];
  for (let i = 0; i < items.length; i += limit) {
    const slice = items.slice(i, i + limit);
    const settled = await Promise.allSettled(slice.map(fn));
    results.push(...settled);
  }
  return results;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const slugs = await loadSlugs();
  console.log(`[scrape-writings] ${slugs.length} slugs to fetch`);

  let ok = 0, fail = 0;
  const failures = [];
  await batch(slugs, 5, async (slug) => {
    try {
      const html = await fetchSlug(slug);
      const article = parseArticle(html, slug);
      await writeFile(join(OUT, `${slug}.json`), JSON.stringify(article, null, 2));
      ok++;
      process.stdout.write(`.`);
    } catch (e) {
      fail++;
      failures.push({ slug, err: e.message });
      process.stdout.write(`x`);
    }
  });
  console.log(`\n[scrape-writings] ok=${ok} fail=${fail}`);
  if (failures.length) {
    console.log("[scrape-writings] failures:", failures.slice(0, 10));
  }

  // Index file
  const index = (await Promise.all(
    slugs.map(async (slug) => {
      try {
        const j = JSON.parse(await readFile(join(OUT, `${slug}.json`), "utf8"));
        return { slug: j.slug, title: j.title, date: j.date, heroImage: j.heroImage };
      } catch {
        return null;
      }
    })
  )).filter(Boolean);
  await writeFile(join(OUT, "_index.json"), JSON.stringify(index, null, 2));
  console.log(`[scrape-writings] wrote _index.json with ${index.length} entries`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
