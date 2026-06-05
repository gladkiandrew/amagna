# Autonomous Run Plan 2 — Hero final touches + Nav redesign + Frame 2

> Read by Claude Code at the start of an unattended session. Andrew is away
> (working on character portraits in parallel). Work the priorities IN ORDER,
> continuously, in one session. Do not stop to ask questions — make the call
> most consistent with `CLAUDE.md`, `docs/marketing/PLAN.md`, and
> `docs/autonomous-run/CONTRACT-AUDIT.md`, log it in
> `docs/autonomous-run/REPORT-2.md`, and keep moving.

---

## Hard guardrails (identical to run 1 — they override everything)

1. Never `git push`. 2. Never touch `main`/`staging` — keep working on
`auto/2026-06-04-website-build`. 3. Money path frozen (Stripe/checkout/book
code). 4. Zero new dependencies. 5. Never read/write `.env*`.
6. `npm run build` green before every commit. 7. 15-minute rule → log, revert,
move on. 8. Circuit breaker: 3 consecutive failures → report and stop.
9. Never commit `Pics for Amagna/`, `.DS_Store`, `.agents/`, `.claude/*`,
`skills-lock.json`, `docs/autonomous-run/settings.local.json`.
10. No fabricated testimonials/metrics/credentials.

## Phase 0 — Checkpoint (~2 min)

Commit any uncommitted work-in-progress (including the restored
`apps/marketing/public/brand/ship-display-hull-gold.svg` — Andrew re-supplied
it; Frame 2 needs it). `npm run build` green baseline.

---

## Priority 1 — Hero final touches (Andrew's review feedback on /hero-v2)

Andrew reviewed the sunset hero and approved the direction. Final adjustments:

1. **Sun out of frame — afterglow sky.** The sun has ALREADY SET below the
   horizon: no sun disk, no god rays from a visible sun. The sky becomes a
   post-sunset afterglow: orange and dark orange low at the horizon, rising
   through pink into **bright purple** higher up, deepening toward dusk blue
   at the zenith. Andrew explicitly approves purple in the SKY. The color law
   still bans purple IN THE WATER — the sea stays deep navy/blue-black; its
   reflections may pick up the warm orange/pink afterglow tones near the
   horizon, but the bright central sun-glitter road should soften into a
   gentler afterglow shimmer (no sun = no hard glitter highway).
2. **Water untouched.** Same wave structure, scale, motion, horizon curvature.
   Color response only.
3. **All hero copy bigger.** Scale up the H1 (both lines, keeping "Marketing
   Systems" larger than "Autonomous"), the subtitle, and the CTAs ("GET YOUR
   GOLD MAP" / "BOOK A CALL").
4. **Subtitle + CTAs bolder.** Andrew reports they blend into the bright water
   reflections. Increase font weight on both, and retune scrim/text-shadow as
   needed so they hold against the afterglow shimmer at desktop + 390px.
5. **Repaint the Canvas-2D reduced-motion/no-WebGL fallback** to match the new
   afterglow sky so every visitor sees the same brand moment.

Verify legibility with real screenshots at desktop + 390px before moving on.
Commit per concern.

## Priority 2 — Navigation bar redesign (Andrew's exact spec)

The shared header nav is now IN scope (run 1 treated it as off-limits; Andrew
has explicitly ordered this change). His spec:

- **Home link (left):** the Amagna logo icon (`amagna-logo-mark.svg` in
  `public/brand/`) + the "Amagna AI" wordmark, together linking to `/`.
- **Nav items, in this order:** Who We Serve · Our Story · Pricing · Gold Map ·
  Book a Call.
- **Remove:** Home services, Real estate, Custom.

Routing decisions (log any deviation in the report):

- **Who We Serve** → a new `/who-we-serve` page presenting BOTH niches —
  hero statement, then two clear panels (Home Services / Real Estate) that
  link through to the existing `/home-services` and `/real-estate` pages.
  Keep those existing pages and URLs alive (they are ad landing targets).
  Voyage visual language, niche voice per the ICPs in `CLAUDE.md`.
- **Our Story** → `/about` (page already retitled Our Story; relabel the nav).
- **Gold Map** → `/audit` (the audit IS the "Gold Map" — match the hero CTA
  language).
- **Book a Call** → `/book`, kept as the styled button (rightmost).
- Update `NAV_LINKS` / shared chrome in `lib/site.ts` and the footer to match.
  Update `sitemap.ts` with `/who-we-serve`.
- Mobile menu must reflect the same structure. Check keyboard nav + focus
  states. Verify desktop + 390px.

## Priority 3 — Frame 2 of the voyage (/hero-v2)

Frame 2 is the currently-empty `<VoyageReveal />` scaffold below the hero.
Build it per the voyage contract (`docs/marketing/PLAN.md`), adapted to what
now exists:

1. **The ship enters.** Use `public/brand/ship-display-hull-gold.svg` (just
   restored). As the user scrolls out of the hero into Frame 2, the ship
   sails into view with eased scroll-coupled travel and gentle bob/pitch —
   consistent with the contract's ship physics (eased progress, wave-driven
   bob, slope-driven pitch). Canvas sprite or transform-composited DOM/SVG —
   choose what integrates best with the existing scene, log the choice.
