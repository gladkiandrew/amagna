# Amagna AI — Brand Guidelines

> The single source of truth for Amagna's brand character, voice, color, and type.
> This document governs the marketing site, decks, ads, and all client-facing collateral.
> Companion file: [`docs/brand/brand-colors.md`](../brand/brand-colors.md) (the original color reference — values here supersede and extend it).
>
> **If you change a color value here, update the SVGs in `apps/marketing/public/brand/` and the Tailwind tokens in `apps/marketing/tailwind.config.ts` + `apps/marketing/src/app/globals.css` to match.**

---

## 1. The character — our ship & dragon

Amagna's character is a **viking longship with a fierce dragon prow and one great white sail** — black hull, antique-gold trim, gold shield-dots, a white dragon eye. It is **the** Amagna mark and mascot. There is **no monogram**.

**Canonical asset:** [`apps/marketing/public/brand/ship-display-hull-gold.svg`](../../apps/marketing/public/brand/ship-display-hull-gold.svg)
(Transparent background. 20 vector paths. Hull/dragon in black, rigging + trim + shield-dots in antique gold `#C9A961`, sail + dragon eye in white. Verified valid, well-formed XML.)

### Personality

| Trait | What it means for the work |
|---|---|
| **Old-fashioned** | Heritage, craft, permanence. Serif headlines, classic proportions, nothing trendy. |
| **Fierce** | Decisive, confident, a little dangerous. High-contrast type, strong gold accents, bold statements. |
| **Classy** | Restraint. Generous whitespace, no clutter, no gimmicks. |
| **Royal** | Premium and institutional. Deep purple as a sovereign accent; gold as treasure, not glitter. |
| **Dynamic** | Motion with intent — a ship under sail, never a "techy" animation. Movement should feel like a voyage. |

> **North star:** Premium and institutional — like a private bank or a centuries-old maritime house. **Never** a "techy startup." If a choice reads as SaaS-generic, it is wrong.

### Art-direction implications (drives all future visual work)

- The ship is a **voyage**, not a logo floating in space. Put it on **realistic water**.
- Water/sea/voyage imagery is **realistic**: deep blue-black water, antique-gold light glinting on the surface. **No purple in the water.**
- Purple lives on **"land"** — it's the accent for emphasized words, buttons, and content.
- Cream is the **content canvas** — where words live and are read.
- Texture and depth over flatness. Gold is **light on water** and **metal trim**, used sparingly so it stays precious.

---

## 2. Wordmark, tagline, positioning, voice

### Wordmark

**"Amagna AI"** (capital A).
- **"Amagna"** → Royal Purple `#5D2E8C`
- **"AI"** → Antique Gold `#C9A961`

On dark backgrounds: "Amagna" → White, "AI" → Warm Gold `#D4B873` (antique gold loses contrast on dark).

The wordmark is a **text lockup**, rendered as the SVGs in `public/brand/amagna/` (`logo.svg`, `logo-dark.svg`, etc.). The **ship is a separate mark** — the wordmark + ship lockup is a deliberate design decision to be made during the homepage build, not assumed here.

### Tagline

> **AI-powered growth systems**

### Positioning

> **We don't sell innovative tech. We fix your problem.**

This is the spine of every message. We lead with the outcome, never the machinery.

### Voice — operator language

We speak the way our customers speak. Outcomes, not architecture.

| Say this | Not this |
|---|---|
| "More calls this month." | "AI-driven omnichannel lead orchestration." |
| "Your phone rings. We made it ring." | "Our ML pipeline optimizes funnel conversion." |
| "Leads you own — not rented from a portal." | "Leverage our proprietary data platform." |
| "We handle it. You run the crew." | "Automate your workflow with our SaaS." |

Rules:
- Lead with **revenue, calls, listings, booked jobs** — the operator's scoreboard.
- Short, declarative sentences. Confidence without hype.
- Never explain the technology unless asked. The tech is invisible plumbing.
- No buzzwords: *synergy, leverage (as verb), disrupt, revolutionary, cutting-edge, seamless, next-gen.*

---

## 3. Color

### Core palette

| Name | Hex | Token (Tailwind / CSS var) | Role |
|---|---|---|---|
| **Royal Purple** | `#5D2E8C` | `brand-purple` / `--brand-purple` | The Amagna accent. Emphasized words, buttons, links, content accents — on **land** only. |
| **Antique Gold** | `#C9A961` | `brand-gold` / `--brand-gold` | Treasure. Light glinting on water, metal trim, premium dividers, eyebrow labels. Use sparingly. |
| **Cream** | `#FAF8F3` | `brand-cream` / `--brand-cream` | The content canvas. Default reading surface for "land" panels. |
| **Deep Purple** | `#1A0E36` | `brand-deep` / `--brand-deep` | Deepest brand tone. Night-sky / horizon, rich dark panels, footer. (Not the water tint — see rules.) |
| **Warm Gold** | `#D4B873` | `brand-warmgold` / `--brand-warmgold` | Lighter gold for **dark backgrounds**, where antique gold loses contrast. |
| **Charcoal** | `#1A1A1A` | `brand-charcoal` / `--brand-charcoal` | The hull. Primary body text on light; near-black structural color. |
| **Slate Gray** | `#4A4A52` | `brand-slate` / `--brand-slate` | Muted text, secondary copy, captions, borders on light. |
| **Light Gray** | `#E5E5EA` | `brand-lightgray` / `--brand-lightgray` | Hairlines, subtle dividers, disabled states, panel edges. |

