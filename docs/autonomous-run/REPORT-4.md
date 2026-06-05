# Autonomous Run 4 Report — The Gold Map — 2026-06-05

> Branch `auto/2026-06-04-website-build`. Nothing pushed. Run 4 = remove
> exclusivity language + rebuild `/audit` as the Gold Map treasure-hunt funnel.

## ⚠️ What Andrew must run himself
**Nothing.** The Gold Map reuses the existing `widget_submissions` table with
**ZERO schema change** (Supabase safety rules honored — additive only, no
ALTER/DROP, nothing run against the DB). No migration to apply.

## Drop-in slots Andrew will fill later
- **Zeno video:** drop `public/brand/gold-map/zeno-step2.mp4`. Until then a styled
  placeholder (Zeno portrait + caption) shows. Detection is automatic
  (onCanPlay/onError), no code change.
- **Scroll art:** the vertical parchment scroll is a styled CSS placeholder
  (cream/gold, rolled ends). Swap for real art later without touching the copy
  or layout.

## How to review
```bash
git log --oneline a70edfe~1..HEAD     # run-4 commits
cd apps/marketing && npm run build    # confirm green
npm run dev                           # walk /audit end to end (intake → forge → turn → dig → chest → plan)
```

---

## Status timeline

### Phase 0 — Checkpoint ✅ (CLAUDE.md update + PLAN-4 committed, green baseline.)

### Priority 1 — Remove exclusivity language ✅
Dropped the zip-exclusivity guarantee and the "One client per zip code" header
line from `/pricing` (volume-intake strategy). Grep confirms **no exclusivity
language anywhere** in the app. Commit a70edfe.

### Priority 2 — The Gold Map (rebuild /audit) ✅
Single scrolling treasure-hunt funnel replacing the old audit widget. Voyage
brand + parchment scroll. **Approved copy used verbatim.** Commit 4a37b46.
- **Scroll hero** — "The Gold Map" / "Every Operator's Journey to Gold is
  Different" / vertical parchment scroll with the 3 quest steps + positional
  scarcity ("The crew reviews every application").
- **Step 1 'Log your vessel'** — structured intake; on submit the lead is
  captured to Supabase IMMEDIATELY (reuses `widget_submissions`; source + status
  + intake + key + plan all ride in the existing `audit_json` jsonb — zero schema
  change). Degrades gracefully with no DB. Status: intake_only → keyed →
  plan_generated.
- **Step 2 'Forge your key'** — a personalized prompt assembled CLIENT-SIDE from
  the intake (instant, no AI), copy button, + Zeno video drop-in slot.
- **Step 3 'Turn the key'** — paste the master prompt; "Mark the spot"; quiet
  fallback "No AI handy? chart from your log alone".
- **The dig** — animated X/shovel loading state (reduced-motion → progress copy)
  while Claude writes the plan (proven audit Anthropic tool-use pattern reused).
- **Empty chest** — "Press X to open" → "No gold in here. Yet." → the
  genuinely-good, specific Plan to Gold (phases + crew-handles + first move).
- **Close** — "The map is yours. The crew sails when you say go." → Book the call.
- **Email** — on generation the plan is emailed to the lead (Resend); on-screen
  never depends on email; Andrew is notified of the lead.
- **Verified end to end in a real browser with REAL Claude generation** (the
  `ANTHROPIC_API_KEY` is set locally; generation took ~6–33s, fully covered by the
  dig). Example plan headline produced: *'Own "furnace repair Saginaw" this winter
  and build a maintenance base that pays you in July.'* — specific and good.

### Priority 3 — Wiring + cost discipline ✅
Commit 4a52f33.
- Re-labeled every user-facing "Get your free audit" → "Get your Gold Map"
  sitewide (CtaBand, niche funnel, pricing, legacy hero-flow, dock, who-we-serve/
  crew/about). Route stays `/audit`. Grep confirms no "free audit" remains.
- Cost gates: generation only runs after Step-1 capture (the email gate); output
  tokens capped (2000); two repeat-generation guards — reuse by submissionId and
  reuse a recent (<24h) plan for the same email.

### Priority 4 — Quality sweep ✅
Metadata/OG on the rebuilt page; `tsc --noEmit` clean; no `any`; named exports;
kebab-case; form labels (`<label htmlFor>`); whole hunt keyboard-completable
(native inputs/buttons); reduced-motion paths for the dig + chest + animations
(scoped CSS `@media`); verified the hero + intake on 390px.

---

## Commits
| Commit | Concern |
|---|---|
| (phase 0) | Checkpoint: CLAUDE.md + PLAN-4 |
| a70edfe | Remove exclusivity language from /pricing |
| 4a37b46 | Rebuild /audit as the Gold Map treasure hunt |
| 4a52f33 | Gold Map wiring: re-label CTAs + email cost guard |
| _final_ | Update autonomous run 4 report |

## Decisions made for Andrew
1. **Supabase: reused `widget_submissions`, zero schema change.** Gold Map data
   lives in the existing `audit_json` jsonb (`{source,status,intake,key,plan}`)
   plus a readable `situation_text`. Honors the additive-only rule and means **no
   migration to run**. If you later want first-class columns (status, source),
   that's a future additive migration — flag me.
2. **Master-prompt key is assembled client-side** (instant, no AI spend); only
   the final plan calls Claude — and only after the lead is captured.
3. **Plan generation model:** `claude-opus-4-7` (matches the existing audit
   generator), tool-use for guaranteed structure, 2000-token cap.

## Open questions for Andrew
1. The Zeno step-2 video and real scroll art are placeholders — drop them in when
   ready (paths above), no code change needed.
2. Want a first-class `status`/`source` column on `widget_submissions` for easier
   querying? It'd be a clean additive migration when you say go.

## Circuit-breaker / blocker log
- One `git add` aborted on an already-deleted pathspec, committing only the
  deletions; caught immediately and amended into the full rebuild commit. No
  other failures; circuit breaker never tripped.
