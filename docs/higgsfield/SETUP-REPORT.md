# Higgsfield Setup — REPORT (autonomous run, 2026-06-09)

> Andrew was away ~2h. This is what happened, what's ready, what's blocked, and the
> **First Run Plan** (2 Instagram + Facebook feed posts, fully specified, **not
> generated** — one approval away).

---

## 🟢 TL;DR

- **Credit balance: `908.41` — UNCHANGED.** Verified 3× (start, mid, end). Zero credits
  spent. The #1 rule held.
- **Phase 1 MAP: ✅ complete** via the read-only Higgsfield MCP → `docs/higgsfield/SETUP-MAP.md`.
- **Phase 3 PROMPT LIBRARY: ✅ complete** → `docs/higgsfield/PROMPTS.md`.
- **Phase 2 CONFIGURE: ⛔ BLOCKED** — every Phase-2 action lives in the **logged-in web
  app**, and the Playwright browser was **not authenticated** (login wall). Per the plan
  I did not guess credentials, did not loop, and did not open a second browser on the
  account. Ready-to-run payloads are below so you can finish Phase 2 in minutes.
- **Playbook updated** with the live account state.

---

## What I configured / produced

| Deliverable | Status | Notes |
|---|---|---|
| `SETUP-MAP.md` | ✅ | Balance, plan, workspace, Soul, Element, full model catalogue, Marketing Studio, presets, history, cost model, web surfaces. |
| `PROMPTS.md` | ✅ | Brand block + 11 hardened templates across feed / service-ad / avatar / b-roll, each w/ model + aspect + cost estimate. |
| `SETUP-REPORT.md` | ✅ | This file + First Run Plan. |
| `higgsfield-playbook.md` | ✅ updated | New "Account state" section appended. |
| Brand memory in Supercomputer | ⛔ blocked | Login-gated UI. Payload ready below. |
| Free Marketplace skills installed | ⛔ blocked | Login-gated UI. Shortlist ready below. |
| Canvas workspace organized | ⛔ blocked | Login-gated UI. Structure proposed below. |
| Brand kit in Marketing Studio | ⛔ deferred | Login-gated UI **and** MCP create scrapes a URL (couldn't confirm $0) → skipped per hard rule. Payload ready below. |

---

## ⛔ Blocked / needs you (and exactly how to clear it)

### The one blocker: the browser was logged out
The Higgsfield **MCP** is fully authenticated (that's how the whole map got built). But
the **Playwright browser** opened to a logged-out higgsfield.ai (top-right = "Login /
Sign up", no credit chip). The plan anticipated this exact case. To finish Phase 2, pick one:

1. **Log into higgsfield.ai inside the Playwright browser**, then re-run this task —
   I'll do the Supercomputer / Canvas / Marketplace config directly. **(preferred)**
2. **Switch me to the Claude-in-Chrome session** (your already-logged-in Chrome) for the
   UI work. ⚠️ Do **not** run both browsers on the account at once.

Either way, none of Phase 2 costs credits — it's all config.

### Ready-to-run Phase 2 payloads (so it's fast once logged in)

**A. Brand memory / Supercomputer memory** — paste the **Brand memory block** from
`PROMPTS.md` (palette, fonts, voice, crew, non-negotiables) into Supercomputer memory.
That's the whole config.

**B. Marketing Studio brand kit** (additive, no generation; do it logged-in so any cost
chip is visible) — fields:
- brand_name: `Amagna AI` · website: `amagna.co` · tagline: `Autonomous Marketing Systems`
- colors: navy `#1A0E36`, navy2 `#241546`, gold `#C9A961`, gold2 `#D4B873`, purple
  `#5D2E8C`, cream `#F5EFE1`
- fonts: Fraunces (headings), Inter (body)
- tone: premium, confident, operator-to-operator, never hypey
- overview: productized AI agency selling Autonomous Marketing Systems; broad ICP, lead
  niches home services + real estate (+ political, non-partisan).

**C. Free Marketplace skills to install** (install only the $0 ones; skip anything with a
credit cost to install):
- Ad / UGC pipeline · Service-ad pipeline · Content-calendar · Talking-avatar / founder-UGC
  · Competitor-scan.
- Verify each shows **Free / $0 to install** before adding; log any that ask for credits
  and skip them.

**D. Canvas board structure** (labels/columns to create — organization only):
- `Amagna — Brand Stills (free lane)` · `Service Ads — Home Services` · `Service Ads —
  Real Estate` · `Founder / AMG Replica` · `B-roll / House Look` · `Client: Breaking the
  Fast`. Pin the Brand memory block as a text node at the top.

---

## ⚠️ Standing caveats

- **AMG Replica Soul has wrong hair.** Do **not** retrain (−25 cr). Manual redo by you
  later. Usable now for avatar work with the hair caveat. (Soul `1623a52f…`, Element
  `e94d2d82…`.)
- **No `get_cost` MCP tool** exists on this build — costs are ledger-derived estimates.
  **Confirm the in-app cost chip before any video render.**
- **Free lane = Soul V2 + Seedream stills (0 cr on Plus).** Spend happens on video.

---

# 🎯 FIRST RUN PLAN — 2 feed posts (IG + FB), one approval away

Both are **stills on the free lane** (0 credits on Plus) so tomorrow is a single
click and **carries no credit risk**. 4:5 works on both Instagram and Facebook feeds.
Generate the still → pick the best of the batch → burn the caption in post (Fraunces) →
post to IG + FB. **Do NOT auto-generate — these wait for your approval.**

### POST 1 — Founder hook (uses AMG Replica, ties the brand to a face)
```
MODEL  : soul_2   +   soul_id 1623a52f-8c37-4588-8edd-49efb76c65a5   (quality 2k)
ASPECT : 4:5 (IG + FB feed)
EST    : 0 credits on Plus (CONFIRMED free lane — Soul V2 billed 0 today)
REF    : Soul-locked identity; medium framing. Hair caveat applies — pick the best frame.
CAPTION (burn in post, Fraunces): "Your marketing should run without you."
```
**Prompt:**
> Photorealistic 4:5 portrait, MEDIUM framing showing the man and some environment (not
> an extreme close-up). The same man as the Soul reference — late 20s–30s, short styled
> brown hair, a clean dark navy button-down. He stands in a modern dark office with soft
> antique-gold accent lighting and a softly-blurred glowing dashboard behind him.
> Confident, calm, looking at camera. Natural realistic skin texture with visible pores,
> believable not plastic. Cinematic navy-and-gold color grade, gentle film grain. NO
> text, NO logos, NO watermark. Keep the lower third clean for a headline added later.

### POST 2 — Brand statement (no people, pure house look)
```
MODEL  : gpt_image_2   (quality high, resolution 2k)        [fallback: nano_banana_pro]
ASPECT : 4:5 (IG + FB feed)
EST    : ~0–low on Plus stills lane — CONFIRM the cost chip (GPT Image not sampled in
         ledger today; if it shows a charge, switch to seedream_v4_5 which is CONFIRMED 0)
REF    : text-to-image (no identity risk)
CAPTION (burn in post, Fraunces): "We build the machine. It runs the marketing."
```
**Prompt:**
> Photorealistic premium brand still, 4:5 vertical. A dark navy-to-aubergine studio
> gradient background (`#1A0E36`→`#241546`) lit by a single warm antique-gold rim light
> from the upper left. Centered: a sleek matte-black control panel glowing with soft
> antique-gold data lines and a single calm pulsing node — the "central brain" of a
> marketing system. Rich shadows, subtle film grain, shallow depth of field, expensive
> and quiet. Negative space kept clean in the lower third for a headline added later. NO
> text, NO logos, NO watermark. Cinematic navy-and-gold color grade.

**Why these two:** one human (founder/face → trust + reach), one brand object (system →
positioning). Same navy-gold grade so the grid reads as one agency. Both free, both 4:5,
both caption-in-post. If you want video versions later, animate the approved still per
`PROMPTS.md` template C2 / A-series (that's the credit-spend step — confirm the chip).

---

## Next session checklist (for me, once you're logged in)
1. Load Brand memory block → Supercomputer memory.
2. Create Amagna brand kit (Marketing Studio) from payload B.
3. Install the 5 free Marketplace skills (payload C), skipping any that cost credits.
4. Build the Canvas board (payload D), pin brand memory.
5. Save the `PROMPTS.md` templates into the app where supported.
6. (Manual, you) Retrain AMG Replica with correct hair when ready (−25 cr, your call).

*Balance at report time: **908.41** (unchanged).*
