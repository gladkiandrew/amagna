# Active Tasks — routed work

> Written by **Zeno** during each `/zeno` council. The routed action list: each next action assigned to
> a specific agent OR to Andrew, with the expected deliverable and where to log it. Append a dated entry
> each council; never overwrite history. Mirrored to Sapt by Mansa.

<!-- First routed entry below. -->

---

## 2026-06-28 — Council #1 routing

### → Andrew (human-only; nothing outward ships without you)
1. **Re-authorize the "claude.ai Sapt MCP" connector**, then unpublish the 2 political blog posts (set status → `draft`, do not delete) and redeploy (`cd apps/marketing && npm run cf:deploy`). Verify both `/blog/...` URLs return 404. *Deliverable: posts 404 live. — or hand this to next session and it runs once the connector is re-authed.*
2. **`git push origin main`** so GitHub matches the deployed code. *Deliverable: `main` pushed.*
3. **Set a valid CMS-scoped `SAPT_API_KEY`** on the Worker so Field Notes/`/blog` pull real posts instead of fallbacks. *Deliverable: key set, Field Notes live.*
4. **Send real testimonials + agency social URLs** (`SOCIAL_LINKS` in `lib/site.ts`). *No fabrication — placeholder slots stay until you provide quotes.*
5. **Confirm pricing direction** (tiers were rebuilt but content deferred to you) and **review the 5 niche funnel drafts** for claim accuracy.

### → Exodus (content engine) — *awaiting Andrew's go*
6. **Stand up the content pipeline:** draft the first batch of Field Notes posts (non-political, on-brand per CLAUDE.md) and the homepage "See the output" video slots 2–3. Log each item to `docs/memory/content-pipeline.md` (status: idea/drafting/ready).

### → Vela (distribution) — *blocked by #6*
7. Once Exodus marks items `ready`, schedule/distribute and record channel + post status in `content-pipeline.md`. Nothing posts to a live channel without Andrew's approval.

### → Solon (outreach/retention)
8. **Initialize the pipeline:** confirm Breaking the Fast next-touch and stage (don't send) a first outreach batch for Andrew's approval. Log to `outreach-log.md`; keep `client-roster.md` current.

### → Mansa (memory health)
9. **First audit pass** of `docs/memory/`: flag stale entries, contradictions, and security items; mirror the brain to Sapt. Log to `memory-health.md`.

> Routing rule: no agent acts without Zeno's direction, and as subagents they can't self-spawn — Andrew/main session dispatches them. Anything reaching a real person or budget needs Andrew's approval first.

---

## 2026-07-07 — Housekeeping update (Cowork session)

Council #1 items 1–9 above remain OPEN (crew memory files still mostly empty). New:

10. **→ Andrew + Claude:** spec and create the **Zeno council briefing** scheduled task — cadence, inputs (all `docs/memory/` files), output (operator brief appended to `fleet-status.md` + routed actions here). Blocked only by Andrew finishing his edit of `exodus-content-agent`.
11. **→ Andrew (file org, low priority):** `brain/Crew/` vault pages are stale (see `brain/Crew/README.md`); update or fold into `.claude/agents/amagna/` docs during the file reorg.

---

## 2026-07-07 — Daily routing (Zeno)

Item 10 above is DONE (`zeno-daily-briefing` live, daily 7:01 AM ET — this entry is its first run). Council #1 items 1–9 + 11 remain open.

- **→ Exodus:** log today's home-services IG/FB posts to `content-pipeline.md` (currently unlogged); add a LinkedIn concept to tomorrow's menu — 0 of 2 LinkedIn posts scheduled this week.
- **→ Vela:** verify today's 1:00 PM ET IG post actually publishes (first live send; `list_posts` check, no blind retry). Confirm FB Jul 8 8:19 AM slot.
- **→ Solon:** still nothing in `outreach-log.md` (16 days) — stage first outreach batch for Andrew's approval; confirm Breaking the Fast next-touch in `client-roster.md`.
- **→ Mansa:** first `memory-health.md` audit still unrun; 4 memory files ≥16 days stale.
- **→ Lumen:** idle; 3 teaser videos delivered Jun 30 sit unused — propose distribution cut (IG Reel) once Vela confirms image publishing works.
- **→ Andrew:** (1) reconnect Gmail connector (Zeno can't scan email until then); (2) Council #1 items 1–5 (political posts, `git push main`, `SAPT_API_KEY`, testimonials, pricing confirm); (3) campaign-launch state says first $750 Tri-Cities ad was targeted ~Jun 29 — 8 days past, confirm go/no-go.

---

## 2026-07-08 — Daily routing (Zeno)

Task-Board (vault 02-Inbox) triaged this morning — owners assigned there. Council #1 items 1–9 + 11 remain open.

- **→ Exodus:** put a LinkedIn concept in today's 11:33 menu (0/2 this week); log Jul 7–8 IG/FB posts to `content-pipeline.md` (still unlogged).
- **→ Vela:** publish verification blocked — Buffer `list_posts` API erroring server-side; retry tomorrow, no blind actions. If still broken, Andrew checks the dashboard.
- **→ Solon:** outreach-log still empty (17 days) — stage first outreach batch for Andrew's approval; confirm BTF next-touch.
- **→ Mansa:** first memory-health audit still unrun; 4 repo memory files 17 days stale.
- **→ Andrew (P1s):** (1) reconnect Gmail (2nd day blind); (2) manually verify Jul 7 IG + Jul 8 FB posts published in Buffer dashboard; (3) Tri-Cities ad go/no-go (9 days past target); (4) Council #1 items 1–5.

