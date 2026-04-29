# October canvas

This repo is connected to an October canvas that pins the live Vercel
deployment as four imported screens (baseline + 3 paywall variants).

## Live surfaces

| Surface | URL |
| --- | --- |
| Baseline (TheSolids.co clone) | https://zfellows-clone.vercel.app/ |
| Variant A — Atelier (quiet luxury) | https://zfellows-clone.vercel.app/v/atelier |
| Variant B — Tokyo (drop hype) | https://zfellows-clone.vercel.app/v/tokyo |
| Variant C — Coast (dawn lifestyle) | https://zfellows-clone.vercel.app/v/coast |
| Variant index | https://zfellows-clone.vercel.app/variants |

## October canvas record

The canvas + four `canvas_screens` + a `canvas_experiments` row are
seeded by `scripts/import-october-canvas.mjs`. The script is idempotent
— rerunning refreshes positions / iframe URLs without duplicating rows.

Last run produced:

```
canvas_id      382e88a2-1a5b-4e74-bf96-9defc25e66c0
share_token    SPougXIaXUi3
share_url      https://october.dev/shared/SPougXIaXUi3
dash_project   e013b272-264d-4d71-bd87-de5ece21ab55
github         https://github.com/ayush-kumar-prog/zfellows-clone-for-october.git
experiment     solids-paywall-variant-experiment (active, 33/33/34)
```

The canvas is `is_public = true` with `share_settings.allowDuplication
= true`, so anyone with the share link can open it read-only and clone
their own editable copy.

## Refreshing the canvas

After redeploying the variants on Vercel, rerun:

```
VITE_SUPA_PROJECT_URL=https://latwxiqjgvluiddckvmj.supabase.co \
VITE_SUPA_SERVICE_ROLE=$(cat ~/.october-service-role) \
node scripts/import-october-canvas.mjs
```

The script keys off canvas title and screen `route_path`, so screens
keep stable IDs across reruns.

## Generating new variant imagery

Each `/v/*` page uses Nano Banana Pro (gemini-3-pro-image-preview) for
its hero + detail photographs. Regenerate any of them with:

```
GEMINI_API_KEY=... node scripts/generate-variants.mjs
GEMINI_API_KEY=... node scripts/regen-one.mjs <file> "<prompt>" 16:9
```

Output lands in `public/thesolids/variants/`.
