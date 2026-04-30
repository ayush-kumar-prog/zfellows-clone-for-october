#!/usr/bin/env node
/**
 * Generate Nano Banana Pro hero imagery for the five real paywall
 * variants. These are interrupting walls/gates, not landing pages.
 *
 * Output: public/thesolids/walls/<slug>-hero.jpg
 */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("Set GEMINI_API_KEY env var.");
  process.exit(1);
}

const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${KEY}`;
const OUT = "public/thesolids/walls";
mkdirSync(OUT, { recursive: true });

const jobs = [
  {
    file: "wall-hero.jpg",
    aspect: "16:9",
    prompt: `Editorial fashion still life. A folded charcoal-black Solids cotton t-shirt resting on a polished cool grey marble bench in a dim modern museum atrium. A single dramatic spotlight from the upper right pools warm tungsten light over the t-shirt; the rest of the marble fades to deep navy shadow. Color palette: deep navy, cool grey marble, ink black, single warm amber highlight. Mood: tense, after-hours museum, contemplative. Shot on Hasselblad medium format, 80mm, very shallow depth of field, soft warm film grain. Wide cinematic 16:9 with the t-shirt slightly left of centre and large negative space on the right for an overlay modal. No people, no logos other than the small SOLIDS embroidery, no signage, no neon. Negative: bright, cluttered, daytime, gallery crowd, athletic, streetwear hype.`,
  },
  {
    file: "glass-hero.jpg",
    aspect: "16:9",
    prompt: `Editorial photograph in a sunlit kitchen at 8 a.m. A warm cream cotton t-shirt is folded on a worn pale-oak side table beside a small ceramic cup of steaming black coffee, viewed through a pane of misted glass — the entire frame is soft and blurred as if seen through a fogged window. Soft warm window light from the right, very gentle film grain. Color palette: warm cream, oak brown, soft sky blue, peach. Mood: domestic, gentle, slightly soft-focused. Shot on 35mm Kodak Gold film, anamorphic-soft. Wide cinematic 16:9 with negative space on the right for overlay text. No people, no logos other than tiny SOLIDS, no neon. Negative: harsh light, sharp focus, athletic, urban hype.`,
  },
  {
    file: "vault-hero.jpg",
    aspect: "16:9",
    prompt: `Editorial still life. A heavy brass hotel key with a leather fob rests on a folded ink-black Solids cotton t-shirt; both sit on a worn cognac leather chair beneath a partially drawn deep emerald velvet curtain in a dim members-club study. A single warm tungsten lamp from the upper left pools warm light over the key; the rest of the room falls into soft shadow. Color palette: ink black, cognac leather, emerald velvet, warm brass, deep shadow. Mood: members-only, after-hours club, secretive but elegant. Shot on Hasselblad medium format, 80mm, soft warm film grain. Wide cinematic 16:9 with the key slightly left of centre and large negative space on the right for a modal. No people, no logos, no signage, no neon. Negative: bright, daytime, athletic, hype.`,
  },
  {
    file: "pulse-hero.jpg",
    aspect: "16:9",
    prompt: `Editorial photograph. A small enamel diving watch with a deep cherry-red dial showing 09:42 lies on a folded ink-black Solids cotton t-shirt, on a polished white-marble surface with sharp ink-black shadow. Single overhead studio softbox, crisp cool-warm light. Color palette: ink black, cool white marble, cherry red, deep ink shadow, single warm amber highlight on the brass watch crown. Mood: tense, deadline, cinema-clean. Shot top-down on Hasselblad medium format, very crisp focus, fine film grain. Wide cinematic 16:9 with the watch slightly left of centre and negative space on the right for typography. No people, no logos other than tiny SOLIDS, no signage, no neon. Negative: streetwear, hype, athletic, daytime crowd.`,
  },
  {
    file: "velvet-hero.jpg",
    aspect: "16:9",
    prompt: `Editorial photograph. A heavy deep-burgundy velvet curtain is partially drawn aside, revealing a small polished cherry-wood side table with a folded warm cream Solids cotton t-shirt on it, a small porcelain cup of black coffee, and a single small white envelope sealed with cream wax. A single warm tungsten lamp from above-left casts soft warm pool of light. Color palette: deep burgundy velvet, warm cream cotton, cherry wood, soft brass, deep red shadow. Mood: secret, soft luxury, side-door-entrance to a private salon. Shot on Hasselblad medium format, 80mm, soft warm film grain, very shallow depth of field. Wide cinematic 16:9 with the side table on the left and negative space on the right for overlay text. No people, no logos, no signage, no neon. Negative: athletic, hype, harsh modern light, gym, daytime crowd.`,
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
    throw new Error(`${job.file} no inlineData. resp: ${JSON.stringify(data).slice(0, 600)}`);
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
