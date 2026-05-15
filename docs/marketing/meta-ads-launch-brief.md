# Meta Ads — Phase 1.5 Launch Brief

> **Purpose:** Drive qualified visitors to `https://amagna.co/audit` and close 2-3 paying clients at $1,497/mo before May 18.
> **You launch this from Meta Ads Manager.** Everything below is paste-ready.
> **Last updated:** 2026-05-15

---

## Targeting — paste into Ads Manager

| Field | Value |
|---|---|
| Campaign objective | **Leads** (form conversion on landing page) |
| Conversion location | Website |
| Conversion event | `Lead` (fires on `/audit` form submit — see "Tracking" below) |
| Geo | **Michigan** (state-wide; tighten to Saginaw + Grand Rapids + Detroit metros if CPL > $40) |
| Age | **35–55** |
| Gender | All |
| Detailed targeting (any) | Small business owners · Trades (contractor, HVAC, plumber, roofer, electrician) · Real estate brokers · Real estate agents · Business growth · Marketing for small business · ServiceTitan · Jobber · Zillow Premier Agent |
| Detailed targeting expansion | **On** (Meta widens beyond the stack if it finds cheaper conversions) |
| Placements | Advantage+ placements (Meta optimizes) |
| Daily budget | **$30 / day** (total across the campaign) |
| Bid strategy | Highest volume |
| Schedule | Run continuously; revisit after 72h of data |
| Landing page | `https://amagna.co/audit` (every ad routes here, no exceptions) |

### Tracking — must be done before launching

1. **Install the Meta pixel** on amagna.co — add the pixel snippet to `apps/marketing/src/app/layout.tsx` once you have the pixel ID. (Open a follow-up task; small change.)
2. **Define a `Lead` event** in Events Manager that fires on the `/audit` form-submit success page (the widget shows the audit inline — Meta needs us to fire a custom event from the audit-widget on success).
3. UTM tags on every ad URL: `?utm_source=meta&utm_medium=paid&utm_campaign=phase15&utm_content={ad-name}` so attribution shows up cleanly in Supabase `widget_submissions`.

---

## Four ad creatives — concepts + Stitch prompts

Brand palette (do not deviate): **royal purple `#5D2E8C`** background, **antique gold `#C9A961`** highlights, **cream `#FAF8F3`** off-white, **white** text on dark, ink `#1A1A1A` on light. All ads 1200 × 628.

Stitch prompts are written so they can be pasted directly when the Stitch MCP is active.

### Creative 1 — Home services pain point

- **Direction:** A clean, almost editorial image. Big purple wall of color on the left with a stark gold headline; on the right, a stylized illustration of a silent landline phone on a worn workbench, gold light just barely on the receiver. No people. No stock-photo "happy contractor."
- **Headline on creative:** "Your phone hasn't rang the way it should."
- **Stitch prompt:** "1200×628 Meta ad creative. Left two-thirds: solid royal purple #5D2E8C with bold white sans-serif headline 'Your phone hasn't rang the way it should.' (2 lines, ~64px). Below it, a small antique gold underline. Right one-third: minimalist editorial illustration of a quiet landline desk phone on a wooden workbench, soft gold rim light, no people. Bottom right corner: small white Amagna AI wordmark. Style: high contrast, modern, operator-respectful, not stock."

### Creative 2 — Real estate pain point

- **Direction:** A simple split. Left: "Your competitor" in muted gray with three small "SOLD" signs. Right: "You" in royal purple with one. Gold divider. The image is a visual punch — no faces, no stock houses.
- **Headline on creative:** "Three listings to your one. Here's why."
- **Stitch prompt:** "1200×628 Meta ad creative. Cream #FAF8F3 background. Center-aligned headline in royal purple #5D2E8C: 'Three listings to your one.' (huge, ~72px, single line). Below in smaller ink-gray: 'Here's why.' Three small 'SOLD' yard-sign icons in antique gold on the left, one matching sign in slightly lower opacity on the right, separated by a thin vertical gold divider. Bottom right corner: small purple Amagna AI wordmark. Style: editorial, restrained, premium."

### Creative 3 — Outcome focus

- **Direction:** Pure typographic ad. The hero headline carries the whole thing. Purple background, gold accent on the period after "rest."
- **Headline on creative:** "More calls. More listings. AI that handles the rest."
- **Stitch prompt:** "1200×628 Meta ad creative. Solid royal purple #5D2E8C background. Centered, multi-line bold white headline 'More calls. More listings. AI that handles the rest.' (3 lines, ~62px). The final period on 'rest.' is antique gold #C9A961 and slightly larger. Below the headline, a thin antique gold underline (60px wide, centered). Top-right corner: small white Amagna AI wordmark. Style: clean typographic poster, no imagery."

### Creative 4 — Founder POV (build-in-public)

