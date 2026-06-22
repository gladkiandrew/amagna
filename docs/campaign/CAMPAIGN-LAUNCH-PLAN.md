# Amagna AI — First Campaign Launch Plan (Tri-Cities)

**Drafted:** 2026-06-22 · **Launch Day target:** Mon Jun 29 (~1 week out)

## Locked decisions
- **Brand:** Amagna AI (company, not personal). New company launch.
- **Geo:** Saginaw · Midland · Bay City (+ immediate ring).
- **Ad:** $50/day × 15 days = **$750**. Objective = Leads → Gold Map (`/audit`).
- **Ad creative:** founder video from **film day** (waits on the shoot).
- **Blog cadence:** 1–2 cornerstone posts/week, rotating the 6 sectors.
- **Channels:** Meta ads (FB/IG) · personal LinkedIn → Amagna LinkedIn · FB/IG organic · blog/SEO/AEO.

## ⚠️ The one tension to resolve first
You chose **"wait for film day"** AND **"launch in ~1 week."** Those only both hold if **film day shoots by ~Wed Jun 24**. So film day is "last" in your head but it physically gates the ad — it moves to the front of this week. **Confirm a shoot date in the next 2–3 days, or the launch slips.**

---

## The spine — everything sequences to Launch Day
Launch Day = the ad goes live **and** your personal LinkedIn launch post drops **the same hour**.

| Workstream | Owner | Gates launch? |
|---|---|---|
| A. Film day → ad creative | Ayge | **YES** |
| B. Ad build + tracking | Ayge + Claude | YES |
| C. `/audit` hardening | Claude + Ayge | YES |
| D. LinkedIn (personal + Amagna) | Ayge (Claude drafts) | YES (post) |
| E. Blogs | Claude drafts → Sapt | No (ongoing) |
| F. SEO / AEO | Claude + Ayge | No (ongoing) |
| G. FB/IG brochure posts | Exodus → Buffer | No (ongoing) |

---

## Day-by-day (target launch Mon Jun 29)