2. **The crew presentation — 5 columns.** CORRECTION FROM ANDREW: the crew
   names invented in run 1 (The Scout, The Storyteller, etc.) are WRONG.
   The real Amagna crew, canon from Andrew (this overrides the `/crew` page
   and the agent-fleet names in CLAUDE.md):
   - **Zeno — Captain / The Brain.** Orchestrator; runs the whole operation.
   - **Exodus — Data Specialist.** Data extraction & intelligence.
   - **Solon — Outreach / Retention Specialist.** Keeps clients & leads in
     the fold.
   - **Hero — Automation Specialist.** Builds the systems that run
     themselves.
   - **Thales — Marketing Specialist.** Meta / TikTok / Google.
   Their portraits ALREADY EXIST at `public/brand/crew/<slug>.webp`
   (zeno, exodus, solon, hero, thales) — use them directly, no placeholders
   needed. Note: most are 16:9 landscape (solon is portrait); use
   `object-fit: cover` with center focus in the framed slots.
   Five columns (stacking on mobile), each with portrait, name, title,
   one-line responsibility, and a link to that member's anchor on `/crew`
   (`/crew#zeno` etc.). Zeno is the Captain — give him a subtle visual
   distinction (centered, slightly larger, or gold-framed vs. the others).
   **Also rewrite the `/crew` page to this canon roster** — same names,
   titles, responsibilities, portraits, and matching anchor `id`s. Andrew
   (the founder) remains on `/crew` as the human at the helm of the company,
   distinct from Zeno who captains the AI fleet.
3. **Scroll reveals** per the contract: IntersectionObserver + CSS
   transitions, staggered; `prefers-reduced-motion` → final states. 60fps
   discipline; nothing new in the rAF loop except the ship.
4. After Frame 2, the page should close with the existing footer cleanly (no
   dead empty band).

## Priority 4 — Promotion check (gated — do not force)

Re-run the `CONTRACT-AUDIT.md` checklist against the upgraded `/hero-v2`
(hero + Frame 2). IF it now genuinely satisfies the contract's promotion gate,
promote it to `/` (keep the current `/` voyage reachable at a fallback route,
e.g. `/voyage-v1`, exactly as the contract requires preserving the legacy).
If anything material still fails, do NOT promote — write precisely what's
missing in the report instead. This is a judgment gate: promoting a worse
homepage is the only wrong answer.

## Priority 5 — If time remains

Quality sweep on everything touched this run: metadata for `/who-we-serve`,
accessibility (focus order in the new nav + Frame 2 reveals, alt text on
portrait placeholders), conventions, then keep polishing `/who-we-serve`
copy against the ICPs.

---

## Communication protocol

Never block on Andrew. Decide, log, continue. Maintain
`docs/autonomous-run/REPORT-2.md` AS YOU GO (update after each priority):
commits, decisions with reasoning, open questions, review commands.
Final commit: `Update autonomous run 2 report`.
