# Higgsfield Full-Capacity Setup — Project Plan

> Strategic plan for the autonomous Claude Code run that configures Higgsfield to
> full capacity. **Zero Higgsfield credits may be spent.** This doc is foundation
> context — Claude Code should read it before acting.

## The goal (in priority order)

1. **Tomorrow: 2 posts live on Amagna's Instagram + Facebook.** Everything this run
   does should make that one-click-to-generate when Andrew returns. The single most
   important deliverable is a **FIRST RUN PLAN**: 2 fully-specified, brand-tuned,
   ready-to-generate Amagna feed posts (prompt + model + aspect + cost estimate) —
   built but NOT generated.
2. **A reusable foundation for autonomy** — brand memory loaded, skills installed,
   a prompt library, the account mapped and organized — so future content runs are
   structured and high-quality, not one-off guesses.
3. **Better video quality** — the whole reason. Higgsfield output hasn't hit the
   quality bar; structure + brand memory + the playbook is how we fix that.

## The core constraint — ZERO CREDIT BURN

Andrew was burned by accidental credit spend before. This is the #1 rule.
- **Never click** Generate / Render / Run / Animate / Create / Try / Preview /
  Start (Supercomputer) / Train / Retrain. If a button might spend, don't touch it.
- Higgsfield MCP is **read-only this run**: balance, models_explore, list
  Souls/assets/generations, `get_cost` for ESTIMATES only. Never submit a job.
- Config, brand-memory, skill-installs, Canvas organization, and docs do NOT cost
  credits — that's the entire scope of what runs autonomously.
- When unsure whether something spends → screenshot, log it, skip it.

## Architecture & division of labor

- **Playwright MCP = primary** for the web-app-only UI (Canvas, Supercomputer
  config, Marketplace skill installs, brand memory, account mapping). The Higgsfield
  MCP can't reach this UI; Playwright can.
- **Higgsfield MCP = read-only sidecar** — inventory + cost estimates only.
- **Claude in Chrome = fallback only.** If Playwright can't authenticate (login/2FA
  wall), Andrew's already-logged-in Chrome session via the Chrome MCP is the
  smoother path for the logged-in UI work. **Do not run both browsers driving the
  same account at once** — pick one. Default Playwright; switch to Chrome only if
  blocked on auth.

## The login reality (biggest blocker)

Higgsfield is behind a login, and Claude Code **cannot pass 2FA**. Mitigation:
- **Andrew should log into higgsfield.ai in the Playwright browser BEFORE starting
  the run** (or use the Chrome MCP against his already-authenticated session).
- If Claude Code hits a login or 2FA wall, it must **STOP and log a clear note** in
  SETUP-REPORT.md — never guess credentials, never get stuck in a loop.

## "While I'm gone" reality

Runs only while the Mac is **awake, plugged in, and the Claude Code session is
active** — not after the lid closes. Run `caffeinate -dims` and keep it on charge.

## Priorities inside Higgsfield (Andrew's words)

- **Cinema Studio / Supercomputer is the most important surface** — map and
  configure it first and most thoroughly.
- **Marketing Studio** — secondary, for product/service UGC ads.
- **AMG Replica Soul** (Andrew's AI influencer, his face) — exists, **hair is wrong,
  DO NOT retrain (costs credits)**. Note it for a later manual redo. It still powers
  the avatar / talking-head content pillar in the prompt library.

## Foundation-for-autonomy deliverables (all docs, no credits)

- `docs/higgsfield/SETUP-MAP.md` — full account inventory + screenshots.
- `docs/higgsfield/PROMPTS.md` — brand-tuned reusable prompt templates (feed posts,
  service ads, AMG-avatar talking-head, b-roll), each with model + aspect + cost
  estimate, built ON the rules in `higgsfield-playbook.md` and the shot logic in
  `higgsfield-canvas.html`.
- `docs/higgsfield/SETUP-REPORT.md` — what's configured, what's blocked, balance
  (unchanged), and the **FIRST RUN PLAN** (the 2 Amagna posts).
- Updated `higgsfield-playbook.md` with the new account state.

## What success looks like when Andrew returns

- Credit balance **unchanged**.
- Higgsfield mapped, brand memory loaded, free skills installed, Canvas organized.
- A prompt library tuned to Amagna's brand + the playbook rules.
- 2 Amagna IG/FB posts fully specified and one approval away from generating.
- A clean report; any blockers clearly flagged, nothing guessed.