### Days 1–2 (Mon–Tue) — foundation, in parallel
**C. Harden `/audit` before any paid traffic** (site won't crash; these are the real risks)
- Verify **prod env vars are actually set** in Cloudflare: `NEXT_PUBLIC_META_PIXEL_ID`, `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `TURNSTILE` secret, Supabase keys. *(If the Turnstile secret is unset, the bot gate passes everything through → Anthropic spend exposure.)*
- **Resend:** confirm `amagna.co` domain is verified AND check the plan's daily send cap. Free tier ≈ 100/day; each completed audit = 2 emails (lead + Andrew) → ~50 audits/day ceiling. A strong ad day can hit it. Upgrade if needed.
- **Anthropic:** set a hard spend cap + alert. Confirm rate limits. (Per-email 3/24h cap + Turnstile already throttle abuse.)
- **Cloudflare Worker limits:** time one real audit submission end-to-end; confirm the AI call finishes inside Worker CPU/wall limits. Bump the Workers plan if it's close.
- **Load test:** fire ~20–50 concurrent `/audit` submits; watch for 500s, timeouts, email-cap errors, Anthropic throttling.
- **Launch-day monitoring:** confirm you can watch the `widget_submissions` table live + Cloudflare error logs.
- Confirm **pixel fires**: PageView site-wide + **Lead on `/audit` submit** (already wired in code).

**E/F. Kick off content + SEO baseline**
- **Unpublish the 2 lingering political blog posts** (out of GTM). *(Carry-forward item.)*
- Run an SEO baseline audit on amagna.co (`searchfit-seo:seo-audit`).
- Confirm `sitemap.xml` + `robots.txt` live; submit sitemap to **Google Search Console + Bing**.

### Days 1–3 — Film day (gates the ad)
- **Shot list** for the ad: Ayge on camera as the local AI specialist. Beats: hook → problem (local businesses drowning/leaving money on the table) → proof (Breaking the Fast results) → offer (free Gold Map audit) → CTA.
- Shoot **multiple ratios**: 9:16 (Reels/Stories), 1:1, 4:5. Primary 15–30s + a 6s hook cut.
- Grab **B-roll** for organic FB/IG + LinkedIn reuse.
- *Why film day matters:* founder-face is blocked in Higgsfield until the Soul retrain — real footage is the only way to get authentic founder creative. This shoot unlocks it.

### Days 3–5 (Wed–Fri) — ad build (don't set live yet)
- Campaign: objective **Leads**; conversion event **Lead** (`/audit` submit). Keep a **Meta Instant Form** variant as fallback if landing-page conversion lags.
- Audience: Saginaw + Midland + Bay City + radius; **exclude out-of-area**; sensible age band; keep interests broad (small market — let Meta optimize). 1 ad set.
- Creative: 2–3 variants (founder video A + B, plus 1 static) to A/B the hook.
- Ad copy in Amagna voice; preview across FB/IG placements.
- Destination `/audit` — verify **mobile-perfect** + fast.
- **Schedule** the campaign for Launch Day. Spend stays gated to Ayge.

### Days 3–6 — LinkedIn engine
- Draft **personal launch post**: announce Amagna, the Custom AI Installs model, build-in-public angle, CTA to the Gold Map. **Posts the same hour as the ad.**
- Amagna company page: repost / native cross-post within the hour.
- Pre-write **first 1–2 weeks** of posts. Cadence: personal **3–4×/wk** driving to the Amagna page; Amagna page **2×/wk**. (LinkedIn = manual, not Buffer.)

### Launch Day (Mon Jun 29)
- **Morning checks:** pixel firing · `/audit` load-tested + env vars set · creative approved · audience saved · budget confirmed.
- **Flip the ad live** (Ayge approves spend).
- **Same hour:** personal LinkedIn launch post → repost to Amagna page.
- First FB/IG launch post (Exodus → Buffer).
- **Watch the first 2–3 hours live:** `/audit` submissions, Anthropic + Resend usage, any errors.

### Launch +1 onward — run it
- **Daily:** CPL, lead quality, `/audit` health, spend pacing. **Respond to every lead within ~5 min.**
- Blogs: 1–2 cornerstone posts/week, rotating sectors — **start with medical + home-services** (match your strongest lead pools + ad).
- FB/IG: continue brochure posts (brand block, no text in image, ≤3 hashtags).
- **Email warmup runs in the background** (separate domain + warmup tool). Cold sequence to the 400 Tri-Cities leads **~week 3**, once warmed — never from amagna.co.

---

## SEO / AEO track (ongoing, starts Day 1–2)
- **Technical:** sitemap submitted to GSC + Bing; verify all 6 sector pages + `/custom-ai-installs` + `/blog` indexable.
- **Schema/AEO:** add structured data — Organization, **LocalBusiness with Tri-Cities areaServed**, FAQ blocks, Article schema on blog posts. This is what gets you cited by ChatGPT / Perplexity. (`searchfit-seo:schema-markup`, `:ai-visibility`.)
- **Local:** stand up / optimize a **Google Business Profile** — big for "AI [service] near me" local intent in the Tri-Cities.
- **Content = SEO:** each cornerstone blog targets a sector + local keyword cluster, answer-formatted for AEO.

## Blog plan (1–2 cornerstone/week, rotating 6 sectors)
Sectors: home-services · medical-offices · multi-location · real-estate · ecommerce-brands · (political = **retired**). Each sector cycles every ~3 weeks. Authored in **Sapt** (site revalidates hourly — no redeploy). Claude drafts → Ayge approves → publish.

## Risks / flags
- **Film day gates the ad** — confirm a shoot date by ~Wed or launch slips.
- **`/audit` cost under traffic** — Resend daily cap + Anthropic spend are the ceilings; cap + verify env before launch.
- **Turnstile secret must be set in prod** or bots can burn Anthropic credits.
- **400 leads are cold** — warmed domain first, ~week 3, never the brand domain.

## Open items for Ayge to confirm
1. Film-day shoot date (≤ Wed Jun 24 to hold the Jun 29 launch).
2. Go-ahead to harden `/audit` (env audit + load test).
3. Resend + Anthropic plan/limits — who owns the upgrade if caps are low.
