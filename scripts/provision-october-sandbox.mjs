#!/usr/bin/env node
/**
 * Provision a Daytona sandbox for the Solids canvas dash_project so the
 * October canvas screens can render their iframes. Idempotent — reuses
 * the existing sandbox if dash_projects.daytona_sandbox_id is already set.
 *
 *   1. Look up dash_project for owner=ayush-kumar-prog, repo=zfellows-clone-for-october
 *   2. If daytona_sandbox_id already exists and the sandbox is alive, reuse it
 *   3. Otherwise create a new sandbox (Node 20 image)
 *   4. Inside: clone the repo, npm ci, npm run build, npm run start on port 3000
 *   5. Get the Daytona signed preview URL for port 3000
 *   6. Persist daytona_sandbox_id back to dash_projects
 */

import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { Daytona, Image } from "@daytonaio/sdk";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "..", ".env.local") });

const SUPA_URL = process.env.VITE_SUPA_PROJECT_URL;
const SUPA_KEY = process.env.VITE_SUPA_SERVICE_ROLE;
const DAYTONA_API_KEY = process.env.DAYTONA_API_KEY;

if (!SUPA_URL || !SUPA_KEY || !DAYTONA_API_KEY) {
  console.error("Missing VITE_SUPA_PROJECT_URL / VITE_SUPA_SERVICE_ROLE / DAYTONA_API_KEY");
  process.exit(1);
}

const REPO_OWNER = "ayush-kumar-prog";
const REPO_NAME = "zfellows-clone-for-october";
const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}.git`;
const REPO_DIR = "/home/daytona/repo";
const HARSH_USER_ID = "60dc01e1-b7f8-4e24-aa85-86115e4272ec";

const supabase = createClient(SUPA_URL, SUPA_KEY);
const daytona = new Daytona({ apiKey: DAYTONA_API_KEY });

const IMAGE = Image.base("node:20-slim").runCommands(
  "apt-get update && apt-get install -y git curl ca-certificates",
);

async function findOrCreateProject() {
  const { data: dp } = await supabase
    .from("dash_projects")
    .select("*")
    .eq("user_id", HARSH_USER_ID)
    .eq("github_owner", REPO_OWNER)
    .eq("github_repo", REPO_NAME)
    .maybeSingle();
  if (!dp) throw new Error("dash_project not found — run import-solids-canvas.mjs first");
  return dp;
}

async function getOrCreateSandbox(existingId) {
  if (existingId) {
    try {
      const sb = await daytona.get(existingId);
      console.log(`reuse sandbox ${sb.id} state=${sb.state}`);
      if (sb.state !== "started" && sb.state !== "running") {
        console.log("starting existing sandbox…");
        await sb.start(120);
      }
      return sb;
    } catch (err) {
      console.log(`existing sandbox unreachable (${err.message}); creating new`);
    }
  }
  console.log("creating new sandbox…");
  const sb = await daytona.create(
    {
      image: IMAGE,
      public: true,
      resources: { cpu: 2, memory: 4, disk: 8 },
      autoStopInterval: 240,
      labels: { project: "solids-paywall", repo: `${REPO_OWNER}/${REPO_NAME}` },
    },
    { timeout: 240 },
  );
  console.log(`sandbox created ${sb.id}`);
  return sb;
}

async function ensureRepo(sandbox) {
  const remoteCheck = await sandbox.process.executeCommand(
    `cd ${REPO_DIR} 2>/dev/null && git remote get-url origin 2>/dev/null || echo NONE`,
    undefined,
    undefined,
    8,
  );
  const cur = remoteCheck.result?.trim() || "NONE";
  if (!cur.includes(`${REPO_OWNER}/${REPO_NAME}`)) {
    console.log(`cloning ${REPO_URL} → ${REPO_DIR}`);
    await sandbox.process.executeCommand(`rm -rf ${REPO_DIR}`, undefined, undefined, 30);
    const clone = await sandbox.process.executeCommand(
      `git clone --depth 1 ${REPO_URL} ${REPO_DIR} 2>&1`,
      undefined,
      undefined,
      180,
    );
    if (clone.exitCode !== 0) throw new Error(`clone failed: ${clone.result?.slice(-500)}`);
  } else {
    console.log("pulling latest");
    await sandbox.process.executeCommand(
      `cd ${REPO_DIR} && git pull origin main 2>&1`,
      undefined,
      undefined,
      60,
    );
  }
  await sandbox.process.executeCommand(
    `git config --global --add safe.directory ${REPO_DIR}`,
    undefined,
    undefined,
    5,
  );
}

async function installAndStart(sandbox) {
  console.log("npm ci…");
  const install = await sandbox.process.executeCommand(
    `cd ${REPO_DIR} && (npm ci --no-audit --no-fund 2>&1 || npm install --no-audit --no-fund 2>&1)`,
    undefined,
    undefined,
    300,
  );
  console.log(`install exit=${install.exitCode} tail=${install.result?.slice(-200)}`);
  if (install.exitCode !== 0) throw new Error("install failed");

  console.log("starting dev server (background)…");
  // Use a session-style background to avoid cli timeout
  const start = await sandbox.process.executeCommand(
    `cd ${REPO_DIR} && nohup env PORT=3000 HOSTNAME=0.0.0.0 npx next dev -H 0.0.0.0 -p 3000 > /tmp/next.log 2>&1 & echo $!`,
    undefined,
    undefined,
    20,
  );
  const pid = start.result?.trim();
  console.log(`dev server pid=${pid}`);

  // Wait for port 3000 to start serving
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 4000));
    const probe = await sandbox.process.executeCommand(
      `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/ 2>/dev/null || echo 000`,
      undefined,
      undefined,
      8,
    );
    const code = probe.result?.trim();
    console.log(`probe ${i + 1}/30 code=${code}`);
    if (code && code !== "000" && code !== "") return;
  }
  const log = await sandbox.process.executeCommand(`tail -120 /tmp/next.log`, undefined, undefined, 8);
  throw new Error(`dev server didn't start. log:\n${log.result}`);
}

async function getSignedUrl(sandbox) {
  const signed = await sandbox.getSignedPreviewUrl(3000, 86400);
  const url = signed.url || signed.previewUrl;
  if (!url) throw new Error(`getSignedPreviewUrl returned ${JSON.stringify(signed)}`);
  return url;
}

async function persist(dashProjectId, sandboxId) {
  const { error } = await supabase
    .from("dash_projects")
    .update({ daytona_sandbox_id: sandboxId })
    .eq("id", dashProjectId);
  if (error) throw new Error(`persist: ${error.message}`);
  console.log(`persisted daytona_sandbox_id=${sandboxId}`);
}

async function main() {
  const dp = await findOrCreateProject();
  console.log(`dash_project ${dp.id}, existing sandbox=${dp.daytona_sandbox_id ?? "none"}`);
  const sandbox = await getOrCreateSandbox(dp.daytona_sandbox_id);
  await ensureRepo(sandbox);
  await installAndStart(sandbox);
  const url = await getSignedUrl(sandbox);
  await persist(dp.id, sandbox.id);
  console.log("\n=== SANDBOX READY ===");
  console.log(`sandbox_id     ${sandbox.id}`);
  console.log(`preview_url    ${url}`);
  console.log(`canvas_routes:`);
  console.log(`  ${url}`);
  console.log(`  ${url}/v/atelier`);
  console.log(`  ${url}/v/tokyo`);
  console.log(`  ${url}/v/coast`);
}

main().catch((err) => {
  console.error("FAIL", err);
  process.exit(1);
});
