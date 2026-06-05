# Autonomous Run Plan 4 — The Gold Map (rebuild /audit as the treasure hunt)

> Read by Claude Code at session start. Andrew is away. Work priorities IN
> ORDER, continuously, no questions — decide per CLAUDE.md (re-read it: the
> volume-intake strategy and Gold Map canon were just added), log decisions in
> `docs/autonomous-run/REPORT-4.md`, keep moving.

## Hard guardrails (override everything)

1. Never `git push`. 2. Never touch `main`/`staging`; stay on
`auto/2026-06-04-website-build`. 3. Stripe/checkout/booking CODE frozen
(`api/stripe/**`, `checkout/**`, `book/**`, `lib/stripe.ts`). The audit page
and its server actions ARE in scope this run — it's being rebuilt.
4. Zero new dependencies. 5. Never read/write `.env*`. 6. Build green before
every commit. 7. 15-minute rule → log, revert, move on. 8. Circuit breaker at
3 consecutive failures. 9. Never commit `Pics for Amagna/`, `.DS_Store`,
`.agents/`, `.claude/*`, `skills-lock.json`,
`docs/autonomous-run/settings.local.json`. 10. No fabricated testimonials,
metrics, or invented claims. 11. **NO exclusivity language anywhere** — no
"one client per zip," no "we never work with your competitor" (see CLAUDE.md
volume-intake strategy).

## Supabase safety rules (Andrew's explicit concern — do not wreck his setup)

- **Additive only.** Never ALTER or DROP existing tables, policies, or
  functions. Never touch existing rows.
- Strongly prefer **reusing the existing submissions pattern**: if the
  current audit flow writes to a table (e.g. `widget_submissions`) whose
  schema can absorb Gold Map leads via its existing columns + a
  source/type discriminator, use that — zero schema change.
- If a new table is genuinely required, do NOT run anything against the
  database. Write a migration SQL file (following whatever convention
  `scripts/run-supabase-migrations.mjs` and `infra/supabase` expect), make
  the server action degrade gracefully if the table doesn't exist yet, and
  flag prominently in REPORT-4.md that Andrew must run the migration himself.
- The Anthropic call + Supabase insert pattern in the existing audit server
  actions is proven on Workers — reuse its structure, don't reinvent it.

## Phase 0 — Checkpoint (~2 min)

Commit any WIP. Build green baseline.

---

## Priority 1 — Pricing fix (5 min, do first)

