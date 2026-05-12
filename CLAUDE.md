# CLAUDE.md — Project Memory for Claude Code

> This file is read by Claude Code at the start of every session. It is the operating manual for working in this repo. Keep it accurate. Update it when major decisions change.

---

## Who you are working with

**Andrew Michael Gladki.** Founder, Amagna AI. Saginaw, Michigan.

Andrew is a **rookie developer leveling up fast**. Treat every interaction as a teaching moment as well as a build moment. Explain what you are doing, why you are doing it, and what to watch out for. Default to walkthrough mode. Show diffs. Narrate decisions. Suggest verification commands he can run to confirm things worked.

He uses Claude Max, Cursor, and Claude Code. This is the AI of record for the entire agency.

---

## What this repo is

The operational backbone of Amagna AI Agency. See `README.md` for the full strategic context.

In short: a productized AI marketing agency targeting **home services** (lead niche) and **real estate**, with fulfillment partnered through Sapt (`sapt.ai`) and a fleet of custom AI agents wrapped around it.

**Note:** Politics is on the long-term roadmap but is NOT part of the current go-to-market. Do not generate political-niche assets unless explicitly asked.

---

## Active priorities (update as the project evolves)

Current phase: **Phase 1 → Phase 2 transition**

1. Confirm Cloudflare Pages connected to this repo
2. Provision Supabase project
3. Scaffold `apps/marketing` with Next.js 14 + Tailwind + TypeScript
4. Build out marketing site core pages
5. Deploy to `amagna.co`

After that: build home services funnel first.

---

## Stack and conventions

### Languages and frameworks

- **TypeScript** for everything — no plain JavaScript
- **Next.js 14+** (App Router) for the marketing site and funnels
- **Tailwind CSS** for all styling — no CSS modules, no styled-components
- **shadcn/ui** for component primitives where useful
- **Supabase** for database, auth, storage, edge functions
- **Cloudflare Pages** for static hosting
- **Cloudflare Workers** for serverless backend logic and agent orchestration
- **Anthropic API (Claude)** as the LLM for all agent work

### Code style

- Two-space indentation
- Single quotes for strings, double for JSX attributes
- Functional React components only — no class components
- Named exports preferred over default exports
- Filenames: `kebab-case.tsx` for components, `camelCase.ts` for utilities
- Type everything — avoid `any`, use `unknown` if truly unknown
- No barrel files (`index.ts` re-exports) unless they meaningfully simplify imports

### Commit and PR conventions

- Commit messages in the imperative: "Add home services hero section" not "Added hero section"
- One concern per commit, one feature per PR
- Every PR description includes a plain-English summary of what changed and why
- Never push directly to `main` — branch off `main`, PR into `staging`, then into `main`

### Folder structure (target)

```
amagna/
├── apps/         — Deployable applications (marketing, funnels, portal)
├── agents/       — AI agent services (outreach, content, reporting, ops, sales)
├── packages/     — Shared internal libraries (UI, clients, analytics)
├── infra/        — Cloudflare and Supabase infrastructure
├── docs/         — SOPs, playbooks, brand, walkthroughs
└── scripts/      — Utility and ops scripts
```

The repo currently has only the root `README.md` and this `CLAUDE.md`. The structure above is the destination — build into it incrementally.

---

## How to behave in this codebase

### Always do

- Read `CLAUDE.md` and `README.md` first when starting a session
- Read the relevant playbook in `docs/playbooks/` before building niche-specific work
- Explain your plan before making large changes — show what you are about to do
- Use the smallest possible change to achieve the goal
- Suggest the exact terminal command to verify your work after changes
- Treat secrets as sacred — never commit `.env.local` or any key; use `process.env.X` and reference `.env.example`
- Default to accessibility (semantic HTML, keyboard nav, alt text)

### Never do

- Don't refactor unrelated code while making a focused change
- Don't introduce new dependencies without flagging it explicitly and explaining why
- Don't generate content that misrepresents real people or fabricates testimonials
- Don't write code Andrew cannot read — if it requires explanation he doesn't have yet, teach first, then code
- Don't commit broken builds — always verify `npm run build` passes before completing a task
- Don't generate political-niche content (out of GTM scope right now)

