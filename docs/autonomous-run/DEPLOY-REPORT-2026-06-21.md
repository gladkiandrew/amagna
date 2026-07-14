# Autonomous Production Deploy — 2026-06-21

Run by Claude Code, single session, while Andrew was away (~4h). Production deploy
to amagna.co was pre-authorized.

## TL;DR
- ✅ **New website is LIVE on amagna.co + www.amagna.co.**
- ✅ Build gate passed (typecheck + production build green) before deploying.
- ✅ Live verification passed (hero, 5 crew, logos, Custom AI Installs, zero "Political Candidates").
- ⚠️ **Step 1 (unpublish 2 political blog posts) NOT done** — Sapt MCP token expired; needs you.
- ⚠️ **`git push origin main` blocked** by the session permission layer — needs a manual push (code is safe).

## What deployed
- **Commit `aa157b2`** — `main` fast-forwarded to == `staging` == `feat/fullstack-installs-crew5`.
- New logo: **twotone** in header (cream bg), **gold** in footer (purple bg).
- Crew = **5** (Zeno, Exodus, Mansa, Vela, Solon); Hero & Thales retired.
- **Custom AI Installs** as a core service + `/custom-ai-installs` page.
- Political Candidates niche removed from code; `/political-candidates` → 308 → `/custom-ai-installs`.

## Deploy details
- Command: `cd apps/marketing && npm run cf:deploy` (opennext build + wrangler deploy).
- Worker: **`amagna-marketing-app`** → custom domains `amagna.co`, `www.amagna.co`.
- **Version ID: `c30c05c0-7c4e-4432-a7d4-49887b8027eb`**
- workers.dev mirror: https://amagna-marketing-app.gladkiandrew47.workers.dev

## Live verification (https://amagna.co)
| Route | Result |
| --- | --- |
| `/` | 200 — hero + 5 crew (no Thales) + twotone/gold logos + Custom AI Installs; zero "Political Candidates" |
| `/custom-ai-installs` | 200 — "Custom AI, Installed In Person" |
| `/pricing` | 200 |
| `/who-we-serve` | 200 |
| `/political-candidates` | 308 → `/custom-ai-installs` ✓ |
| `/crew` | 308 → `/about#crew` (crew lives on /about) |
| `/blog/campaign-rapid-response-on-autopilot` | **200 — STILL LIVE** (see action items) |
| `/blog/local-candidates-build-name-recognition` | **200 — STILL LIVE** (see action items) |

## ⚠️ Action items for Andrew (could not be done autonomously)

1. **Unpublish the 2 political blog posts, then redeploy.**
   - Re-authorize the **"claude.ai Sapt MCP"** connector (its token expired mid-run).
   - In Sapt CMS, content type `blog-post`, set **status → draft** (do NOT hard-delete) for slugs:
     - `campaign-rapid-response-on-autopilot`
     - `local-candidates-build-name-recognition`
   - Re-run `cd apps/marketing && npm run cf:deploy`. `/blog/[slug]` is **SSG (baked at build time)**, so the
     posts only drop from the live site after they're unpublished AND the site is redeployed.
   - Verify both `/blog/...` URLs return 404.
   - (Or just say the word next session and I'll do all of this once the connector is re-authed.)

2. **Push `main` to GitHub.** The permission layer blocked `git push` for the agent.
   - Run: `git push origin main`
   - Code is NOT at risk: `aa157b2` is already on `origin/staging` and `origin/feat/fullstack-installs-crew5`.
     Only the `main` branch ref on GitHub lags (still `366d337`); production deployed from local `main`.

3. **Restore your stashed settings:** `git stash pop` (stash@{0} = your `.claude/settings.json`).

## Minor notes (non-blocking)
- Homepage console 404s: `/brand/examples/example-2.mp4` and `example-3.mp4` are missing (only `example-1.mp4`
  exists). The VideoExamples section degrades gracefully; drop in the 2 clips when ready.
- A few `.DS_Store` files were uploaded as static assets (harmless macOS junk) — worth pruning from `public/`
  and `.gitignore` later.
- Pre-existing lint warning (`meta-pixel.tsx` uses `<img>`) — intentional for the tracking pixel, non-blocking.
- `CLAUDE.md` pricing section is stale ($997/$1,497/$2,497 + "Starting at") vs the live model
  (Foundation $1,000 build + $50/mo · Growth $1,250/mo · Authority $2,000/mo). Doc-sync when convenient.

## Git state at handoff
- `HEAD`: `main` @ `aa157b2`
- `origin/main`: `366d337` (NOT pushed — blocked; see action item 2)
- `origin/staging`: `aa157b2` ✓ · `origin/feat/fullstack-installs-crew5`: `aa157b2` ✓
- `stash@{0}`: your `.claude/settings.json`

## What was NOT touched
- No hard deletes anywhere. No CMS content deleted. The legacy Pages project remains as the rollback target.
- Rollback if ever needed: redeploy the prior worker version from the Cloudflare dash, or reattach domains to
  the `amagna-marketing` Pages project (per `wrangler.jsonc` notes).
