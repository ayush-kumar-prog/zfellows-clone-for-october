#!/usr/bin/env node
/**
 * Import the Solids paywall variant canvas into October.
 *
 * Creates (or refreshes — idempotent on slug):
 *   1. dash_projects row pointing at the GitHub repo (so the canvas is
 *      tied to an editable codebase).
 *   2. canvases row owned by Harsh, public + share-tokened so he can
 *      open it editable and so the share link stays stable.
 *   3. Four canvas_screens (baseline + 3 variants) with iframe_url
 *      pointing at the live Vercel deployment.
 *   4. canvas_experiments row tying the three variant screens together
 *      with a hypothesis, status='active', 33/33/34 traffic split.
 *
 * Run with:
 *   VITE_SUPA_PROJECT_URL=... VITE_SUPA_SERVICE_ROLE=... \
 *   node scripts/import-october-canvas.mjs
 *
 * Or drop the same vars into a sibling .env.local file.
 *
 * Output (last run):
 *   canvas_id      382e88a2-1a5b-4e74-bf96-9defc25e66c0
 *   share_token    SPougXIaXUi3
 *   share_url      https://october.dev/shared/SPougXIaXUi3
 *   experiment     solids-paywall-variant-experiment (active, 33/33/34)
 */

import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "..", ".env.local") });

const SUPA_URL = process.env.VITE_SUPA_PROJECT_URL;
const SUPA_KEY = process.env.VITE_SUPA_SERVICE_ROLE;
if (!SUPA_URL || !SUPA_KEY) {
  console.error("Missing VITE_SUPA_PROJECT_URL or VITE_SUPA_SERVICE_ROLE in .env.local");
  process.exit(1);
}

const HARSH_USER_ID = "60dc01e1-b7f8-4e24-aa85-86115e4272ec";
const VERCEL_BASE = "https://zfellows-clone.vercel.app";
const REPO_URL = "https://github.com/ayush-kumar-prog/zfellows-clone-for-october.git";
const REPO_OWNER = "ayush-kumar-prog";
const REPO_NAME = "zfellows-clone-for-october";
const CANVAS_TITLE = "Solids — Paywall Variants";

const SCREENS = [
  {
    title: "Baseline · TheSolids.co clone",
    route_path: "/",
    iframe_url: `${VERCEL_BASE}/`,
    position: { x: 0, y: 0 },
  },
  {
    title: "Variant A · Atelier (quiet luxury)",
    route_path: "/v/atelier",
    iframe_url: `${VERCEL_BASE}/v/atelier`,
    position: { x: 1500, y: 0 },
  },
  {
    title: "Variant B · Tokyo (drop hype)",
    route_path: "/v/tokyo",
    iframe_url: `${VERCEL_BASE}/v/tokyo`,
    position: { x: 3000, y: 0 },
  },
  {
    title: "Variant C · Coast (dawn lifestyle)",
    route_path: "/v/coast",
    iframe_url: `${VERCEL_BASE}/v/coast`,
    position: { x: 4500, y: 0 },
  },
];

const SCREEN_W = 1280;
const SCREEN_H = 820;

function generateShareToken(len = 12) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < len; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

const supabase = createClient(SUPA_URL, SUPA_KEY);

async function upsertDashProject() {
  const { data: existing } = await supabase
    .from("dash_projects")
    .select("*")
    .eq("user_id", HARSH_USER_ID)
    .eq("github_owner", REPO_OWNER)
    .eq("github_repo", REPO_NAME)
    .maybeSingle();

  if (existing) {
    console.log(`✓ dash_project exists ${existing.id}`);
    return existing;
  }

  const insert = {
    id: randomUUID(),
    user_id: HARSH_USER_ID,
    github_repo_url: REPO_URL,
    github_owner: REPO_OWNER,
    github_repo: REPO_NAME,
    default_branch: "main",
    name: "thesolids-co-clone",
    framework: "Next.js",
    language: "TypeScript",
    description:
      "TheSolids.co storefront clone with three Nano-Banana-generated paywall landing variants (Atelier / Tokyo / Coast). Live at " +
      VERCEL_BASE,
    analysis_status: "complete",
  };

  const { data, error } = await supabase
    .from("dash_projects")
    .insert(insert)
    .select()
    .single();
  if (error) throw new Error(`dash_projects insert: ${error.message}`);
  console.log(`+ dash_project ${data.id}`);
  return data;
}

