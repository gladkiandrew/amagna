# /grow Funnel — Session Handoff (2026-07-07)

State-of-play for Cursor/Claude Code. Read this + `grow-build-brief.md` + `second-brain-artifact-brief.md` before touching `/grow`.

## Current state

- Branch: `feat/audit-hardening-local-seo` — 17 commits ahead of `main`, with UNCOMMITTED changes in the working tree (do not discard):
  - `apps/marketing/src/app/grow/page.tsx` — final funnel rewiring (Second Brain section replacing agents grid)
  - `apps/marketing/src/lib/blog-types.ts`, `src/lib/sapt-blog.ts`, `src/app/blog/*`, `src/components/blog/` — hero-video support for blog posts (Hyperframes)
  - New untracked assets: `public/brand/amagna-teaser.mp4`, `public/brand/second-brain-artifact.webp` (+ png, core variants)
- `/grow` is NOT deployed — production amagna.co/grow is empty. Everything lives on this branch only.
- Page structure (top to bottom): teaser hero (autoplay loop) → VSL section → "what we build" cards → Second Brain artifact → Michigan close. Single sticky Book-a-Call bar (`sticky-cta.tsx` → CALCOM_DIRECT_URL). Global chrome suppressed.

## The gaps

1. **VSL slot is empty**: `VSL_VIDEO = ''` and `VSL_POSTER = ''` in `grow/page.tsx`. Player renders "VSL coming" fallback. Script to film from: `docs/funnel/vsl-script.md`. Candidate raw footage already in repo root (untracked): `Founder_video.mov`, `The one.mov`, `WHo are We Video.mov`, `Vids for Amagna/`. When a final cut exists: export H.264 mp4 ≤ ~20 MB, drop in `public/brand/`, set both constants.
2. **Second Brain is a static webp** — `second-brain-artifact-brief.md` specs the live animated component (gold pulses brain→agents, real text, mobile-stacked). Static image stays as fallback/visual target.
3. **Not committed / not deployed.** Ship path: commit working tree → `npm run build` green (44+ routes) → merge to `staging` → verify → `main` → `npm run cf:deploy`. Also outstanding: `git push origin main` lags from the 6/21 deploy; 2 political blog posts still published in Sapt (unpublish + redeploy).

## Guardrails (from CLAUDE.md — enforce)

- No commits to `main` directly; build must be green before completing any task.
- Brand: gold + deep navy, no blue; never fabricate testimonials.
- Mobile-first check on /grow — funnel traffic will be overwhelmingly mobile (Meta/TikTok ads).

## Context running in parallel

- Exodus (Cowork scheduled task `exodus-content-agent`) now generates a daily branded asset via Higgsfield → Buffer DRAFTS (IG/FB, video Wednesdays). Andrew approves in Buffer. Don't duplicate this in code.
- Higgsfield balance ~1,200 credits (Plus). Buffer free plan: max 10 scheduled posts.
