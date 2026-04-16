/**
 * Map a Webflow CDN URL to a local /images/<filename> path.
 * Mirrors the `urlToLocal()` function in scripts/download-assets.mjs so every
 * downloaded asset round-trips correctly.
 */
export function localAsset(cdnUrl: string | null | undefined): string {
  if (!cdnUrl) return "";
  if (cdnUrl.startsWith("/")) return cdnUrl;
  try {
    const u = new URL(cdnUrl);
    const decoded = decodeURIComponent(u.pathname);
    const filename = decoded.split("/").filter(Boolean).pop() || "";
    const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    if (/\.(ico|webmanifest)$/i.test(safe)) return "/seo/" + safe;
    if (/social-preview|og[-_]image|favicon|apple-touch-icon/i.test(safe))
      return "/seo/" + safe;
    if (/\.(mp4|webm|mov|m4v)$/i.test(safe)) return "/videos/" + safe;
    return "/images/" + safe;
  } catch {
    return cdnUrl;
  }
}