> **Legacy aliases retained** (do not remove — used across existing checkout/pricing/about/book pages):
> `royal-purple` = `#5D2E8C`, `antique-gold` = `#C9A961`, `dark-mode-gold` = `#D4B873`, `cream` = `#FAF8F3`, `ink` = `#1A1A1A`. The `brand-*` family is the **going-forward** naming; the legacy names remain valid until those pages are migrated.

### Color-job rules (LOCKED)

These are not suggestions. They are how the brand stays coherent.

1. **Realistic water / voyage imagery = black + gold. NO purple tint.**
   The ocean, the ship's sea, any maritime scene: deep blue-black water with antique-gold light on the surface. Purple **never** appears in the water or sky-as-sea.
2. **Purple = the Amagna accent on "land."**
   Emphasized words, primary buttons, links, content accents, callouts. Purple signals *us* and *action* — on content surfaces, not in seascapes.
3. **Cream = the content canvas.**
   Where copy is read. Long-form text, content panels, cards.
4. **Hero water is realistic with no brand-purple in the background.**
   The deep blue-black + gold-glint treatment is the hero. Resist the urge to "brand it purple" — the restraint *is* the premium signal.

Practical translation for the water: build the deep blue-black from `brand-deep` shifted toward navy/teal-black (e.g. blends of `#0B1220`–`#101A2B` with `brand-deep` `#1A0E36` only at the very bottom/horizon for depth, kept **cool and dark, never violet**). Gold glints use `brand-gold` / `brand-warmgold`. This keeps rule #1 intact while letting `brand-deep` anchor the darkest horizon.

### Do / Don't

**Do**
- Use Royal Purple as the dominant *accent* on light/cream surfaces.
- Pair gold with purple on land — they're a set.
- Switch to Warm Gold any time the background is darker than ~50% gray.
- Keep gold rare. It's treasure; scarcity is the point.

**Don't**
- Don't tint the water purple (rule #1).
- Don't use Antique Gold as body text or on dark backgrounds (use Warm Gold on dark).
- Don't introduce new accent colors without updating this file first.
- Don't recolor the ship or wordmark into off-brand combinations.

---

## 4. Typography — CANDIDATES (Andrew to confirm)

The character calls for an **elegant serif for headlines/wordmark** and a **clean sans for body** — old-fashioned and royal, but crisp and fast on the web. Three Google-Font pairings, with rationale and risks. **Nothing is finalized — Andrew picks.**

### ⭐ Candidate 1 (recommended) — Fraunces + Geist Sans

- **Headlines:** [Fraunces](https://fonts.google.com/specimen/Fraunces) — an "old-style" display serif with optical sizing, high contrast, and genuine character (it was *designed* to feel antique-yet-alive). Reads heritage + fierce + dynamic, and is distinctive enough to **dodge the templated-AI look**.
- **Body:** **Geist Sans** — *already loaded locally in the repo* (`apps/marketing/src/app/fonts/`). Clean, neutral, modern, fast. Zero new dependency.
- **Why:** Maximum character on the headlines (anti-generic), zero added weight on the body. Fraunces' `SOFT`/`WONK` axes let us tune it from refined to characterful.
- **Risk:** Fraunces is opinionated; it needs correct optical size + weight (use the display optical size at large sizes, ~weight 400–600) and restrained tracking or it can feel busy.

### Candidate 2 — Cormorant Garamond + Inter

- **Headlines:** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) — a high-contrast, aristocratic Garamond. The most overtly **royal/classy** option; thin, elegant, regal.
- **Body:** [Inter](https://fonts.google.com/specimen/Inter) — the workhorse neutral sans; supremely legible (one new font dep).
- **Why:** The purest "royal" reading. Cormorant feels like an old crest or a luxury maison.
- **Risk:** Cormorant is *light and delicate* — needs large sizes and 600+ weight for impact, or it disappears. Less "fierce," more "refined."

### Candidate 3 — Playfair Display + Source Sans 3

- **Headlines:** [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) — transitional high-contrast serif, strong editorial/luxury authority (fashion-house energy).
- **Body:** [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3) — humanist, friendly, legible.
- **Why:** Solid, assertive, premium editorial. More weight/presence than Cormorant.
- **Risk:** Playfair is *very* widely used → highest "templated" risk of the three. Mitigate with restraint + custom tracking, or avoid.

**Build decision for the homepage:** to ship without blocking on Andrew, the voyage page is built on **Candidate 1 (Fraunces + Geist Sans)** — it's the most anti-generic and adds no body-font dependency. Swapping the headline face later is a one-line change in `layout.tsx`. Andrew confirms or overrides.

> The **wordmark lockup** itself stays system-native per `docs/brand/brand-colors.md` (it's shipped as SVG). These candidates govern **site headlines and body**, not the wordmark SVG.

---

## 5. Asset index

| Asset | Path | Use |
|---|---|---|
| Ship / character | `apps/marketing/public/brand/ship-display-hull-gold.svg` | The mark & mascot. Favicon, voyage character, hero. |
| Wordmark (light) | `apps/marketing/public/brand/amagna/logo.svg` | Header/footer on light bg. |
| Wordmark (dark) | `apps/marketing/public/brand/amagna/logo-dark.svg` | Header/footer on dark bg. |
| Wordmark mono | `apps/marketing/public/brand/amagna/logo-mono-*.svg` | Single-color reproduction. |
| Wordmark stacked | `apps/marketing/public/brand/amagna/logo-stacked*.svg` | Square/avatar placements. |
| Favicon (browser tab) | `apps/marketing/src/app/icon.svg` | The ship. Modern browsers. |
| App icon (iOS) | `apps/marketing/src/app/apple-icon.png` | The ship on a brand ground (provisional treatment). |

---

*Last updated: 2026-06-02. Owner: Andrew Gladki / Amagna AI. Update whenever a brand decision changes.*
