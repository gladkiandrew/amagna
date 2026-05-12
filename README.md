# Amagna AI

> **AI-powered growth systems for home services and real estate operators.**
> Domain: [amagna.co](https://amagna.co)
> Founder: Andrew Michael Gladki
> Stack: Next.js · TypeScript · Tailwind · Supabase · Cloudflare · Claude

---

## Table of contents

1. [What Amagna AI is](#what-amagna-ai-is)
2. [The name and what it means](#the-name-and-what-it-means)
3. [Founder context](#founder-context)
4. [The thesis](#the-thesis)
5. [Business model and pricing](#business-model-and-pricing)
6. [Service offerings](#service-offerings)
7. [The two niches](#the-two-niches)
8. [Ideal customer profiles](#ideal-customer-profiles)
9. [The AI agent fleet](#the-ai-agent-fleet)
10. [Referral and partner system](#referral-and-partner-system)
11. [Content engine and personal brand](#content-engine-and-personal-brand)
12. [Tech stack](#tech-stack)
13. [Repository structure](#repository-structure)
14. [Local development setup](#local-development-setup)
15. [Deployment](#deployment)
16. [Working with Claude Code](#working-with-claude-code)
17. [Roadmap](#roadmap)
18. [Contact](#contact)

---

## What Amagna AI is

Amagna AI is a productized, AI-native marketing and growth agency. We don't bill hours — we sell predictable, measurable outcomes (leads, listings, revenue) to operators who run real businesses in two niches: home services and residential real estate.

This repository is the operational backbone of the agency. It contains:

- The public marketing site at `amagna.co`
- Niche-specific landing pages and conversion funnels
- An AI agent fleet that handles outreach, content, reporting, and client operations
- Internal dashboards and admin tools
- Brand assets, SOPs, and documentation
- Client-facing onboarding flows

Everything related to running and scaling Amagna AI lives in this monorepo.

---

## The name and what it means

**Amagna** is built on the Latin root *magna* — "great." It runs through the deepest veins of Western thought and law:

- **Magna Carta** (1215) — the foundational charter of constitutional rights, the document that established trust between governed and governing
- **Magna Moralia** — Aristotle's "Great Ethics," one of his three works on living well
- **Magna Graecia** — "Great Greece," the colonies that brought philosophy west
- **Magnanimous** — from *magnus* + *animus* = "great soul," Aristotle's ideal character
- **Magnate** — a great person, a leader in industry

Hidden inside *Amagna* are the founder's initials: **A·M·G** — Andrew Michael Gladki.

The name claims a lineage. It says: we are not generic. We are built on principles that have governed serious institutions for two thousand years. Trust, excellence, magnitude, and order — applied to AI and growth.

---

## Founder context

**Andrew Michael Gladki.** Saginaw, Michigan. Entrepreneur, builder, future content creator.

### Background

- **Breaking the Fast** — Profitable consumer brand currently running Meta ad campaigns. The proof of concept for Amagna AI's playbook. Marketing infrastructure runs on Sapt at `app.sapt.ai`.
- **Stay Hybrid** — Earlier venture, parked but kept as an option for later.
- **Amagna AI** — The vehicle.

### Operating principle

The founder is a rookie developer leveling up fast. The agency is being built using Claude Code, Cursor, and Claude Max — every line of code in this repo is expected to be explainable in plain English. **Walk-through mode is the default.** Every commit, PR, and decision should be understandable to a non-developer reading it back in six months.

### What the founder is building toward

1. **Operator** — Profitable AI-native businesses generating real cash flow.
2. **Influencer** — A personal brand built around documenting the build, the wins, the lessons.
3. **Long-term political ambition** — Held in reserve. Not part of the GTM right now.

Everything in this repo serves arc 1 and 2 directly.

---

## The thesis

AI did not kill the agency model. It killed the agency model that runs on hours, headcount, and people. The agencies that win from 2026 onward compress execution cost toward zero and sell the result.

### The arbitrage

- Client pays $1,000-$2,500/month for a "full marketing team"
- Sapt handles platform-level fulfillment at roughly $119/client at scale (Agency Partner plan, 10 clients)
- Amagna AI's own agent fleet handles outreach, content variations, reporting, and client communication
- Net margin per client: 75%+
- Each new client makes the next one cheaper to acquire — the agents compound

### The moat

Compounding intelligence applied to a high-margin services business in two niches that desperately need leads, can afford retainers, and are underserved by current providers.

### Target state in 12-18 months

- 30-50 active clients across the two niches
- ~80% of outreach, content, and reporting automated
- Personal brand driving steady inbound
- Referral and partner system compounding new clients off existing ones
- A repeatable system that could be licensed or productized

---

## Business model and pricing

### Revenue streams

1. **Monthly retainers** — Core revenue. Productized tiers at $997 / $1,497 / $2,497.
2. **Setup and onboarding fees** — One-time $500-$2,000 per client.
3. **Ad spend management override** — 10% of ad spend on accounts spending $5K+/mo.
4. **Custom builds** — Bespoke websites, AI implementations, dashboards. $2K-$15K projects.
5. **Sapt referral commissions** — 20-30% recurring on clients we send directly to Sapt without managing them ourselves.
6. **Future: Content monetization** — Sponsorships, courses, equity deals once the personal brand is at scale.

### Productized pricing tiers

| Tier | Monthly | Positioning | Target client |
|---|---|---|---|
| **Foundation** | $997 | "Get found, get called." | Solo operators, single-location services |
| **Growth** | $1,497 | "Become the obvious choice in your market." | Established SMBs, 5-25 employees |
| **Authority** | $2,497 | "Build an empire." | Top players in their niche, multi-location |

All tiers run on Sapt's Agency Partner infrastructure. The Amagna AI differentiator is the agent layer wrapped around it — the things that make a client feel like they hired a full agency, not a subscription.

---

## Service offerings

### Productized services (the majority — built once, deployed per-client)

**Lead generation**
- Meta (Facebook + Instagram) ad campaigns tuned per niche
- Google Ads where the niche supports it
- Landing page funnels tied to each ad set
- Lead capture, qualification, and routing into client CRMs
- Automated SMS + email follow-up sequences through Sapt

**Content production**
- Social media calendar — 5-7 posts/week across IG, FB, LinkedIn
- AI-assisted copywriting locked to client voice via Sapt's memory layer
- Short-form video scripts and editing direction
- Posting and scheduling fully automated

**Reputation and reviews**
- Google Business Profile optimization and ongoing management
- Automated review requests post-transaction
- In-voice review responses
- Cross-platform reputation monitoring

**Local SEO**
- Keyword tracking and competitive analysis
- On-page execution and citation building
- AI search visibility (ChatGPT, Perplexity, Gemini)

**Email and SMS**
- List building and segmentation
- Broadcasts and nurture sequences
- 10DLC compliance and registration (critical post-2025)

**Reporting**
- Weekly automated reports delivered by an Amagna AI agent
- Monthly strategy calls (founder-led for Authority tier)
- Real-time client dashboard with unified KPIs

### Custom services (premium, project-priced)

- **Custom websites and funnels** — Next.js or Astro on Cloudflare Pages. $3K-$10K.
- **Custom AI implementations** — Chatbots, voice agents, intake automation, knowledge bases. $2.5K-$15K + maintenance.
- **Custom dashboards and integrations** — Internal ops tools, custom reporting, data warehousing. $2K-$8K.
- **Brand and positioning work** — Niche-specific positioning, voice docs, visual refresh. $1.5K-$5K.

### What we explicitly do NOT do

- Run sponsorships, influencer deals, or PR
- Build mobile apps
- Do podcast production
- Sell ad spend with no strategy attached
- Work with multiple competing clients in the same zip code (this is our **exclusivity guarantee** — a closer for home services and real estate)

---

## The two niches

We are intentionally narrow. Two niches, deep expertise in each, dedicated funnels and agent tuning per niche.

### 1. Home services (lead niche)

**Who:** HVAC, plumbing, roofing, electrical, landscaping, remodeling, pest control, cleaning, garage doors.

**Pain:** Inconsistent lead flow. Seasonal swings. Word-of-mouth dependence. Paying mediocre local agencies that do almost nothing.

**Pitch:** "Predictable, owned leads — not leads resold to your competitor."

**Avg retainer:** $1,200-$1,800/mo + separate ad spend.

### 2. Real estate

**Who:** Solo agents grossing $100K+ GCI, teams of 2-10, small brokerages, property managers, investors.

**Pain:** Listings come from staying top of mind. Top of mind takes daily content and outreach — the first thing they drop when they get busy. They are their brand and most are terrible at it.

**Pitch:** "Stay top of mind 24/7 without ever opening Canva. Your AI marketing team posts, follows up, and nurtures every day, in your voice."

**Avg retainer:** $1,500-$2,500/mo.

---

## Ideal customer profiles

### ICP 1 — Home services

**Name:** Mike, 38-55 years old
**Title:** Owner-operator
**Business:** HVAC, roofing, plumbing, electrical, landscaping
**Revenue:** $500K-$3M/year
**Team size:** 5-25 people, mostly in the field
**Location:** Mid-sized US metros, suburban + rural (Midwest is the sweet spot)

**What's true about Mike:**
- Started in the field, built a business, now wears every hat
- His son or daughter handles "the website" but it's broken
- Pays a local SEO guy $400/mo with no clue what he gets
- Phone rings inconsistently — busy in summer, dead in winter
- Drives a truck with the company logo and is proud of it
- Hates "marketing speak" and respects work ethic
- On Facebook, not Instagram. Definitely not LinkedIn.

**What he wants:**
- More calls — specifically for his most profitable services
- Less dependence on lead-resellers who screw him
- His name on Google when someone types "[service] near me"
- Respect from his competitors

**What he fears:**
- Wasting money on another marketer who promises and doesn't deliver
- Being too dependent on one source of leads
- His son taking over without the skills to run it

**Where he is:** Local business Facebook groups · BNI / Chamber of Commerce · ServiceTitan / Jobber user communities · Trade industry forums · Trade shows

**Trigger to buy:** A slow month. A competitor with more reviews. His daughter telling him "Dad, your website is from 2008."

---

### ICP 2 — Real estate

**Name:** Sarah, 32-50 years old
**Title:** Solo agent or small team lead (2-8 people)
**Business:** Residential brokerage
**GCI:** $250K-$1.5M/year
**Closings:** 25-80/year
**Location:** Growing suburban/exurban markets, second-tier cities

**What's true about Sarah:**
- Closes deals through her sphere — past clients, referrals, neighbors
- Knows content matters but can't stick with it past week 3
- Has tried Canva, Hootsuite, and a Philippines VA — none stuck
- Her brokerage's "marketing support" does nothing
- Wants to be the *neighborhood expert* — the obvious choice in 3 zip codes

**What she wants:**
- More listings (not buyers — listings are gold)
- Stay top of mind with her sphere without manually texting 400 people
- Look like a pro online without becoming a full-time influencer
- Stop competing on price

**What she fears:**
- The market turning and her pipeline going dry
- Looking cringe on social media
- Investing in marketing that doesn't translate to closings

**Where she is:** Instagram (heavy) · Facebook groups for agents · Local moms' Facebook groups · KW / EXP / Compass internal communities · Real estate podcasts (Tom Ferry, Ryan Serhant)

**Trigger to buy:** End of a hot quarter when she has cash. A listing lost to a competitor with a slicker brand. Brokerage announcing "tech support" cuts.

---

## The AI agent fleet

The differentiator. Sapt handles platform-level fulfillment. Amagna AI's own agents handle everything around the edges — outreach, content variation, reporting, ops — so each client feels like they hired a full team.

### Agents to build (Phase 4)

**Outreach agent**
- Scrapes public business directories (Google Maps, Yelp, Zillow)
- Enriches leads (owner name, email, phone, social profiles)
- Cold outreach via email, LinkedIn DM, Instagram DM
- Multi-touch warming sequences over weeks
- Books calls directly onto the founder's calendar
- Learns continuously from what converts in each niche

**Content agent**
- Generates niche-specific content variations daily
- Drafts ad copy, social posts, blog posts, broadcasts
- Pulls from Sapt's per-client memory so output stays on-brand
- Also feeds the founder's personal brand from agency events

**Reporting agent**
- Pulls performance data from Meta, Google, Sapt, GBP
- Writes weekly client reports in plain English
- Flags issues and opportunities before client calls
- Generates narrated Loom-style report videos where possible

**Operations agent**
- New-client onboarding (asset collection, account setup)
- Internal task routing and reminders
- Document and SOP management
- Handles standard client requests

**Sales agent**
- Qualifies inbound leads from the website and ads
- Books calls onto the founder's calendar
- Sends pre-call materials and confirmations
- Handles ghost follow-up if calls are missed

All agents will be coordinated through a central orchestration layer — likely n8n or a custom Cloudflare Worker setup, with Claude (via API) as the primary reasoning engine. State persists in Supabase.

---

## Referral and partner system

### Client referral program

- Existing clients get 20% off their next month for each successful referral, stackable up to 100% off
- Free month at 5 referrals; ongoing service credit beyond that
- Two-sided incentive: referred clients get a discounted setup fee
- Tracked through unique referral codes tied to each client account

### Agency partners

- External advisors, consultants, ops people send clients
- 15-20% recurring commission for the lifetime of the client
- Co-branded pitch materials available on request
- Quarterly partner check-ins
- Tracked through partner dashboard inside the client portal

### Sapt partnership

Sapt runs a partner program with 20-30% recurring commissions. Amagna AI participates from both sides:

- We refer overflow leads or out-of-niche prospects directly to Sapt and earn the commission
- We use Sapt's Agency Partner plan as the fulfillment backbone for managed clients

These tracks need to be tracked separately so attribution is clean for tax and partner payouts.

---

## Content engine and personal brand

The founder's personal brand isn't a side project. It's a strategic lead source and the long-term path to influencer positioning.

### Channels

- **Instagram + Facebook** — Build-in-public content, agency wins, behind-the-scenes
- **LinkedIn** — Operator-focused content, agency case studies, hot takes on AI in marketing
- **X / Twitter** — Quick takes, deal flow, real-time reactions
- **YouTube (long-form)** — Monthly recaps, tutorials, founder interviews
- **Newsletter** — Weekly drop on AI, marketing, and the build journey

### Content themes

1. **Build-in-public** — The agency itself, weekly numbers, lessons, mistakes
2. **AI marketing tactics** — What's working, what's not, screenshots, frameworks
3. **Niche-specific plays** — Tactical content for home services and real estate (doubles as lead magnet)
4. **Founder commentary** — Business, culture, operator mindset

### Content infrastructure

- Content agent generates first drafts daily
- Founder reviews, edits, records voice/video as needed
- Sapt schedules and posts across channels
- Performance tracked back into the content agent's learning loop

---

## Tech stack

### Hosting and infrastructure

- **Cloudflare Pages** — Static site hosting, global CDN, auto-deploys from GitHub `main`
- **Cloudflare Workers** — Serverless backend logic, agent orchestration, API endpoints
- **Cloudflare R2** — Object storage for assets, recordings, exports
- **Cloudflare DNS** — DNS management for `amagna.co` and all subdomains
- **Cloudflare Email Routing** — Free inbound email forwarding for andrew@amagna.co
- **Namecheap** — Domain registrar (amagna.co)
- **GitHub** — Source of truth for all code (org: `gladkiandrew`, repo: `amagna`)

### Application stack

- **Next.js 14+** — Frontend framework (App Router) for marketing site and funnels
- **TypeScript** — All application code
- **Tailwind CSS** — Styling
- **shadcn/ui** — Component library for consistent UI
- **Supabase** — Postgres database, auth, storage, edge functions. Used for the client portal, agent state, and internal dashboards.

### AI and agents

- **Claude (Anthropic API)** — Primary reasoning model for all agents
- **Claude Code** — Daily build and ops interface in the terminal
- **Claude Max plan** — Subscription tier powering all agent work
- **Sapt platform** — Client-facing marketing execution (ads, content, reviews, SEO, email, SMS)
- **n8n or custom Workers** — Agent orchestration (TBD in Phase 4)

### Editor and tooling

- **Cursor** — Primary editor (VS Code-based, AI-integrated)
- **Claude Code extension** — Wires Claude directly into Cursor's panel and terminal
- **Git + GitHub CLI** — Version control workflows

---

## Repository structure

```
amagna/
├── README.md                  # This file
├── CLAUDE.md                  # Project memory for Claude Code (always read first)
├── .env.example               # Template for environment variables (never commit .env.local)
├── package.json               # Root workspace config (npm workspaces or Turborepo)
├── apps/
│   ├── marketing/             # amagna.co — main marketing site
│   ├── funnel-home/           # home.amagna.co — Home services landing + funnel
│   ├── funnel-realestate/     # realestate.amagna.co — Real estate landing + funnel
│   └── client-portal/         # app.amagna.co — Client-facing dashboard (Supabase auth)
├── agents/
│   ├── outreach/              # Outreach agent service
│   ├── content/               # Content agent service
│   ├── reporting/             # Reporting agent service
│   ├── operations/            # Operations agent service
│   └── sales/                 # Sales / lead qualification agent
├── packages/
│   ├── shared-ui/             # Tailwind config, components, design tokens
│   ├── sapt-client/           # Wrapper around Sapt API/MCP
│   ├── supabase-client/       # Shared Supabase setup
│   └── analytics/             # Tracking, attribution, event schemas
├── infra/
│   ├── cloudflare/            # Worker scripts, Pages config
│   └── supabase/              # Schema migrations, edge functions
├── docs/
│   ├── sops/                  # Standard operating procedures
│   ├── playbooks/             # Per-niche playbooks
│   ├── brand/                 # Brand voice, assets, guidelines
│   └── walkthroughs/          # Step-by-step build guides (rookie-friendly)
└── scripts/                   # Utility scripts (deploys, data jobs, etc.)
```

Not everything exists yet. The structure is the destination. The roadmap below describes the build order.

---

## Local development setup

### Prerequisites

- **Node.js 20+** — Install via `brew install node` on Mac
- **Git** — Already on Mac
- **GitHub account** — username `gladkiandrew`
- **Cloudflare account** — connected to `amagna.co`
- **Supabase account** — project created under the `amagna` org
- **Claude Code installed** — see walkthrough below
- **Cursor installed** — version 1.98+
- **Claude Max subscription** — active

### First-time setup

```bash
git clone https://github.com/gladkiandrew/amagna
cd amagna
npm install
```

Create a `.env.local` at the root (never commit this):

```bash
ANTHROPIC_API_KEY=your_key_here
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
CLOUDFLARE_API_TOKEN=your_cloudflare_token
SAPT_API_KEY=your_sapt_key
```

Run the marketing site locally:

```bash
cd apps/marketing
npm run dev
```

Site comes up at `http://localhost:3000`.

---

## Deployment

### Marketing site and funnels

- Pushed to `main` on GitHub → Cloudflare Pages auto-deploys
- Each app in `apps/` is its own Cloudflare Pages project with its own subdomain:
 - `amagna.co` → marketing site
 - `home.amagna.co` → home services funnel
 - `realestate.amagna.co` → real estate funnel
 - `app.amagna.co` → client portal

### Agents and backend

- Cloudflare Workers deploy via `wrangler deploy` from each agent directory
- Supabase migrations run via `supabase db push` from `infra/supabase`

### Branch strategy

- `main` → production, auto-deploys
- `staging` → preview environment, auto-deploys to staging subdomains
- Feature branches → local development; PRs into `staging` first, then `main`

---

## Working with Claude Code

This is the rookie-friendly walkthrough. Every step is copy-paste-runnable.

### One-time setup (already complete)

Claude Code is installed at `~/.local/bin/claude`. Authentication is active via Anthropic Max subscription.

### Daily workflow

1. Open the `amagna` repo in Cursor
2. Open the integrated terminal (`Ctrl+\``)
3. Run `claude` to launch Claude Code in the repo
4. Claude Code reads `CLAUDE.md` at the project root automatically — this is the project memory file
5. Describe what you want in plain English. Examples:
 - "Build the home services landing page following the spec in `docs/playbooks/home-services.md`"
 - "Add an outreach agent that scrapes Google Maps for HVAC companies in Saginaw County"
 - "Refactor the contact form to write submissions into Supabase"
6. Review the diffs before accepting. Always read the diff.

### Rules of engagement with Claude Code

- Walkthrough mode is the default — every PR should include explanatory comments and a summary a non-developer could read
- Never accept a change that breaks `npm run dev` or the build
- Commit messages in the imperative — "Add home services landing page" not "Added a landing page"
- One feature per branch, one concern per PR
- When unsure, ask Claude to explain before coding

---

## Roadmap

### Phase 1 — Foundation (current)
- [x] Domain `amagna.co` purchased on Namecheap
- [x] DNS pointed at Cloudflare
- [x] Cloudflare Email Routing live (`andrew@amagna.co` → personal Gmail)
- [x] Repo created at `github.com/gladkiandrew/amagna`
- [x] Cursor + Claude Code wired up
- [x] README and CLAUDE.md in place
- [ ] Supabase project provisioned
- [ ] Cloudflare Pages connected to repo

### Phase 2 — Marketing site
- [ ] Scaffold `apps/marketing` with Next.js + Tailwind + TypeScript
- [ ] Build out: Home, Services, How it Works, Results, Book a Call, About
- [ ] Brand identity locked in (colors, type, voice)
- [ ] Deploy to `amagna.co` via Cloudflare Pages

### Phase 3 — Funnels
- [ ] `apps/funnel-home` live at `home.amagna.co`
- [ ] `apps/funnel-realestate` live at `realestate.amagna.co`
- [ ] First Meta ad campaign live to home services funnel

### Phase 4 — Agents
- [ ] Outreach agent v1 — Saginaw-area home services
- [ ] Content agent v1 — feeds personal brand + clients
- [ ] Reporting agent v1 — weekly client reports
- [ ] Operations agent v1 — onboarding automation
- [ ] Sales agent v1 — inbound qualification

### Phase 5 — Client portal and ops
- [ ] `apps/client-portal` with Supabase auth
- [ ] Per-client dashboards
- [ ] Referral tracking system live
- [ ] Partner program live

### Phase 6 — Scale
- [ ] 10 paying clients
- [ ] Personal brand at 10K combined followers
- [ ] First custom build sold ($5K+)
- [ ] 25 paying clients
- [ ] 50 paying clients

---

## Contact

**Andrew Michael Gladki**
Founder, Amagna AI
Saginaw, Michigan

- Email: andrew@amagna.co
- GitHub: [@gladkiandrew](https://github.com/gladkiandrew)
- Website: [amagna.co](https://amagna.co)

---

*This README is a living document. Update it whenever a major decision changes. The codebase serves the playbook; the playbook serves the founder.*
