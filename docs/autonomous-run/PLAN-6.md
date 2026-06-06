# Autonomous Run Plan 6 — Blog system + pre-traffic readiness

> Andrew is away. amagna.co is LIVE on the Worker (cutover complete) — every
> deploy this run goes to PRODUCTION. Never leave the live site broken: verify
> after every deploy before continuing. Work priorities IN ORDER, no questions,
> log in `docs/autonomous-run/REPORT-6.md` as you go.

## Guardrails (same as prior runs)

Never push to git remote without it being the existing branch's normal flow —
actually: do NOT `git push` (Andrew pushes). Stay on
`auto/2026-06-04-website-build`. Stripe/checkout/book CODE frozen. Zero new
npm dependencies. Never read `.env*` except the established sourced-deploy
pattern (`set -a; . ./.env.local; set +a`), never echo secret values. Build
green before every commit. 15-min rule; circuit breaker at 3 consecutive
fails. Never commit `Pics for Amagna/`, `.DS_Store`, `.agents/`, `.claude/*`,
`.env*`, `skills-lock.json`. No fabricated testimonials/metrics. No
exclusivity language.

## Context you need

- Sapt now has a **`blog-post`** content type (created via the Sapt connector)
  and **two published posts**: `what-is-an-autonomous-marketing-system` and
  `more-booked-jobs-without-chasing-leads`. Fields: title, slug, excerpt, body
  (markdown), publishStatus (only `published` shows publicly), publishedAt,
  author, heroImage, seoTitle, seoDescription, targetKeywords, category. Tags
  available on items.
- The website reads Sapt over Sapt's API and needs `SAPT_API_URL` +
  `SAPT_API_KEY` in the Worker env — **Andrew does not have these set yet.**
  Design for that reality (graceful fallback, see Priority 1).

## Phase 0 — Checkpoint

Commit any WIP, build green baseline.

---

## Priority 1 — Blog section on the site (Sapt-backed, fallback-safe)

1. **Sapt client adapter** (`src/lib/sapt-blog.ts` or similar): a typed
   read-only client that fetches `published` blog-post items from the Sapt
   API using `process.env.SAPT_API_URL` / `SAPT_API_KEY` via the existing env
   helper. First **investigate the real Sapt API** (check `docs.sapt.ai` /
   any existing `.mcp.json` Sapt config in the repo for the endpoint shape).
   If the auth/endpoint can't be confirmed, build the adapter against the
   known schema with a clearly-marked TODO for the exact endpoint, and make
   it fail gracefully (return fallback, never crash the page).
2. **Local fallback so the blog is VISIBLE THIS RUN even without the key:**
   ship the two existing posts as a local typed fallback (a small
   `blog-fallback.ts` with the same two posts' frontmatter + markdown — text
   is in Sapt; reproduce it). The blog reads Sapt when keyed, else falls back
   to these two so `/blog` is populated and demonstrable immediately. Mark
   clearly that Sapt is the source of truth once keyed.
3. **Pages:** `/blog` (index — cards: title, excerpt, category, date, hero)
   and `/blog/[slug]` (full post: rendered markdown, author, date, hero,
   per-post SEO metadata from seoTitle/seoDescription, JSON-LD Article
   schema). Server-rendered for SEO. Voyage brand, mobile-clean (you know the
   iPhone pitfalls from run 5 — verify at DPR 3).
4. **Wire it in:** add "Blog" (or "Field Notes" — pick what fits the brand,
   log it) to the nav and footer, add `/blog` + each post to `sitemap.ts`.
5. Markdown rendering with NO new dependency — if none is available, write a
   minimal safe markdown-to-HTML renderer for the subset used (headings,
   bold, lists, paragraphs, links). Sanitize.
6. Commit per concern; deploy to amagna.co; verify `/blog` and both posts 200
   and render.

## Priority 2 — AI draft → approve automation (scaffold)

1. Build the **draft generator**: a server action / script that uses the
   existing Anthropic pattern to write a new blog post (targeting a keyword)
   in Amagna voice, then writes it to Sapt as `publishStatus: pending` via
   the Sapt API. Reuse the brand voice/guidelines now stored in Sapt.
2. Schedule it (Cloudflare Cron in `wrangler.jsonc`, or document the
   scheduled-task approach) at a sane cadence (e.g. weekly). **Never
   auto-publish** — drafts land as `pending`; Andrew approves in the Sapt
   dashboard (flip to `published`, set publishedAt). Honor the human-in-loop
   rule.
3. If the Sapt write API can't be confirmed without the key, build the
   generator + schedule but leave the final Sapt-write call behind the same
   env guard, documented. Do NOT burn Anthropic tokens testing in a loop —
   one dry-run at most.
4. Commit; document clearly in the report how it works and what Andrew flips
   on.

## Priority 3 — Pre-traffic readiness

1. **Meta Pixel:** add the pixel base code gated on
   `NEXT_PUBLIC_META_PIXEL_ID` (already a known-empty var). When the ID is
   set it fires; when empty it no-ops. Fire standard PageView; add a
   `Lead`/`Schedule`-type event on Gold Map submit + Book-a-call click if
   trivial and non-invasive to the frozen booking code (event fire only, no
   checkout/book logic changes). Tell Andrew exactly where to paste the ID.
2. **Homepage SEO title:** the `/` `<title>` + meta description still read
   "home services and real estate" — broaden to the Autonomous Marketing
   Systems positioning (serves any operator; HS + RE as lead niches). Keep
   niche keywords present but not exclusive.
3. **Google Search Console readiness:** add an env-driven verification meta
   tag slot (`NEXT_PUBLIC_GSC_VERIFICATION`) in the root layout so Andrew can
   verify by pasting his token; confirm `robots.txt` + `sitemap.xml` are
   correct on the live domain and include `/blog` + posts. (Andrew does the
   actual GSC signup + sitemap submit — document the steps.)
4. **JSON-LD:** Organization schema on the homepage (name, logo, url,
   sameAs socials) and Article schema on posts (done in P1). Helps SEO + AEO.
5. Commit per concern; deploy; verify live.

## Priority 4 — Quality + report

Mobile sweep on everything new (DPR 3). Accessibility on blog (semantic
article, headings order, alt text). Build green. Update
`docs/cutover-status.md` if deploy state changed.

REPORT-6.md (live): commits; what's live vs. built-but-needs-Andrew; and a
crisp **"Andrew action items"** list — at minimum: (a) set `SAPT_API_URL` +
`SAPT_API_KEY` to make the blog read live Sapt, (b) set
`NEXT_PUBLIC_META_PIXEL_ID`, (c) verify Google Search Console + submit
sitemap, (d) run one Gold Map E2E, (e) approve/flip the first AI draft once
the generator runs. Final commit: `Update autonomous run 6 report`.
