# Autonomous Run 6 — Blog system + pre-traffic readiness

Branch: `auto/2026-06-04-website-build`. Started 2026-06-06. Following `PLAN-6.md`.
amagna.co is LIVE on the Worker — every deploy is production; verified after each.

## Discovery (Phase 0)

- Working tree clean at start; last deploy = Version `3f496ad6` (run 5).
- **Sapt REST API confirmed** (docs.sapt.ai OpenAPI): base `https://api.sapt.ai`,
  auth header `Authorization: ApiKey sapt_…`, list endpoint
  `GET /projects/{projectId}/cms/content/{contentTypeSlug}?status=published`,
  single `GET /projects/{projectId}/cms/content/{contentTypeSlug}/{slug}`.
  Response `{ items: [{ id, slug, name, content:{…}, status, publishedAt, tags, … }], total }`.
  → endpoint needs **projectId** too (plan only named API_URL+API_KEY). Adapter
  reads `SAPT_API_KEY`, `SAPT_PROJECT_ID`, `SAPT_API_URL` (defaults to api.sapt.ai).
- Sapt MCP connector token EXPIRED this session → could not pull the live post
  text. Fallback posts authored in Amagna voice on the two given topics; Sapt is
  the source of truth once keyed (fallback is only shown when unkeyed/erroring).
- Pre-existing infra found: Meta Pixel base code + PageView already implemented
  (`components/meta-pixel.tsx`, gated on `NEXT_PUBLIC_META_PIXEL_ID`);
  `trackSubscribe` wired on checkout success; Organization+WebSite JSON-LD in
  root layout (no logo/sameAs yet). `trackLead` defined but NOT wired. No GSC slot.
- No markdown lib → writing a minimal safe renderer (no new deps).
- Nav label decision: **"Field Notes"** (URL `/blog`) — fits the nautical/operator
  brand and the build-in-public content theme; URL stays `/blog` for SEO clarity.

## Priority 1 — Blog ✅ LIVE (Version f284b8f3)

- `lib/blog-types.ts`, `lib/blog-fallback.ts` (2 posts), `lib/markdown.ts` (safe
  escape-first renderer, no deps), `lib/sapt-blog.ts` (Sapt client + fallback).
- `/blog` index (cards) + `/blog/[slug]` (rendered markdown, author, date, hero,
  per-post SEO metadata, BlogPosting JSON-LD). Server-rendered, ISR revalidate 1h.
- Nav + footer: "Field Notes" → /blog. Sitemap now async, includes /blog + posts.
- wrangler.jsonc: SAPT_API_URL (default api.sapt.ai) + SAPT_PROJECT_ID vars added.

| Check | Result |
|-------|--------|
| /blog 200 | ✅ |
| both posts 200 | ✅ |
| markdown renders | ✅ `<h2>The four parts</h2>`, bold, ordered lists, links |
| Article JSON-LD | ✅ BlogPosting present on posts |
| sitemap includes /blog + posts | ✅ |
| nav/footer "Field Notes" | ✅ |
| mobile (DPR 3) | ✅ index + post clean, single-column cards, readable prose |
| fallback when unkeyed | ✅ build + runtime both serve fallback (SAPT keys unset at build to match runtime) |

## Priority 2 — Draft→approve automation ✅ (scaffold, human-in-loop)

- `apps/marketing/scripts/generate-blog-draft.mjs`: Anthropic (claude-opus-4-7,
  forced `submit_post` tool) writes a full post in Amagna voice targeting a
  keyword, then files it as a **draft** (status=draft / publishStatus=pending).
  **Never auto-publishes.** Verified with ONE `--dry-run`: 853-word on-brand
  home-services post, /audit CTA present, no fabricated metrics, clean headings.
- Sapt write: public REST OpenAPI exposes **only reads**; the create endpoint is
  tRPC/connector-only and unconfirmable without the key. The write uses the
  most-likely REST shape (`POST /projects/{id}/cms/content/blog-post`) GUARDED —
  on any non-2xx it saves the draft to `drafts/` locally and logs, so a run never
  fails. Andrew confirms the endpoint OR just approves the generated drafts.
- Schedule: `.github/workflows/blog-draft.yml` — weekly (Mon 14:00 UTC) +
  manual dispatch. Inert until Andrew adds repo secrets (ANTHROPIC_API_KEY,
  SAPT_API_KEY, SAPT_PROJECT_ID) and merges to the default branch.

## Priority 3 — Pre-traffic readiness ✅ LIVE (Version 0d6907df)

- **Meta Pixel:** base code + PageView already existed (gated on
  `NEXT_PUBLIC_META_PIXEL_ID`). Wired the events: `Lead` on Gold Map intake
  capture (niche + business name); `Contact` on /book (book-a-call intent, via a
  client tracker decoupled from the frozen Cal.com code); `Subscribe` already on
  checkout success. All no-op until the pixel ID is set.