- **Direction:** Slight tilt off the corporate look. A photo or photo-style illustration of a workspace (desk, terminal, notepad) shot from above. Headline in handwritten-feeling font over the top.
- **Headline on creative:** "I built Amagna because agencies were overcharging and under-delivering."
- **Stitch prompt:** "1200×628 Meta ad creative. Top-down editorial shot of a clean wooden desk with a laptop showing a simple dashboard in purple-gold, a small leather notebook with a fountain pen, a coffee cup. Warm natural light. Overlay a bold white serif headline near the top: 'I built Amagna because agencies were overcharging and under-delivering.' (3 lines, ~52px). Small antique gold signature 'Andrew, founder' bottom right under a thin gold line. Bottom left: small white Amagna AI wordmark. Style: founder-voice, build-in-public, considered."

---

## Twelve ad copy variations (3 per creative)

Each variation is paste-ready into the Ads Manager creative editor.
- **Primary text** = the long copy above the image
- **Headline** = the bold line under the image (40 chars max for safety)
- **Description** = the small grey line under the headline (30 chars max for safety)

### Creative 1 — Home services pain

**1A**
- Primary: "Your phone goes feast-or-famine and you can't trace why. Mike's HVAC ran the same playbook and we tightened it in two weeks. Free 60-second audit shows where you stand and a 30-day plan to fix it."
- Headline: "End the feast-or-famine cycle"
- Description: "Free 60-second audit"

**1B**
- Primary: "If you are paying a 'local SEO guy' $400/mo and your phone is still inconsistent, you are not crazy. We will audit your Google Business Profile, your ranking, and your funnel in 60 seconds. No card needed."
- Headline: "Stop paying for vague SEO"
- Description: "Real audit · no card"

**1C**
- Primary: "Lead resellers sell the same call to three of your competitors. We help you own the lead. Get a free 60-second audit + 30-day plan tailored to your service area."
- Headline: "Own your leads, not rent them"
- Description: "Free audit + 30-day plan"

### Creative 2 — Real estate pain

**2A**
- Primary: "Listings come from staying top of mind — and staying top of mind dies the week you get busy. We run the daily content, sphere nurture, and listing-intent ads so you don't drop it. Free 60-second audit."
- Headline: "More listings, less Canva"
- Description: "Free 60-second audit"

**2B**
- Primary: "Your competitor isn't a better agent. They have a better marketing machine. Get a free audit of your online presence and a 30-day plan to close the gap."
- Headline: "Close the gap on listings"
- Description: "Free audit · no card"

**2C**
- Primary: "Solo agents, teams, and small brokerages — we keep your sphere warm and your listings coming. Daily content in your voice, nurture on autopilot, and a weekly plain-English report. See where you stand."
- Headline: "Stay top of mind 24/7"
- Description: "Free 60-second audit"

### Creative 3 — Outcome focus

**3A**
- Primary: "Home services owners want more calls. Real estate agents want more listings. That is what Amagna does. The AI handles the daily work — content, follow-up, ranking. You handle the work that matters. Free audit, 60 seconds."
- Headline: "More calls. More listings."
- Description: "Built-for-you audit"

**3B**
- Primary: "Productized marketing for operators. One retainer at $1,497/mo, month to month, exclusive to one client per zip code. Get a free audit of where you stand right now."
- Headline: "One retainer. Real results."
- Description: "Free 60-second audit"

**3C**
- Primary: "We do not sell innovative tech. We fix your problem — more phone calls or more listings, depending on who you are. Get a custom 30-day plan in 60 seconds."
- Headline: "Fix the problem, not the tech"
- Description: "60-second free audit"

### Creative 4 — Founder POV

**4A**
- Primary: "I started Amagna because every operator I talked to was paying an agency that did almost nothing. We built the system I wish someone had built for me — and we show our work every week. See where you stand."
- Headline: "Built by an operator"
- Description: "Free 60-second audit"

**4B**
- Primary: "I'm Andrew. I run profitable Meta ads on my own consumer brand and I built Amagna so home services owners and real estate agents could run the same playbook without the agency markup. Free audit, 60 seconds, no card."
- Headline: "The playbook I run myself"
- Description: "Free 60-second audit"

**4C**
- Primary: "Most agencies sell you hours. We sell you the result — more calls or more listings — and earn the next month every month. If we are not delivering, you shouldn't be paying us. Start with a free audit."
- Headline: "Pay for results, not hours"
- Description: "60-second free audit"

---

## Launch checklist

- [ ] Install Meta pixel on amagna.co (pixel ID needed)
- [ ] Define `Lead` event on `/audit` form-submit success
- [ ] Generate the 4 creatives via the Stitch MCP (prompts above) and export 1200×628 PNGs
- [ ] Create campaign in Ads Manager: **Phase 1.5 — Sales Sprint**
- [ ] Create 4 ad sets (one per creative); paste copy variations as 3 ads per set
- [ ] Confirm landing page URL `https://amagna.co/audit` with UTMs on every ad
- [ ] Set `$30/day` campaign budget
- [ ] Launch, then check after 24h: CTR > 1%, CPL < $40 are healthy v1 targets
- [ ] Day 3: kill the weakest copy variant per ad set; double down on the strongest

## Stop-loss

If after 72 hours of spend the campaign has zero qualified `/audit` submissions, pause and re-scope creative direction before spending more.
