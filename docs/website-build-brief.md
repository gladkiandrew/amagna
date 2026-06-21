# AMAGNA WEBSITE UPDATE — MASTER BUILD BRIEF (REVISED)
**Handoff:** Ayge → Cowork → Claude Code (CC)  ·  **Date:** 2026-06-15  ·  Ayge AFK ~1 hr, work autonomously.

> **REVISION NOTE (Ayge, 2026-06-15):** Custom AI Installs is **NOT a new page and NOT a new homepage section**.
> It is (a) a **core-services item on the homepage's 5th frame** and (b) a **Who-We-Serve sub-page that REPLACES
> the Political Candidates box/sub-page**. There is **no new "Gold Map intake form"** — the Gold Map already lives
> at `/audit`; custom installs use a **"Request a Custom Quote"** CTA into the existing funnel. Pricing model for
> custom installs = **large build fee up front + low retainer $250–500/mo, on top of expenses.**

---

## 0. HOW TO USE
CC runs with `--dangerously-skip-permissions`, autonomously, ~1 hr. Obey Section 2 guardrails. Don't pause for
in-repo confirmations; only stop for irreversible **non-repo** actions (prod deploy, payments, account/secret changes).
**READ SECTION 2 FIRST.**

## 1. MISSION
Evolve **amagna.co** from "autonomous marketing systems" → a company that also delivers **custom, in-person
full-stack AI installs**. Scope:
1. **Homepage** — evolve positioning + subhead; primary CTA path preserved.
2. **Homepage 5th frame (core services)** — ADD "Custom AI Installs / Full-Stack Automation" as a core service pillar. (NOT a new section.)
3. **Our Story** — extend to the voyage/crew narrative + the evolution to full-stack + custom installs (Mansa rationale).
4. **Who We Serve** — **replace Political Candidates** box + sub-page with **Custom AI Installs / Full-Stack Automation**; populate that sub-page; custom-quote CTA + pricing model.
5. **Meet the Crew** — final **5 agents** (add Mansa + Vela; keep Zeno, Exodus, Solon; new roles).
6. **Repo memory** — record the 6 official Voyage Crew Element IDs (for future content gen; NOT shown on site).
7. **CLAUDE.md** — update: Political Candidates **retired** as a serviced industry, replaced by Custom AI Installs; crew roster Hero/Thales → Mansa/Vela.

## 2. HARD GUARDRAILS (non-negotiable)
- **HIGGSFIELD ≤ 5 CREDITS; ZERO new generations.** All art exists. Missing → placeholder + `TODO`, never generate. If a gen ever seems needed, `get_cost` first; never exceed 5 credits.
- **SHIP — DO NOT TOUCH.** Leave the hero ship visual/animation exactly as-is.
- **NON-DESTRUCTIVE / SURGICAL.** Read before write. Preserve brand system, pricing tiers, working components, routing, animations. Additive, smallest-diff. No broad refactors.
- **GIT.** Feature branch off the build branch. Commit often. Never force-push. **Do NOT merge to `main`, do NOT deploy** (Cloudflare deploys `main`; leave prod for Ayge).
- **BRAND SYSTEM.** Use the repo's existing tokens/fonts — do not introduce drift. Display = **Cinzel** (600, ~0.08em, UPPERCASE, headings/marks only); body = **Inter**. Palette per the repo theme (purple/gold/cream/navy). Logo-ship in header/nav only — never floated in hero. *(If repo tokens differ from any hex quoted here, the repo wins — flag it, don't hardcode.)*
- **IRREVERSIBLE + NON-REPO** → STOP + leave a note. In-repo → proceed.

## 3. REPO FACTS
- **Path:** `~/dev/amagna` (Cursor terminal). App likely `apps/marketing`.
- **Base branch:** `auto/2026-06-04-website-build`.
- **Stack:** Next.js → OpenNext → Cloudflare Workers.
- **Note:** a `Fraunces → Cinzel` swap may be pending — verify Cinzel is the live display font; finish the swap if not.
- **Gold Map** lead funnel already exists at **`/audit`** — reuse it; do not rebuild it.

