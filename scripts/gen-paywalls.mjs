#!/usr/bin/env node
/**
 * Generate Nano Banana Pro hero imagery for the three paywall variants.
 * Each represents the same Solids customer at the moment of conversion,
 * but in three radically different aesthetic rooms:
 *   - Library  (bookshop / reading-room)
 *   - Member   (concierge / sage / brass)
 *   - Edition  (museum print / architectural)
 *
 * Output: public/thesolids/paywalls/<slug>-{hero,detail}.jpg
 */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("Set GEMINI_API_KEY env var.");
  process.exit(1);
}

const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${KEY}`;
const OUT = "public/thesolids/paywalls";
mkdirSync(OUT, { recursive: true });

const jobs = [
  {
    file: "library-hero.jpg",
    aspect: "16:9",
    prompt: `Editorial still life photograph in a quiet private library at dusk. A folded cream-coloured cotton t-shirt rests on a worn cognac leather desk pad, beside a leather-bound book bound in cream cloth, a single brass desk lamp with green silk shade casting soft warm pool of light, an open fountain pen, and a small porcelain cup of espresso. Bookshelves blurred in the deep background. Color palette: warm cream, oak brown, soft brass, deep green-black shadow. Mood: contemplative, scholarly, slow, magazine still-life. Shot on Hasselblad medium format, 80mm, very shallow depth of field, soft warm film grain. No people, no logos other than tiny SOLIDS, no signage. Wide cinematic 16:9 with negative space on the right for text overlay. Negative: harsh modern light, cluttered, daytime, neon, athletic.`,
  },
  {
    file: "library-detail.jpg",
    aspect: "4:3",
    prompt: `Macro still life of a folded soft cream cotton t-shirt resting on a worn linen cloth, with a small ivory bookplate beside it stamped with delicate serif type. Single warm brass-lamp light from the upper left, deep negative space, very shallow depth of field. Warm cream and oak palette. Hasselblad medium format film aesthetic. Quiet, considered, expensive. No people, no large logos, no neon.`,
  },
  {
    file: "member-hero.jpg",
    aspect: "16:9",
    prompt: `Editorial photograph of a small hotel-concierge-style writing desk in a softly lit private room. A neatly folded sage-green cotton t-shirt rests on a warm cream linen tray, beside a small brass key on a leather fob, a cream calling card in a neat envelope, and a single short-stem ranunculus in a thin glass vase. Color palette: muted sage, warm cream, soft brass, faded olive. Soft warm window light from the right. Mood: members-only, concierge, considered, midcentury luxe. Shot on Hasselblad medium format, 80mm, soft warm film grain, very shallow depth of field. Wide cinematic 16:9 with negative space on the left for text overlay. No people, no large logos, no signage. Negative: gym, athletic, harsh light, neon, urban street.`,
  },
  {
    file: "member-detail.jpg",
    aspect: "4:3",
    prompt: `Soft macro photograph of a small brass hotel-style key resting on a folded sage-green cotton t-shirt, beside a cream calling card with neat black serif type. Warm soft lamplight from the upper left. Color palette: sage, warm cream, brass. Mood: concierge, private, calm. Hasselblad medium format, very shallow depth of field, soft grain. No people, no logos.`,
  },
  {
    file: "edition-hero.jpg",
    aspect: "16:9",
    prompt: `Architectural editorial photograph for a museum print catalogue. A pearl-white cotton t-shirt is laid flat on a smooth pale concrete surface, perfectly centred, beside a thin polished steel architect's ruler and a small black wax-stamped tag reading 04 / 144. Cool diffused overhead studio light from a single softbox above, hard but soft-edged shadows. Color palette: stark warm white, soft concrete grey, deep ink black, single small amber tag. Mood: archival, factual, museum-print, anonymous luxury. Shot top-down on Hasselblad medium format, 80mm, very crisp focus front-to-back, fine film grain. Wide cinematic 16:9 with the t-shirt centred and negative space all around for typography. No people, no large logos, no athletic gear.`,
  },
  {
    file: "edition-detail.jpg",
    aspect: "4:3",
    prompt: `Macro top-down photograph of a small black wax-stamped paper tag reading 04 / 144 placed on a folded pearl-white cotton t-shirt against pale concrete. Single overhead softbox, crisp focus, ink-black palette, museum-print mood. No people, no logos.`,
  },
];

async function generate(job) {
  const dest = join(OUT, job.file);
  if (existsSync(dest)) {
    console.log(`skip ${job.file} (exists)`);
    return;
  }
  console.log(`gen ${job.file} ${job.aspect}`);
  const body = {
    contents: [{ parts: [{ text: job.prompt }] }],
    generationConfig: { imageConfig: { aspectRatio: job.aspect } },
  };
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${job.file} HTTP ${res.status}: ${text.slice(0, 600)}`);
  }
  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const part = parts.find((p) => p.inlineData?.data);
  if (!part) {
    throw new Error(
      `${job.file} no inlineData. resp: ${JSON.stringify(data).slice(0, 600)}`,
    );
  }
  const buffer = Buffer.from(part.inlineData.data, "base64");
  writeFileSync(dest, buffer);
  console.log(`ok ${job.file} ${buffer.length} bytes`);
}

(async () => {
  for (const job of jobs) {
    let attempt = 0;
    while (attempt < 3) {
      try {
        await generate(job);
        break;
      } catch (err) {
        attempt += 1;
        console.error(`[attempt ${attempt}] ${err.message}`);
        if (attempt >= 3) throw err;
        await new Promise((r) => setTimeout(r, 3000));
      }
    }
  }
  console.log("all done");
})();
