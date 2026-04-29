#!/usr/bin/env node
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
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
    file: "atelier-hero.jpg",
    aspect: "16:9",
    prompt: `Editorial fashion photograph, golden hour, soft warm natural sunlight. A young woman, age 24, sits cross-legged on a linen-covered window seat wearing a cream oversized Solids cotton t-shirt and natural linen pants. Sheer curtain billows softly. Eyes closed, peaceful expression, no smile. Color palette: warm cream, sand, butter yellow, amber, soft brown. Shot on Hasselblad medium format, 80mm, shallow depth of field, soft film grain. Magazine cover quality. Single subject, no logos visible. Calm, quiet, expensive mood. Composition with negative space on the right side for text overlay. Negative: harsh shadows, neon, urban background, group shots, smiling at camera.`,
  },
  {
    file: "atelier-detail.jpg",
    aspect: "4:3",
    prompt: `Still life photograph of a folded cream cotton t-shirt on a sand-colored linen sheet, accompanied by a small ceramic cup of espresso, a brass watch, and a hardcover book in warm beige tones. Soft window light from the left, very shallow depth of field. Warm cream and amber palette. Hasselblad medium format film aesthetic. Quiet, expensive, magazine still-life mood. No text, no logos, no people.`,
  },
  {
    file: "tokyo-hero.jpg",
    aspect: "16:9",
    prompt: `Cinematic street fashion photograph at night in Shibuya, Tokyo, around 11 PM. A young man, age 22, wearing a jet black oversized Solids cotton t-shirt and black wide-leg trousers, walking diagonally across the frame. Shot from behind and slightly to the side. Background blurred neon-lit Japanese signage in pinks, blues, and a single acid yellow accent. Wet pavement reflections, light rain just stopping. Sharp focus on subject, heavy motion blur on background. Cool moody color palette with a single acid yellow neon accent. Shot on 35mm Kodak Portra, anamorphic flare. Single subject, no other people, dramatic, anti-establishment mood. Wide composition with negative space on the left for text overlay. Negative: smiling, daytime, multiple people, brand logos other than SOLIDS, cluttered crowd.`,
  },
  {
    file: "tokyo-detail.jpg",
    aspect: "4:3",
    prompt: `Extreme close-up macro photograph of a black cotton t-shirt sleeve and forearm, with a small white SOLIDS wordmark print on the cuff. Acid yellow neon light reflecting on the black fabric, suggesting Tokyo street signage. Very dark mood, underexposed, moody, cinematic. Negative: faces, full bodies, daytime light, bright colors other than acid yellow.`,
  },
  {
    file: "coast-hero.jpg",
    aspect: "16:9",
    prompt: `Cinematic dawn beach photograph at 6:14 AM. A young woman, age 25, running along wet sand at the edge of the Pacific Ocean wearing a pearl white Solids tank top and Midnight Navy Solids joggers. Wide horizon misty pastel sky in soft sky blue, peach, and sand. Backlit by rising sun, anamorphic lens flare, atmospheric fog over the water, gentle motion blur on her legs. Shot on 35mm Kodak Gold film, gentle warm grain. Wide cinematic 16:9 composition with the runner small in the frame on the right and ocean fog on the left. Single subject, athletic and serene mood, no text, no logos other than SOLIDS. Negative: posed, indoors, harsh sun overhead, multiple subjects, urban setting, dramatic shadows.`,
  },
  {
    file: "coast-detail.jpg",
    aspect: "4:3",
    prompt: `Photograph of a pair of weathered running sneakers tied at a person's feet on wet sand at sunrise, with a Solids midnight navy jogger cuff visible. Soft golden light, ocean blurred in background. Cinematic 35mm film grain, warm pastel palette. Calm athletic mood. No text, no other elements.`,
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
    while (attempt < 2) {
      try {
        await generate(job);
        break;
      } catch (err) {
        attempt += 1;
        console.error(`[attempt ${attempt}] ${err.message}`);
        if (attempt >= 2) throw err;
        await new Promise((r) => setTimeout(r, 2000));
      }
    }
  }
  console.log("all done");
})();
