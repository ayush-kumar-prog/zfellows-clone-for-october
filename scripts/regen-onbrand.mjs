#!/usr/bin/env node
/**
 * Regenerate Tokyo + Coast variant imagery with on-brand prompts that
 * match the Solids minimal-essentials aesthetic (no drop hype, no
 * athletic/route framing). Overwrites the off-brand files in
 * public/thesolids/variants/.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("Set GEMINI_API_KEY env var (Google AI Studio key for gemini-3-pro-image-preview).");
  process.exit(1);
}

const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${KEY}`;
const OUT = "public/thesolids/variants";
mkdirSync(OUT, { recursive: true });

const jobs = [
  {
    file: "tokyo-hero.jpg",
    aspect: "16:9",
    prompt: `Editorial fashion photograph in a serene modern architectural interior at twilight. A young man, age 24, stands in profile near a tall slender window in a minimalist Tadao Ando style concrete room. He wears a deep charcoal-black oversized Solids cotton t-shirt and matte black wide-leg trousers. Single source of soft warm tungsten light from a recessed sconce. The cotton fabric and the smooth concrete wall are co-equal subjects. Calm, contemplative mood. No neon, no signage, no crowd, no acid yellow. Color palette: ivory, deep ink black, warm grey concrete, single warm amber highlight. Shot on Hasselblad medium format, 80mm, soft film grain, Magnum-style restraint. Wide composition with negative space on the right for text overlay. Negative: streetwear, hype, drop, marquee, neon, katakana, multiple people, crowded, daylight harsh, smiling at camera, athletic gear.`,
  },
  {
    file: "tokyo-detail.jpg",
    aspect: "4:3",
    prompt: `Macro still life photograph of a folded deep ink-black Solids cotton t-shirt resting on smooth polished concrete, beside a single small ceramic cup of unsweetened black tea steaming gently, and a thin dark book bound in linen. Soft warm tungsten light from above-left, deep negative space, very shallow depth of field. Architectural minimal mood. Color palette: ink black, warm grey concrete, single soft amber light. Hasselblad medium format film aesthetic. Quiet, considered, expensive, magazine still-life mood. No text, no logos, no people, no neon.`,
  },
  {
    file: "coast-hero.jpg",
    aspect: "16:9",
    prompt: `Editorial dawn still-life photograph in a quiet bedroom near the sea at first light. A folded pearl-white Solids cotton t-shirt rests on rumpled warm cream linen sheets, with an open window in the background showing soft mist over a calm ocean horizon. A single ceramic mug of black coffee sits beside the folded tee. Color palette: cream, warm sand, soft sky blue, gentle peach dawn light. No people in frame, no athletic gear, no shoes, no running. Calm, slow, domestic, warm mood. Shot on 35mm Kodak Gold film, gentle warm grain, anamorphic-soft. Wide cinematic 16:9 composition with negative space on the right for text overlay. Negative: running, athletic, sneakers, joggers, sport, person mid-motion, harsh sun, neon, urban.`,
  },
  {
    file: "coast-detail.jpg",
    aspect: "4:3",
    prompt: `Editorial still life of a pearl-white Solids cotton t-shirt draped softly over a weathered pale-wood bench at the edge of a sand patio, beside a small enamel mug of black coffee and a piece of weathered driftwood. Warm diffused dawn light from the right, soft shadows, sand visible at the base of the bench, ocean mist blurred in background. Color palette: cream, warm sand, weathered driftwood, soft sky. Calm, slow-morning, apparel-forward mood. Shot on 35mm Kodak Gold, soft film grain. No people, no shoes, no athletic gear, no logos. Negative: sneakers, joggers, running, sport, route map, stopwatch, harsh sun.`,
  },
];

async function generate(job) {
  const dest = join(OUT, job.file);
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