---

## Service offerings — what we sell

Productized agency, three tiers:

- **Foundation** ($997/mo) — Sapt Growth + 1 niche funnel + base outreach
- **Growth** ($1,497/mo) — Multi-channel content + dedicated agents + weekly reports
- **Authority** ($2,497/mo) — Custom builds + reputation + premium creative + strategy calls

Custom services priced separately ($2K-$15K project work).

---

## The two niches

When building niche-specific work, use the matching playbook in `docs/playbooks/` (to be created):

1. **Home services** — HVAC, plumbing, roofing, etc. Pitch: predictable owned leads.
2. **Real estate** — Solo agents, teams, brokers. Pitch: stay top of mind 24/7.

Each niche has its own funnel, ad creative, voice, and agent tuning. Never mix niche assets.

---

## Ideal customer profiles (summarized)

**ICP 1 — Mike, home services owner.** 38-55, owner-operator, $500K-$3M revenue, 5-25 employees, mid-sized Midwest metro. Facebook user, hates marketing speak, wants more calls and respect.

**ICP 2 — Sarah, residential real estate agent.** 32-50, solo or small team, $250K-$1.5M GCI, 25-80 closings/year, suburban growth markets. Heavy Instagram user, wants listings (not buyers), wants to look pro without being cringe.

See `README.md` for full ICP detail.

---

## The agent fleet (Phase 4 — not yet started)

Agents run on Cloudflare Workers (or n8n — TBD) with Claude as the reasoning engine. Each agent has:

- A clear single responsibility
- A persistent state store in Supabase
- A logging table for observability
- A "human in the loop" approval step for anything sent to real people

Agents to build:
- **Outreach** — finds and warms leads
- **Content** — generates daily content variations
- **Reporting** — weekly client reports
- **Operations** — onboarding and internal task routing
- **Sales** — qualifies inbound

---

## Sapt integration

Sapt is the fulfillment platform. We integrate via:

- The Sapt API/MCP for programmatic actions
- The Sapt dashboard for hands-on client management
- Sapt's per-client memory layer to keep voice and context consistent

Sapt contact: Ben Meyer (co-founder, personal friend of the founder).

When working on Sapt integration code, see `packages/sapt-client/` (to be created) and docs at `docs.sapt.ai`.

---

## Referral and partner system

Two referral tracks tracked separately:

- **Client referrals** — Existing clients refer new clients. 20% off per referral, stackable.
- **Agency partners** — External advisors send clients. 15-20% recurring commission.

Implementation lives in `apps/client-portal` once built.

Separately, Amagna AI is also a Sapt partner — overflow leads we don't take get referred to Sapt and we earn 20-30% recurring there.

---

## Personal brand integration

The content agent feeds both client output and Andrew's personal brand. Personal brand channels:

- Instagram / Facebook (build-in-public)
- LinkedIn (operator content)
- X / Twitter (quick takes)
- YouTube (long-form recaps)
- Newsletter (weekly drops)

When generating personal-brand content, voice is first-person Andrew. Themes: build-in-public, AI marketing tactics, niche-specific plays, founder commentary.

---

## Environment and credentials

- Domain: `amagna.co` (registered at Namecheap, DNS managed by Cloudflare)
- Email: `andrew@amagna.co` (Cloudflare Email Routing → personal Gmail)
- GitHub org: `gladkiandrew`
- GitHub repo: `amagna`
- Cloudflare account active
- Supabase: project to be provisioned
- Anthropic API: via Claude Max subscription

All credentials live in `.env.local` — never commit.

---

## When in doubt

- Check `README.md` for broader strategic context
- Check `docs/playbooks/` for niche-specific specs (once created)
- Check `docs/sops/` for operational procedures (once created)
- Ask Andrew — he'd rather be asked than have you guess

---

*This file lives at the project root. Edit whenever a major decision changes. It is the single source of truth for how Claude Code operates inside Amagna AI.*
