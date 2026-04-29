#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("Set GEMINI_API_KEY env var (Google AI Studio key).");
  process.exit(1);
}
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${KEY}`;
const OUT = "public/thesolids/variants";

const FILE = process.argv[2];
const PROMPT = process.argv[3];
const ASPECT = process.argv[4] || "16:9";

if (!FILE || !PROMPT) {
  console.error("usage: regen-one.mjs <filename> <prompt> [aspect]");
  process.exit(1);
}

const body = {
  contents: [{ parts: [{ text: PROMPT }] }],
  generationConfig: { imageConfig: { aspectRatio: ASPECT } },
};

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});
if (!res.ok) {
  console.error("HTTP", res.status, await res.text());
  process.exit(2);
}
const data = await res.json();
const part = (data?.candidates?.[0]?.content?.parts ?? []).find(
  (p) => p.inlineData?.data,
);
if (!part) {
  console.error("no image in response", JSON.stringify(data).slice(0, 600));
  process.exit(3);
}
const buffer = Buffer.from(part.inlineData.data, "base64");
const dest = join(OUT, FILE);
writeFileSync(dest, buffer);
console.log(`ok ${FILE} ${buffer.length} bytes -> ${dest}`);