Remove the zip-exclusivity commitment ("One client per zip code — your
exclusivity guarantee. We never work with your competitor.") from `/pricing`
and anywhere else it appears (grep the whole app). Keep the setup-fee and
month-to-month lines. Commit.

## Priority 2 — The Gold Map experience (the bulk of this run)

Rebuild `/audit` as the Gold Map treasure hunt. The nav ("Gold Map") and the
hero CTA ("Get Your Gold Map") already point here. One continuous scrolling
page, treasure-hunt narrative, voyage brand (parchment/scroll texture is new
but must harmonize: cream, gold, deep navy, restrained purple, Fraunces).

### The scroll (hero)

Centered parchment scroll, **VERTICAL orientation** (rolled ends top and
bottom — Andrew supplied a horizontal reference image; rotate the concept),
presenting the quest steps. Positional scarcity only ("The crew reviews
every application") — no contractual promises.

### APPROVED COPY (Andrew's exact copy — use verbatim; polish only where
something is unspecified, never restructure)

Hero / scroll:
- Page header (top): **The Gold Map**
- Subheader (still big): **Every Operator's Journey to Gold is Different**
- Subtitle (on the LEFT side of the scroll): **Here's how we find yours:**
- Steps on the scroll:
  ① Tell us about your business
  ② Create Your Key
  ③ Find your Plan to Gold

Step 1 heading: **Step One — Log your vessel.** The intake fields presented
as clean structured tables/sections (labels stay boring-clear: "Monthly
revenue," "Service area" — no themed language on inputs).

Step 2 heading + flow: **Step Two — Forge your key.** "We built this prompt
from your answers." → "Copy this prompt" button + the personalized prompt →
"Copy it into your own AI — ChatGPT, Claude, Gemini — the one that already
knows you. Tell it your goals, give it everything. It'll hand you back one
master prompt. That's your key."

Step 3: **Step Three — Turn the key.** "Paste your master prompt below.
X marks the spot." Quiet fallback link: "No AI handy? The crew can chart
from your log alone →"

Dig/loading copy: "The crew is digging at your X… reading the currents…
charting what's buried…"

Chest: **Press X to open.** → (opens) **No gold in here. Yet.** "Gold
doesn't get found — it gets made. Here's exactly how we'd make yours:" →
the generated plan ("Plan to Gold") renders.

Close: **The map is yours. The crew sails when you say go.** [Book the call]

**Email requirement (hard):** the MOMENT the Plan to Gold is generated, it
is emailed to the lead automatically (Resend pattern, same content as
on-screen, voyage-voiced subject). On-screen render must never depend on
email success.

### Step 1 — The intake

In-scroll form: name, email, phone, business name, business type, monthly
revenue (ranged select), employees (ranged select), service area/address,
social channels (multi), current marketing efforts (short text), goals
(short text).

- **On submit the lead is captured to Supabase IMMEDIATELY** (per the
  Supabase safety rules above) with a source marker for gold-map and a
  status field tracking how far they got (intake_only → keyed → plan_generated).
  Andrew follows up with every lead regardless of completion.
- Client + server validation, honest errors, mobile-clean.

### Step 2 — The personalized prompt + Zeno

- Assemble a **personalized copy-paste prompt client-side from their intake
  answers** (no AI call — instant): it instructs THEIR AI (ChatGPT/Claude/
  Gemini — which already has context about them) to combine our brief with
  everything it knows about their business plus the extra context/goals they
  give it, and output a single dense "master prompt" describing the
  business, its situation, and its goals — ending with a labeled data block
  (revenue, employees, service area, channels, goals) for parseability.
- Big copy button. Plain-English instructions.
- **Zeno video slot**: drop-in pattern like the example videos —
  `public/brand/gold-map/zeno-step2.mp4`; styled placeholder (Zeno portrait
  + caption summarizing the instructions) until Andrew drops the file. The
  video's only job: explain this step.

### Step 3 — The key + the X

- Paste field for the master prompt ("the key"). On submit: update their
  Supabase row (status → keyed, store the key text), and stamp an X onto a
  treasure-map visual — a satisfying moment, not just a form ack.
- **Quiet fallback**: a low-emphasis "No AI handy? We'll chart from your
  intake alone" link that proceeds without the key (status stays
  intake_only). Never lose the lead at the highest-friction step.

### The dig + the chest

- Trigger the plan generation (Anthropic server action, reusing the proven
  audit pattern; input = intake + master key when present). While it runs,
  play the dig: animated digging at the X / map excavation. The animation IS
  the loading state — time it to feel alive even if generation takes 60s
  (loop with progression, not a frozen gif). Reduced-motion → simple
  progress copy.
- Chest surfaces → "Press X to open" interaction → chest opens **empty**:
  "No gold in here yet. The gold gets made. Here's exactly how we'd make
  yours:" → the full step-by-step plan renders, voyage-styled, structured
  (phases/steps, what the crew does, what Andrew's system handles).
- The plan must be genuinely good — it IS the sales pitch. Tune the
  generation prompt for: specific to their intake/key, plain English (Mike
  must understand it), concrete actions, no fluffy filler, no invented
  metrics or fake guarantees.
- Below the plan: the close. Book-a-call CTA (existing /book Cal.com flow,
  linked not modified) as the unmistakable next step.

### Delivery

- **On-screen + email**: after generation, email the plan to the lead via
  the existing Resend pattern (from /custom-quote actions). Subject + body
  in voyage voice. Update status → plan_generated. If email fails, the
  on-screen plan still shows (log failure to the row if a column fits).

## Priority 3 — Wiring + cost discipline

- Nothing generates before Step 1 data is captured (the email gate is the
  cost gate). Cap plan output tokens sensibly. Server-side guard against
  repeat generation spam from the same lead (simple: if a recent row with
  same email already has a plan, reuse/return it).
- All Gold Map UI is reachable: hero CTA, nav "Gold Map", any "audit"
  labels sitewide get re-labeled to Gold Map language (grep for "audit"
  user-facing copy; route stays /audit).

## Priority 4 — Quality sweep

Metadata/OG for the rebuilt page; accessibility (the whole hunt must be
keyboard-completable; reduced-motion paths for scroll/X/dig/chest; form
labels); conventions; mobile 390px polish; then keep refining the plan
generation prompt until time is up.

---

## Communication protocol

Never block on Andrew. Decide, log, continue. Maintain REPORT-4.md as you go
(after each priority): commits, decisions + reasoning, **anything Andrew must
run himself (e.g. a Supabase migration)**, open questions, review commands.
Final commit: `Update autonomous run 4 report`.
