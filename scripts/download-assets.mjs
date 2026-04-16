#!/usr/bin/env node
/**
 * Z Fellows asset download script.
 *
 * Visits every unique route on zfellows.com, enumerates all <img> srcs,
 * favicons, OG images, and inline SVGs, and downloads everything to /public.
 *
 * Run: node scripts/download-assets.mjs
 *
 * Re-runnable: skips files that already exist on disk.
 */

import { mkdir, writeFile, access, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");

const ROUTES = [
  "https://www.zfellows.com/",
  "https://www.zfellows.com/blog",
  "https://www.zfellows.com/startup-workshop",
  // Sample writings — used to extract any unique article-only assets
  "https://www.zfellows.com/writings/maintaining-momentum",
  "https://www.zfellows.com/writings/becoming-an-outlier",
  "https://www.zfellows.com/writings/incrementalism",
];

// ===== utils =====

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function urlToLocal(url) {
  // Map https://cdn.prod.website-files.com/<siteId>/<file> -> public/images/<file>
  // Strip query string, decode URI components, take the basename.
  try {
    const u = new URL(url);
    const cleanPath = decodeURIComponent(u.pathname);
    const filename = cleanPath.split("/").filter(Boolean).pop() || "asset";
    // Sanitize filename
    const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_");

    // Categorize by extension
    if (/\.(ico|webmanifest)$/i.test(safe)) return join("seo", safe);
    if (/social-preview|og[-_]image|favicon|apple-touch-icon/i.test(safe))
      return join("seo", safe);
    if (/\.(mp4|webm|mov|m4v)$/i.test(safe)) return join("videos", safe);
    return join("images", safe);
  } catch {
    return join("images", "unknown_" + Date.now());
  }
}

async function downloadOne(url, relPath) {
  const dest = join(PUBLIC, relPath);
  if (await exists(dest)) {
    return { url, dest, status: "skip" };
  }
  await mkdir(dirname(dest), { recursive: true });
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) {
      return { url, dest, status: "error", code: res.status };
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    return { url, dest, status: "ok", bytes: buf.length };
  } catch (e) {
    return { url, dest, status: "error", error: e.message };
  }
}

async function batch(items, limit, fn) {
  const results = [];
  for (let i = 0; i < items.length; i += limit) {
    const slice = items.slice(i, i + limit);
    const settled = await Promise.all(slice.map(fn));
    results.push(...settled);
  }
  return results;
}

// ===== HTML parsing (regex — good enough for Webflow's static HTML) =====

function extractAssetsFromHtml(html) {
  const assets = new Set();

  // <img src="...">  and  srcset="..."
  for (const m of html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) {
    assets.add(m[1]);
  }
  for (const m of html.matchAll(/srcset=["']([^"']+)["']/gi)) {
    for (const part of m[1].split(",")) {
      const u = part.trim().split(/\s+/)[0];
      if (u) assets.add(u);
    }
  }

  // <link rel="icon" / "apple-touch-icon" / preload-image>
  for (const m of html.matchAll(/<link[^>]+href=["']([^"']+\.(?:png|ico|svg|webp|jpg|jpeg))["']/gi)) {
    assets.add(m[1]);
  }

  // <meta property="og:image" content="...">
  for (const m of html.matchAll(/<meta[^>]+content=["']([^"']+\.(?:png|jpg|jpeg|webp))["']/gi)) {
    assets.add(m[1]);
  }

  // url(...) inside <style> or inline style
  for (const m of html.matchAll(/url\(\s*["']?([^"')]+\.(?:png|jpg|jpeg|webp|svg|gif))["']?\s*\)/gi)) {
    assets.add(m[1]);
  }

  // <video src="..."> and <source src="...">
  for (const m of html.matchAll(/<(?:video|source)[^>]+src=["']([^"']+)["']/gi)) {
    assets.add(m[1]);
  }

  // Resolve relative URLs and only keep absolute http(s)
  const out = new Set();
  for (const a of assets) {
    if (a.startsWith("data:")) continue;
    if (a.startsWith("http://") || a.startsWith("https://")) {
      out.add(a);
    } else if (a.startsWith("//")) {
      out.add("https:" + a);
    } else if (a.startsWith("/")) {
      out.add("https://www.zfellows.com" + a);
    }
  }
  return [...out];
}

// ===== main =====

async function main() {
  console.log(`[download-assets] crawling ${ROUTES.length} route(s)`);

  const allUrls = new Set();
  for (const route of ROUTES) {
    process.stdout.write(`  ${route} ... `);
    try {
      const res = await fetch(route);
      const html = await res.text();
      const urls = extractAssetsFromHtml(html);
      console.log(`${urls.length} assets`);
      urls.forEach((u) => allUrls.add(u));
    } catch (e) {
      console.log(`ERROR ${e.message}`);
    }
  }

  console.log(`[download-assets] ${allUrls.size} unique URLs total`);

  const tasks = [...allUrls].map((url) => ({ url, rel: urlToLocal(url) }));

  // Save manifest before downloading
  await mkdir(PUBLIC, { recursive: true });
  await writeFile(
    join(ROOT, "docs/research/asset-manifest.json"),
    JSON.stringify(tasks, null, 2),
  );

  console.log(`[download-assets] downloading (4 parallel)...`);
  const results = await batch(tasks, 4, async (t) => downloadOne(t.url, t.rel));

  const ok = results.filter((r) => r.status === "ok").length;
  const skip = results.filter((r) => r.status === "skip").length;
  const errors = results.filter((r) => r.status === "error");

  console.log(`[download-assets] ok=${ok} skip=${skip} errors=${errors.length}`);
  if (errors.length) {
    console.log("[download-assets] first 5 errors:");
    errors.slice(0, 5).forEach((e) =>
      console.log(`  - ${e.code || e.error}  ${e.url}`),
    );
  }

  // Summary report
  await writeFile(
    join(ROOT, "docs/research/asset-download-report.json"),
    JSON.stringify({ ok, skip, errors: errors.slice(0, 50) }, null, 2),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