## 4. STEP 1 — RECON (before any edit)
```bash
cd ~/dev/amagna
git status && git branch
find . -type d -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/.next/*' | head -120
grep -rin "our story" --include=*.tsx --include=*.ts --include=*.mdx -l .
grep -rin "crew" --include=*.tsx --include=*.ts -l .
grep -rin "who we serve\|whoweserve\|political\|candidate" --include=*.tsx --include=*.ts -l .   # Who We Serve + politics box/subpage to REPLACE
grep -rin "Foundation\|Growth\|Authority" --include=*.tsx --include=*.ts -l .                      # existing pricing (preserve)
grep -rin "ship\|hero\|canvas\|shader" --include=*.tsx --include=*.ts -l .                          # ship (DON'T edit)
grep -rin "audit\|gold map\|goldmap" --include=*.tsx --include=*.ts -l .                            # existing Gold Map funnel
find . -path '*/api/*' -name 'route.*' -not -path '*/node_modules/*'
find public -maxdepth 3 -type f 2>/dev/null | grep -iE 'crew|zeno|exodus|solon|mansa|vela|ship' || true
```
**Recon note (to self):** homepage entry file; the **services / "core services" frame (the 5th homepage frame)**; Our Story component; Who-We-Serve component + the **political-candidates box + sub-page** (to replace); pricing component; ship component (avoid); existing Gold Map/audit funnel + its CTA pattern; theme/token file; `public/` crew asset layout.

## 5. STEP 2 — BRANCH
```bash
git checkout auto/2026-06-04-website-build
git pull --ff-only || true
git checkout -b feat/fullstack-installs-crew5
```

## 6. DELIVERABLE A — HOMEPAGE
- **Hero untouched** (ship + ocean). Keep H1 "Autonomous Marketing Systems."
- **Evolve the hero subhead** to signal expanded positioning. Pick the most on-brand:
  - "We build the autonomous marketing system — then install custom AI across your entire business, in person."
  - "From autonomous marketing to full-stack AI — engineered for your business, installed in person."
- **5th frame = core services:** ADD a **"Custom AI Installs / Full-Stack Automation"** pillar alongside the existing service pillars (AI content, ads, memory layer, automations, SEO, AEO). One card/line, on-brand, with a **"Request a Custom Quote"** link → the existing Gold Map/`/audit` funnel. **Do not add a separate full-width Custom-Installs section to the homepage.**
- **Meet the Crew** (5 agents — §8) stays/updates in its existing slot.
- **Existing pricing tiers** (Foundation / Growth / Authority) — **preserve untouched.**
- Primary CTA path unchanged (Gold Map / `/audit`).

## 7. DELIVERABLE B — OUR STORY
Extend on-brand (premium, confident, nautical, never cheesy). Beats:
- Amagna began building **autonomous marketing systems** — one crew of specialized AI agents from a single command center.
- Name the **5 agents** (§8), each owning a domain of the voyage.
- Amagna now expands into **full-stack automation** — custom AI installed **in person**, tailored to one business.
- **Why it's safe:** **Mansa** (Memory & Security Specialist) is the dedicated security + memory layer — protects each client's data + IP and gives their AI a true memory of their business; that's what makes a bespoke install trustworthy.
- Close: the human stays in command — Ayge is the captain, the crew does the work, the client always steers.

## 8. DELIVERABLE C — MEET THE CREW (5 agents)
| Agent | Role |
|---|---|
| **Zeno** | Captain & Automation Specialist ("The Brain") |
| **Exodus** | Creative & Content Specialist |
| **Solon** | Outreach & Retention Specialist |
| **Mansa** | Memory & Security Specialist |
| **Vela** | Demand & Narrative Specialist |

Bios (tighten on-brand):
- **Zeno** — Sets the course and keeps the system running. Orchestrates every agent, routes the work, holds the gates, turns strategy into automated motion.
- **Exodus** — Turns your brand into a daily presence. Generates the images, video, and copy and ships them across your channels.
- **Solon** — Opens doors and keeps them open. Runs personalized outreach and the retention motion that turns first contact into long-term clients.
- **Mansa** — Guardian of the vault. Protects your data and IP and gives your AI a memory of your business — the security + memory layer that makes a custom install safe.
- **Vela** — Catches the wind. Runs paid demand across Meta, TikTok, and Google and shapes the narrative that pulls the right customers toward you.

