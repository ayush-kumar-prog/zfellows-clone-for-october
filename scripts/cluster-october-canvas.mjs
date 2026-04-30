#!/usr/bin/env node
/**
 * Cluster the 18 zfellows-clone-for-october canvas screens by surface
 * group so related screens sit close together and surface clusters are
 * visibly separated. Paywall variants get their own tight row.
 *
 *   Row 1 (y=0):     Marketing(1×2)   |  Paywall variants(1×4)
 *   Row 2 (y=1140):  Catalog(2×2)     |  Account(2×2)
 *   Row 3 (y=2860):  Product(1×1)     |  Legal(1×3)
 *
 * Tight intra-cluster gap = 40px, inter-cluster gap = 600px.
 *
 * Idempotent: looks screens up by exact title, updates position_x/y only.
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Saturday holds the canonical .env.local for the Supabase project.
dotenv.config({ path: path.resolve(__dirname, "..", "..", "saturday", ".env.local") });
dotenv.config({ path: path.resolve(__dirname, "..", ".env.local") });

const SUPA_URL = process.env.VITE_SUPA_PROJECT_URL;
const SUPA_KEY = process.env.VITE_SUPA_SERVICE_ROLE;
if (!SUPA_URL || !SUPA_KEY) {
  console.error("Missing VITE_SUPA_PROJECT_URL or VITE_SUPA_SERVICE_ROLE");
  process.exit(1);
}

const CANVAS_ID = "5e4d5e2f-7693-4526-b5b6-20ba86bcbae9";

// Screen 960×540, intra gap 40 → step 1000. Row gap when 540 tall = 580 step.
const W = 960;
const H = 540;
const G = 40;       // intra-cluster gap
const STEP_X = W + G;   // 1000
const STEP_Y = H + G;   // 580

// Cluster columns: col0 width = max cluster width in col 0 = 1960; col1 = 3960.
const COL0_X = 0;
const COL1_X = 1960 + 600; // 2560

// Cluster rows by y baseline (top edge).
const ROW0_Y = 0;
const ROW1_Y = 540 + 600;  // 1140
const ROW2_Y = ROW1_Y + (2 * H + G) + 600; // 1140 + 1120 + 600 = 2860

// Centering offsets within a column.
const COL1_W = 3960; // for paywall row
const ACCOUNT_OFFSET_IN_COL1 = (COL1_W - (2 * W + G)) / 2; // (3960-1960)/2 = 1000
const PRODUCT_OFFSET_IN_COL0 = (1960 - W) / 2; // (1960-960)/2 = 500
const LEGAL_OFFSET_IN_COL1 = (COL1_W - (3 * W + 2 * G)) / 2; // (3960-2960)/2 = 500

// Authoritative layout: title -> {x, y}. Titles must match canvas_screens.title exactly.
const LAYOUT = {
  // Marketing (col0, row0): Home, Brand Story
  "Home":                       { x: COL0_X + 0 * STEP_X, y: ROW0_Y },
  "Brand Story":                { x: COL0_X + 1 * STEP_X, y: ROW0_Y },

  // Paywall Variants (col1, row0): Variants Index + Atelier + Tokyo + Coast
  "Variants Index":             { x: COL1_X + 0 * STEP_X, y: ROW0_Y },
  "Paywall Variant — Atelier":  { x: COL1_X + 1 * STEP_X, y: ROW0_Y },
  "Paywall Variant — Tokyo":    { x: COL1_X + 2 * STEP_X, y: ROW0_Y },
  "Paywall Variant — Coast":    { x: COL1_X + 3 * STEP_X, y: ROW0_Y },

  // Catalog (col0, row1): 2×2 — Collections Index, All Collections / Collection (dynamic), Search
  "Collections Index":          { x: COL0_X + 0 * STEP_X, y: ROW1_Y },
  "All Collections":            { x: COL0_X + 1 * STEP_X, y: ROW1_Y },
  "Collection (dynamic)":       { x: COL0_X + 0 * STEP_X, y: ROW1_Y + STEP_Y },
  "Search":                     { x: COL0_X + 1 * STEP_X, y: ROW1_Y + STEP_Y },

  // Account (col1, row1): 2×2 — Cart, Login / Register, Contact Us
  "Cart":                       { x: COL1_X + ACCOUNT_OFFSET_IN_COL1 + 0 * STEP_X, y: ROW1_Y },
  "Login":                      { x: COL1_X + ACCOUNT_OFFSET_IN_COL1 + 1 * STEP_X, y: ROW1_Y },
  "Register":                   { x: COL1_X + ACCOUNT_OFFSET_IN_COL1 + 0 * STEP_X, y: ROW1_Y + STEP_Y },
  "Contact Us":                 { x: COL1_X + ACCOUNT_OFFSET_IN_COL1 + 1 * STEP_X, y: ROW1_Y + STEP_Y },

  // Product (col0, row2)
  "Product Detail (dynamic)":   { x: COL0_X + PRODUCT_OFFSET_IN_COL0, y: ROW2_Y },

  // Legal (col1, row2): Privacy Policy, Terms of Service, Refund Policy
  "Privacy Policy":             { x: COL1_X + LEGAL_OFFSET_IN_COL1 + 0 * STEP_X, y: ROW2_Y },
  "Terms of Service":           { x: COL1_X + LEGAL_OFFSET_IN_COL1 + 1 * STEP_X, y: ROW2_Y },
  "Refund Policy":              { x: COL1_X + LEGAL_OFFSET_IN_COL1 + 2 * STEP_X, y: ROW2_Y },
};

const supabase = createClient(SUPA_URL, SUPA_KEY);

async function main() {
  const { data: screens, error } = await supabase
    .from("canvas_screens")
    .select("id, title, position_x, position_y")
    .eq("canvas_id", CANVAS_ID);
  if (error) throw new Error(`fetch screens: ${error.message}`);

  const byTitle = new Map(screens.map((s) => [s.title, s]));
  let updates = 0;
  let skipped = 0;
  let unmatched = [];

  for (const [title, pos] of Object.entries(LAYOUT)) {
    const row = byTitle.get(title);
    if (!row) {
      unmatched.push(title);
      continue;
    }
    if (row.position_x === pos.x && row.position_y === pos.y) {
      console.log(`= ${title.padEnd(30)} (${pos.x}, ${pos.y})`);
      skipped++;
      continue;
    }
    const { error: upErr } = await supabase
      .from("canvas_screens")
      .update({ position_x: pos.x, position_y: pos.y })
      .eq("id", row.id);
    if (upErr) throw new Error(`update ${title}: ${upErr.message}`);
    console.log(`✓ ${title.padEnd(30)} → (${pos.x}, ${pos.y})`);
    updates++;
  }

  // Recenter the canvas on the Paywall row.
  const paywallCenterX = COL1_X + (1.5 * STEP_X) + W / 2; // ~ 4540
  const paywallCenterY = ROW0_Y + H / 2; // 270
  const layoutHeight = ROW2_Y + H; // 3400
  const layoutCenterY = layoutHeight / 2;
  const layoutCenterX = (COL1_X + COL1_W) / 2; // ~ 3260

  const { error: cvErr } = await supabase
    .from("canvases")
    .update({
      zoom: 0.32,
      center_x: layoutCenterX,
      center_y: layoutCenterY,
    })
    .eq("id", CANVAS_ID);
  if (cvErr) throw new Error(`canvas zoom/center: ${cvErr.message}`);

  console.log("");
  console.log(`canvas      ${CANVAS_ID}`);
  console.log(`updates     ${updates}`);
  console.log(`skipped     ${skipped} (already in place)`);
  console.log(`paywall row at (${COL1_X}, ${ROW0_Y}) → 4 nodes wide ${4 * W + 3 * G}px`);
  console.log(`zoom 0.32 center (${Math.round(layoutCenterX)}, ${Math.round(layoutCenterY)})`);
  if (unmatched.length) {
    console.log(`!! unmatched titles in DB:`, unmatched);
  }

  // Sanity: list any canvas screens that we did NOT cluster (so we know
  // there are no orphan screens floating somewhere unexpected).
  const planned = new Set(Object.keys(LAYOUT));
  const orphans = screens.filter((s) => !planned.has(s.title));
  if (orphans.length) {
    console.log("\norphans (not in cluster layout):");
    for (const o of orphans) console.log(`  ${o.title} @ (${o.position_x}, ${o.position_y})`);
  }
}

main().catch((err) => {
  console.error("FAIL:", err);
  process.exit(1);
});