- **Homepage SEO:** `<title>` now "Amagna AI — Autonomous Marketing Systems";
  description + OG broadened to the AMS positioning (HS + RE as lead niches, not
  exclusive). OG image alt broadened. Verified live.
- **Google Search Console:** `NEXT_PUBLIC_GSC_VERIFICATION` slot in the root
  layout (renders the verification meta only when set; var added to wrangler.jsonc).
  robots.txt + sitemap correct; sitemap now includes /blog + posts.
- **JSON-LD:** Organization now has `logo` + env-driven `sameAs` (SOCIAL_LINKS,
  empty until Andrew adds handles) + broader `knowsAbout`; BlogPosting on posts.

## Priority 4 — Quality ✅

- Mobile (DPR 3): blog index + post verified clean; desktop header verified — the
  new 5th nav link ("Field Notes") fits with the CTA, no wrap/overflow.
- Accessibility (blog post): single `<h1>`, semantic `<article>`, ordered
  headings (h1→h2→h3), `lang="en"`, decorative hero `alt=""`.
- Build green on every commit; money path re-verified live (cs_test); all core
  routes 200. cutover-status.md version updated.

## Commits (this run)

1. `e9ba293` Add Sapt-backed blog with local fallback
2. `f72104b` Wire the blog into nav, footer, sitemap, and Worker config
3. `29cff49` Add AI blog-draft generator + weekly schedule (human-in-loop)
4. `a66475e` Wire Meta Pixel Lead + book-intent events
5. `b54ee6d` Broaden homepage SEO + add GSC slot + enrich Organization JSON-LD
6. (this commit) cutover-status version + Update autonomous run 6 report

Deploys: f284b8f3 (blog) → 0d6907df (SEO/pixel, current LIVE).

## What's live vs. built-but-needs-Andrew

- **LIVE now:** /blog + 2 posts (fallback content), nav/footer/sitemap, broadened
  SEO title + JSON-LD, GSC slot (inert), pixel events (inert until ID set).
- **Built, waiting on Andrew's keys/dashboard:** live Sapt blog content, the
  weekly draft cron, the Meta Pixel firing, GSC verification, social `sameAs`.

## Andrew action items

1. **Make the blog read live Sapt — BLOCKED on key scope (needs a CMS-capable key).**
   Update follow-up (2026-06-06): reused the existing `.env.local` `SAPT_API_KEY` +
   `SAPT_PROJECT_ID` (no rotation) and set them as Worker **secrets**; the adapter
   already reads those exact names and hardcodes the REST base (no SAPT_API_URL).
   **Verified the key/project are valid** — `SAPT_PROJECT_ID` = the Amagna AI
   project UUID, `/projects` list + `/cms/config` both return 200 with this key
   (ApiKey scheme). **But every `/cms/content/*` request returns 400 `Invalid
   project resource: memory`** — across all content types AND all 3 projects. This
   key is **memory-scoped** (created for the phase-1.5 audit-widget memory layer)
   and has no CMS-content read permission. So `/blog` keeps serving the local
   fallback (graceful — verified 200, page never breaks).
   - **What's needed:** a Sapt API key with **CMS content read** scope (grant CMS
     access to the existing key in the Sapt dashboard, or issue a CMS-scoped key).
     Put it in `.env.local` under `SAPT_API_KEY` and run
     `cd apps/marketing && printf '%s' "$SAPT_API_KEY" | npx wrangler secret put SAPT_API_KEY`
     (after `set -a; . ./.env.local; set +a`). No code/var changes needed — the
     blog flips to live Sapt automatically (and revalidates hourly). For an
     immediate switch, rebuild+deploy so the static prerender pulls from Sapt.
   - Then reconcile/replace the two fallback posts — live Sapt becomes the source
     of truth automatically.
2. **Meta Pixel:** set `NEXT_PUBLIC_META_PIXEL_ID` (wrangler.jsonc var + .env.local),
   redeploy. PageView + Lead + Contact + Subscribe then fire.
3. **Google Search Console:** verify the property — paste the token into
   `NEXT_PUBLIC_GSC_VERIFICATION` (wrangler var), redeploy, confirm in GSC, then
   submit `https://amagna.co/sitemap.xml`.
4. **Blog draft automation:** add repo secrets `ANTHROPIC_API_KEY`, `SAPT_API_KEY`,
   `SAPT_PROJECT_ID` and merge `.github/workflows/blog-draft.yml` to the default
   branch to activate the weekly cron (or run it manually from the Actions tab).
   Confirm the Sapt create endpoint shape — the generator uses the most-likely REST
   shape and falls back to a local `drafts/` file if it differs. Approve drafts in
   Sapt (publishStatus → published, set publishedAt). **Nothing auto-publishes.**
5. **Social `sameAs`:** paste the agency social profile URLs into `SOCIAL_LINKS`
   (`lib/site.ts`) so they enter the Organization JSON-LD.
6. **(carryover) Gold Map E2E** — still your one manual run (Turnstile + human AI step).
## Priority 4 — Quality

## Andrew action items