**Build notes:** Add Mansa + Vela cards; keep Zeno/Exodus/Solon. Names in Cinzel; role label; short bio. Images → `public/crew/` (match repo naming). Zeno/Exodus/Solon likely already present — **reuse, don't overwrite.** Mansa + Vela are new — download from §12 into `public/crew/` (`mansa.jpeg`, `vela.jpeg`), optimize to match existing crew format/size, preserve aspect ratio. **Element IDs are NOT shown on the site or embedded in code** — repo memory only (§11).

## 9. DELIVERABLE D — CUSTOM AI INSTALLS (Who-We-Serve sub-page, REPLACING Politics)
**This lives in Who We Serve, not as a homepage section.** Replace the Political Candidates Who-We-Serve box + its sub-page with **Custom AI Installs / Full-Stack Automation**. Update the box label/art and route to the new sub-page; remove/retire the politics sub-page content (keep the route working — redirect or repurpose).

**Sub-page content (on-brand):**
- **Headline:** "Custom AI, Installed In Person." (or "Beyond Marketing: Full-Stack AI Installs.")
- **Subhead:** We build and install **custom, full-stack AI** for your business **in person** — map your operations on-site, then build bespoke AI across marketing, outreach, retention, content, and automation, tailored to exactly how you work.
- **Supporting points:** On-site discovery · Bespoke build (not a template) · **Security + memory layer (Mansa)** — your data/IP protected, your AI remembers your business · **Custom pricing.**
- **PRICING MODEL (state clearly):** a **large one-time build fee up front**, then a **low monthly retainer ($250–$500/mo)** to run and maintain it — **plus pass-through expenses** (ad spend, API/token usage, third-party tools). Scoped per business; no fixed tier.
- **CTA:** **"Request a Custom Quote"** → the existing Gold Map / `/audit` funnel (or the site's existing lead/contact pattern). **Do NOT build a new intake form or a new `/api/gold-map`.**

## 10. (REMOVED) — no new Gold Map form
The Gold Map already exists at `/audit`. Do not scaffold a new form or API. Custom installs reuse it via the
"Request a Custom Quote" CTA. If a lightweight quote-request is truly absent, reuse the existing lead form/API
pattern and add a "Custom Install" lead type — env-guarded, never hardcode secrets, log-and-succeed fallback.

## 11. DELIVERABLE E — REPO MEMORY (not on site)
Create/update **`memory/BRAND_ASSETS.md`** with the 6 official Element IDs + roles + usage note
(*embed as `<<<element_id>>>` in Higgsfield MCP prompts; the website uses rendered image files, not these IDs*),
and the final 5-agent roster. If **`memory/BRAIN.md`** exists, add a pointer + roster note (Hero/Thales retired; Mansa + Vela added).
```
Voyage Ship (prop)               1cff516e-9ee5-4be6-80f3-02b908698a20
Zeno  (Captain & Automation)     5230d0a3-e6a4-4141-bf8b-6b87523a8bb2
Exodus (Creative & Content)      56538302-5da2-4817-bcb7-22810bb79960
Solon (Outreach & Retention)     1e14872c-c486-45bb-a05c-c8e5655e2da1
Mansa (Memory & Security)        5f229be9-3f0f-4f75-b3b3-ce6865dc6c01
Vela  (Demand & Narrative)       6a40a163-8e1b-4b66-8f26-05acd37a0ee7
```
Also update **`CLAUDE.md`**: retire Political Candidates as a serviced industry (replaced by Custom AI Installs / Full-Stack Automation in Who We Serve); crew roster → Zeno, Exodus, Solon, Mansa, Vela. (See `docs/brand/crew-bible.md` for the locked cast.)

## 12. CANONICAL ASSET URLs (download character images only — Mansa + Vela are the ones you need)
Do not re-download/overwrite existing Zeno/Exodus/Solon/ship art.
```
Mansa  https://d8j0ntlcm91z4.cloudfront.net/user_3DsRdVomUX5bUfxpduRmQaHyWj5/hf_20260615_171919_c43e9d29-f4b7-46dc-bc5d-faeffb3e5b21.jpeg
Vela   https://d8j0ntlcm91z4.cloudfront.net/user_3DsRdVomUX5bUfxpduRmQaHyWj5/hf_20260615_172208_d613851a-da7e-4607-b315-f5ea3df394e2.jpeg
(Zeno/Exodus/Solon/Ship URLs available if missing from repo — reuse repo copies first.)
```
Pixar/Disney-style 3D chest-up portraits on deep navy; optimize to match existing crew images.

## 13. BUILD · VERIFY · COMMIT
Detect the package manager (pnpm/npm/yarn lockfile) and use it consistently: `install` (if needed) → `typecheck`/`tsc --noEmit` → `lint` → `build` (must pass clean) → `dev` smoke test.
**Smoke test:** homepage renders, **ship hero unchanged**; 5th frame shows Custom AI Installs as a core service with the Custom-Quote CTA; Meet the Crew = 5 cards incl. Mansa + Vela (images + correct roles); Who We Serve shows Custom AI Installs **in place of Politics**, sub-page renders with pricing model + Custom-Quote CTA → `/audit`; existing pricing tiers intact; no console errors; mobile + desktop.
```bash
git add -A
git commit -m "feat: full-stack positioning, Custom AI Installs in core services + Who-We-Serve (replaces Politics), crew → 5 agents (Mansa + Vela)"
git push -u origin feat/fullstack-installs-crew5
```
**Do NOT merge to main. Do NOT deploy.**

## 14. DEFINITION OF DONE
- [ ] Recon note; ship component identified + **left untouched**.
- [ ] Branch `feat/fullstack-installs-crew5` off the build branch.
- [ ] Homepage: evolved subhead; **Custom AI Installs added to the 5th-frame core services** (NOT a new section); pricing tiers preserved; Gold Map/`/audit` CTA intact.
- [ ] Our Story: voyage/crew + full-stack/custom-install evolution + Mansa rationale.
- [ ] Meet the Crew: 5 agents, correct roles, **Mansa + Vela added** with optimized images in `public/crew/`.
- [ ] Who We Serve: **Politics replaced by Custom AI Installs**; sub-page populated with the pricing model (big build up front + $250–500/mo + expenses) + **Request a Custom Quote → /audit**.
- [ ] **No new Gold Map form / no new `/api/gold-map`.**
- [ ] `memory/BRAND_ASSETS.md` (6 IDs + roles + usage); BRAIN.md pointer; **CLAUDE.md updated** (politics retired, roster Mansa/Vela).
- [ ] Cinzel confirmed live (Fraunces swap finished if pending).
- [ ] typecheck + lint + build green; smoke test passed (mobile + desktop).
- [ ] Committed logically; branch pushed; **not** merged/deployed.
- [ ] **0 Higgsfield credits used.**
- [ ] Summary report (§15).

## 15. FINAL SUMMARY REPORT (for Ayge)
Output: files changed (grouped: homepage / our story / crew / who-we-serve+installs / memory / assets / CLAUDE.md); branch + push status; what was skipped + why; placeholders/TODOs; exact commands to preview locally + to merge/deploy later; confirmation **ship untouched, 0 Higgsfield credits.**

## 16. IF BLOCKED
Missing asset → placeholder + `TODO`, never generate. Ambiguous structure → additive, smallest-diff, on-brand, leave a note, no broad refactor. Irreversible + non-repo → STOP + note. Build won't pass → fix forward if small; else isolate changes, note it, leave the branch clean + documented.

### APPENDIX — Brand quick-reference
- **Palette:** use repo theme tokens (purple / gold / cream / navy). Don't hardcode if tokens exist.
- **Fonts:** Cinzel (display, 600, ~0.08em, UPPERCASE) · Inter (body).
- **Voice:** premium, confident, nautical; never cheesy/salesy.
- **Logo-ship:** header/nav only.
- **Crew cast of record:** `docs/brand/crew-bible.md`.