async function upsertCanvas(dashProjectId) {
  const { data: existing } = await supabase
    .from("canvases")
    .select("*")
    .eq("user_id", HARSH_USER_ID)
    .eq("title", CANVAS_TITLE)
    .maybeSingle();

  if (existing) {
    const updates = {
      dash_project_id: dashProjectId,
      is_public: true,
      share_token: existing.share_token || generateShareToken(),
      share_settings: { allowComments: true, allowDuplication: true },
      render_settings: {
        mode: "desktop-web",
        viewport: { width: 1280, height: 820 },
      },
    };
    const { data, error } = await supabase
      .from("canvases")
      .update(updates)
      .eq("id", existing.id)
      .select()
      .single();
    if (error) throw new Error(`canvases update: ${error.message}`);
    console.log(`✓ canvas refreshed ${data.id} share=${data.share_token}`);
    return data;
  }

  const insert = {
    id: randomUUID(),
    user_id: HARSH_USER_ID,
    title: CANVAS_TITLE,
    description:
      "Three radically different landing pages for the same Solids customer (premium essentials, 18-30) — Atelier (quiet luxury), Tokyo (drop hype), Coast (dawn lifestyle). Hero imagery generated with Nano Banana Pro.",
    is_default: false,
    zoom: 0.4,
    center_x: 2300,
    center_y: 410,
    render_settings: {
      mode: "desktop-web",
      viewport: { width: 1280, height: 820 },
    },
    dash_project_id: dashProjectId,
    is_public: true,
    share_token: generateShareToken(),
    share_settings: { allowComments: true, allowDuplication: true },
  };

  const { data, error } = await supabase
    .from("canvases")
    .insert(insert)
    .select()
    .single();
  if (error) throw new Error(`canvases insert: ${error.message}`);
  console.log(`+ canvas ${data.id} share=${data.share_token}`);
  return data;
}

async function upsertScreen(canvasId, dashProjectId, screen) {
  const { data: existing } = await supabase
    .from("canvas_screens")
    .select("*")
    .eq("canvas_id", canvasId)
    .eq("route_path", screen.route_path)
    .maybeSingle();

  const payload = {
    canvas_id: canvasId,
    dash_project_id: dashProjectId,
    title: screen.title,
    code: "// Live deployment — edit at " + REPO_URL,
    position_x: screen.position.x,
    position_y: screen.position.y,
    width: SCREEN_W,
    height: SCREEN_H,
    mode: "desktop-web",
    source: "imported",
    iframe_url: screen.iframe_url,
    route_path: screen.route_path,
  };

  if (existing) {
    const { data, error } = await supabase
      .from("canvas_screens")
      .update(payload)
      .eq("id", existing.id)
      .select()
      .single();
    if (error) throw new Error(`canvas_screens update: ${error.message}`);
    console.log(`✓ screen refreshed ${data.id} ${data.route_path}`);
    return data;
  }

  const { data, error } = await supabase
    .from("canvas_screens")
    .insert({ id: randomUUID(), ...payload })
    .select()
    .single();
  if (error) throw new Error(`canvas_screens insert: ${error.message}`);
  console.log(`+ screen ${data.id} ${data.route_path}`);
  return data;
}

async function upsertExperiment(canvasId, variantScreenIds) {
  const name = "Solids paywall — atelier vs tokyo vs coast";
  const { data: existing } = await supabase
    .from("canvas_experiments")
    .select("*")
    .eq("canvas_id", canvasId)
    .eq("name", name)
    .maybeSingle();

  const payload = {
    canvas_id: canvasId,
    name,
    hypothesis:
      "TheSolids.co customer is one buyer (premium essentials, 18-30) but shows up in three rooms: quiet-luxury, streetwear-drop, and coastal-lifestyle. We expect Tokyo (drop hype) to win on raw conversion in mobile sessions and Coast (dawn lifestyle) to win on AOV in tablet/desktop, while Atelier holds the highest-ARPU email signups. Routing 33/33/34 across the three variants on first-touch.",
    status: "active",
    variant_screen_ids: variantScreenIds,
    variant_allocations: { A: 33, B: 33, C: 34 },
    posthog_flag_key: "solids-paywall-variant-experiment",
    position_x: 100,
    position_y: 950,
    width: 360,
    height: 220,
  };

  if (existing) {
    const { data, error } = await supabase
      .from("canvas_experiments")
      .update(payload)
      .eq("id", existing.id)
      .select()
      .single();
    if (error) throw new Error(`canvas_experiments update: ${error.message}`);
    console.log(`✓ experiment refreshed ${data.id}`);
    return data;
  }

  const { data, error } = await supabase
    .from("canvas_experiments")
    .insert({ id: randomUUID(), ...payload })
    .select()
    .single();
  if (error) throw new Error(`canvas_experiments insert: ${error.message}`);
  console.log(`+ experiment ${data.id}`);
  return data;
}

async function main() {
  console.log("Importing Solids canvas into October...");
  const dashProject = await upsertDashProject();
  const canvas = await upsertCanvas(dashProject.id);

  const screens = [];
  for (const screen of SCREENS) {
    screens.push(await upsertScreen(canvas.id, dashProject.id, screen));
  }

  const variantIds = screens.slice(1).map((s) => s.id);
  await upsertExperiment(canvas.id, variantIds);

  const shareUrl = `https://october.dev/shared/${canvas.share_token}`;
  console.log("\n=== DONE ===");
  console.log(`canvas_id      ${canvas.id}`);
  console.log(`share_token    ${canvas.share_token}`);
  console.log(`share_url      ${shareUrl}`);
  console.log(`dash_project   ${dashProject.id}`);
  console.log(`github         ${REPO_URL}`);
  console.log(`screens        ${screens.length}`);
  console.log(`vercel         ${VERCEL_BASE}`);
}

main().catch((err) => {
  console.error("FAIL:", err);
  process.exit(1);
});
