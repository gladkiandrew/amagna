# Autonomous Run Plan 3 — Frame 2 polish + homepage build-out

> Read by Claude Code at the start of an unattended ~2.5-hour session. Andrew
> is away. Work the priorities IN ORDER, continuously. Never stop to ask —
> decide per `CLAUDE.md` (just updated — re-read it, positioning and crew
> canon changed), log decisions in `docs/autonomous-run/REPORT-3.md`, keep
> moving.

## Hard guardrails (same as runs 1–2 — override everything)

1. Never `git push`. 2. Never touch `main`/`staging`; stay on
`auto/2026-06-04-website-build`. 3. Money path frozen: no changes to Stripe/
checkout/booking CODE (`api/stripe/**`, `checkout/**`, `book/**`,
`lib/stripe.ts`). Pricing PAGE copy/display IS in scope this run.
4. Zero new dependencies. 5. Never read/write `.env*`. 6. Build green before
every commit. 7. 15-minute rule → log, revert, move on. 8. Circuit breaker at
3 consecutive failures. 9. Never commit `Pics for Amagna/`, `.DS_Store`,
`.agents/`, `.claude/*`, `skills-lock.json`,
`docs/autonomous-run/settings.local.json`. 10. No fabricated testimonials,
metrics, or client results.

## Phase 0 — Checkpoint (~2 min)

Commit any WIP. Build green baseline.

---

## Priority 1 — Frame 2 polish (Andrew's review feedback)

1. **Seamless Frame 1 → Frame 2 fade.** The current transition is a hard
   seam. The hero's water must extend continuously down into Frame 2,
   darkening as it goes until it's super dark navy with only a faint hint of
   sunset reflection. The faint horizontal "strands" currently at the top of
   Frame 2 read as streaks, not water — replace them with realistic animated
   waves (same visual family as the hero water, much darker). The fade region
   keeps live wave animation; the rest of Frame 2's background is the dark
   navy continuation.
2. **Ship sits ON the water.** Move the whole Frame 2 composition up so the
   ship visibly rides the dark water plane (not floating in empty navy
   space). Minimal sunset reflection around it. The wake stays — white foam
   trailing the ship across the dark water (keep current wake, integrate it
   with the new water).
3. **Animation loops.** Every time the user fully scrolls OUT of Frame 2
   (whether fully above it or fully below it) and comes back, the ship
   cruise + crew drop-off animation plays again from the start. Use an
   IntersectionObserver reset: leave-completely → rearm; enter → play.
   `prefers-reduced-motion` still renders final state only.
4. **Exodus role change (canon update, also fixed in CLAUDE.md):** Exodus is
   now the **Creative Specialist** — generates the videos, creates the
   content, blogs, etc. Update his Frame 2 card, `/crew` entry, and any other
   mention. (His old "Data Specialist" title is retired.)

## Priority 2 — Homepage: video examples section (new frame below Frame 2)

A "see the output" section showcasing example videos in TikTok format:

- **Three 9:16 video placeholder cards** in a swipe deck — Tinder-style:
  the front card can be swiped/dragged left (touch + mouse), it animates off
  and the next card rotates forward; infinite rotation through the 3 slots.
  Buttons/arrows as a non-drag fallback + keyboard accessible.
- Build styled placeholders (dark navy card, gold frame, play glyph,
  "Example drop incoming" style label) — Andrew is generating the real MP4s
  NOW. Make swapping trivial: `public/brand/examples/example-1.mp4`,
  `example-2.mp4`, `example-3.mp4`; when a file exists the card becomes a
  `<video>` (muted, loop, playsInline, poster); placeholder shown when
  missing.
- Voyage visual language; section copy short and confident (output speaks).

## Priority 3 — Homepage: services section

A services frame presenting the pillars (from updated CLAUDE.md): **AI
Generated Content · Ads Management (Meta / TikTok / Google) · Central Memory
Layer · Full-Stack Automations · SEO · AEO (answer-engine optimization)**.
One line of plain-English value each (no jargon-speak — Mike must understand
it). Editorial layout consistent with the voyage brand, not a generic
icon-grid. Place it in the homepage flow where it reads best (log the
placement decision).

## Priority 4 — Positioning sweep (re-read updated CLAUDE.md first)

The agency's positioning has broadened: core offering = **Autonomous
Marketing Systems**, serving any operator who wants marketing that runs
itself; home services + real estate remain the two FEATURED lanes, not the
whole story. Update accordingly: `/who-we-serve` (broaden the framing, keep
the two niche panels as featured lanes + a third "and beyond" path to
/custom or /book), homepage copy where it over-narrows, `/about` if it
over-narrows. Keep `/home-services` and `/real-estate` pages intact (ad
landing targets).

## Priority 5 — Pricing display

On `/pricing` (and anywhere tiers appear): never show a flat price — show
**"Starting at $997/mo" / "Starting at $1,497/mo" / "Starting at $2,497/mo"**
with a short honest qualifier that final pricing scales with credits and ad
spend. COPY/DISPLAY ONLY — do not touch checkout/Stripe code; the checkout
flow keeps working exactly as-is.

## Priority 6 — If time remains

Quality sweep on everything touched: metadata, accessibility (the swipe deck
must be keyboard-operable; reduced-motion for all new animation), conventions.
Then polish Frame 2 timing/easing until time is up.

---

## Communication protocol

Never block on Andrew. Decide, log, continue. Maintain
`docs/autonomous-run/REPORT-3.md` AS YOU GO (after each priority). Include
commits, decisions + reasoning, open questions, and review commands.
Final commit: `Update autonomous run 3 report`.
