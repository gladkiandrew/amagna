# Autonomous Run Plan 8 — Pricing tune, onboarding, tool-connectivity, Snapchat (likely the last build run)

> amagna.co is LIVE — every deploy is production. **Deploy after each priority
> and verify live; never leave the site broken.** Work IN ORDER, no questions,
> log in `docs/autonomous-run/REPORT-8.md`. CLAUDE.md was just updated (new
> pricing model + Snapchat + onboarding + tool-connectivity) — re-read it.

## Guardrails

No `git push`. Stay on `auto/2026-06-04-website-build`. Do NOT touch Stripe
integration code or price IDs (direct purchase stays off; CTAs route to the
Gold Map). Zero new npm deps. Never read `.env*` (except sourced deploy).
Build green before every commit. No fabricated claims; no guarantee language;
no exclusivity. Never commit `Pics for Amagna/`, `Vids for Amagna/`, loose
`hf_*.mp4`, `.DS_Store`, `.agents/`, `.claude/*`, `.env*`.

## Phase 0 — Checkpoint, build green baseline.

---

## Priority 1 — Pricing adjustments

Grep for the current prices first, then change:

1. **Growth: $1,500/mo → $1,250/mo + Ad Spend.** Update everywhere it appears:
   /pricing card, homepage FAQ "What does it cost?", /pricing meta + OG +
   Twitter tags. (Do NOT touch `lib/plans.ts` Stripe values — they're
   unreachable; leave them.)
2. **Authority: $2,500/mo → $2,000/mo + Ad Spend + token usage.** Same spots.
3. **Authority repositioning.** Authority is now mainly the **full business
   automation** tier. Update its card to read: "Everything in Growth, plus —
   mainly focused on automating your whole business." Bullets:
   - Custom AI Agents + Workflows built for your business (the core focus)
   - 2 managed ad campaigns
   - Founder-led strategy + priority support
   - Metered token usage, billed monthly — visible in your admin profile
   (Replace the old "5–7 ad sets" line with "2 managed ad campaigns".)
4. Verify the three columns still read as equal/comparable, Growth still
   "Most popular". Deploy + verify live.

## Priority 2 — Snapchat across the site

We now run **Snapchat** ads too. Grep every place ad platforms are listed
(homepage services pillar "Meta · TikTok · Google", the Growth pricing bullet,
Thales' crew description, any niche sub-page, meta descriptions) and add
**Snapchat** so platforms read consistently as **"Meta, TikTok, Google &
Snapchat"** (or the matching punctuation per spot). Don't miss the crew page /
about. Deploy + verify.

## Priority 3 — Who We Serve: onboarding process section

Add a clear **onboarding / how-it-works** section to `/who-we-serve` (placed
sensibly in the page flow). State the process as ordered steps, plainly:

1. **Chart your Gold Map.** Emphasize it's of extreme importance — it preps
   everything and makes the whole engagement sharper. (Primary CTA → /audit.)
2. **Book your call.** We walk the map together.
3. **First monthly payment.** Made after the call, this kicks off the build.
4. **Deployment call.** Once the first payment is in, we schedule a deployment
   call.
5. **System delivered within 3 business days** of that first payment.

Make the Gold Map step visually the most prominent. Keep it honest and tight
(no guarantees beyond the 3-business-day delivery stated here).

## Priority 4 — Tool-connectivity headline (high-traffic message)

Elevate the **"works with the tools you already run"** section (on
/who-we-serve, and the homepage integrations hub if it fits) with a prominent
headline/subtitle stating, in plain language:

> "If the tools you already use have an MCP or an API, we connect to them, use
> them, and automate them. If it has a key, we can wire it in."

Make this a real headline/subhead moment, not fine print — it's a key
differentiator. Keep the existing logo orbit. Deploy + verify.

## Priority 5 — Political Candidates becomes the 6th industry

Replace the **"Don't see your industry?"** box on `/who-we-serve` with a real
industry: **Political Candidates** — same card pattern (big title, hook,
bullets, "Chart this course →"), and its own sub-page funnel like the others.
Keep it NON-PARTISAN and system-focused (per CLAUDE.md). Suggested copy:
- Hook: "Automated campaign marketing that keeps your name everywhere."
- Bullets:
  • Automated content + rapid-response across social
  • Managed ad campaigns (Meta, TikTok, Google, Snapchat)
  • Voter-outreach funnels and follow-up, run for you
Build its sub-page at `/political-candidates` (add to sitemap), using the same
restructured frame order as Priority 6 below.

## Priority 6 — Restructure ALL industry sub-pages (the 5 existing + Political)

For every industry sub-page, change the frame order and content:

1. **Remove the "Sound Familiar?" (pain-points) frame entirely.**
2. **Make "What We Built" the SECOND frame, directly below the hero/CTA.**
   Rename the existing "What we build" frame to **"What We Built"**. (Andrew's
   exact wording — past tense.)
3. **Add a new "How to Get Started" frame** below that — detailed, and always
   pointing to the Gold Map. It must: restate how to get the Gold Map (the
   steps), the benefits of charting it, and the onboarding flow (Gold Map →
   book call → first payment → deployment call → delivered within 3 business
   days). Gold Map is the prominent CTA.
4. **AI-software connection selling point** — include on every sub-page (a
   short, prominent block): "We connect your Autonomous Marketing System to
   the AI you already use — Claude, ChatGPT, or Gemini — so you can check
   status and give updates straight from your own AI." This is a key
   differentiator; make it land, not fine print.
5. **Related blog posts at the bottom** — add a section showing **2 industry-
   relevant blog posts** per sub-page, pulled from the blog source filtered by
   the industry's category/tag. Degrade gracefully if fewer than 2 exist yet.
   **NOTE:** Cowork (the chat assistant) is seeding 2 SEO-optimized posts per
   industry into Sapt separately — you only need to WIRE the related-posts
   section to read by category and render cards linking to /blog/[slug]. Do
   NOT block on the posts existing; the section just populates as they land.
   **Category values to filter by (exact, so Cowork's posts match):**
   Home Services → `Home Services`; Real Estate → `Real Estate`; Medical
   Offices → `Medical Offices`; Ecommerce → `Ecommerce`; Multi-Location →
   `Multi-Location`; Political → `Political`. Match the blog post's `category`
   field (case-insensitive contains is fine).

Keep the same brand/visual language; mobile DPR-3 clean. Deploy + verify.

## Priority 7 — Verify + report

Full build green, all routes 200 live, both redirects intact, mobile DPR-3
sweep of /pricing and /who-we-serve. Grep confirms: no surviving "$1,500" or
"$2,500" in user-facing pricing copy (now $1,250 / $2,000); Snapchat present
in every platform listing; onboarding + tool-connectivity sections live.
REPORT-8.md: commits, decisions, anything needing Andrew. Final commit:
`Update autonomous run 8 report`.

## Deploy note

This IS a deploy run — push each change to production (amagna.co) and verify
live, the same pattern used through run 7. Do not wait for Andrew to deploy.
No `git push` of the branch.
