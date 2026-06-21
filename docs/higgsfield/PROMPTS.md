# Amagna × Higgsfield — Prompt Library

> Brand-tuned, **playbook-hardened** reusable templates. Built on the rules in
> `higgsfield-playbook.md` and the shot logic in `higgsfield-canvas.html`, against the
> live account state in `docs/higgsfield/SETUP-MAP.md`.
>
> **Every template lists model + aspect + a credit ESTIMATE.** Estimates are derived
> from the real transaction ledger (no `get_cost` tool exists on this MCP) — **always
> confirm the in-app cost chip before clicking Generate.** Nothing here has been run.

---

## Brand memory block (paste-ready — prepend to any prompt that needs the look)

**Amagna AI — "Autonomous Marketing Systems."** Premium, confident, operator-to-operator;
never hypey or cringe. The feeling: *a quiet machine that runs your marketing while you
sleep.*

- **Palette (locked, master brief 2026-06-15):** Royal Purple `#5D2E8C` · Antique Gold `#C9A961` ·
  Cream `#FAF8F3` · Deep Purple `#1A0E36` · Warm Gold (on dark) `#D4B873` · Charcoal `#1A1A1A`.
  Dark, rich, gold-lit — *not* neon, *not* flat corporate blue. **Describe palette in prompts with
  WORDS, never hex** (hex renders as text in the image).
- **Type (for burned captions/overlays added in post, NEVER in the prompt):** Fraunces
  (serif, headlines) + Inter (sans, body).
- **House look / LUT:** cinematic, cool navy shadows + warm gold highlights, gentle film
  grain, believable (not HDR-cartoon). Apply the same grade to everything so it reads as
  one agency.
- **The crew (named characters; reference for concepts, do not caption unless intended):**
  Zeno (Captain/Brain — orchestrator), Exodus (Creative), Solon (Outreach), Hero
  (Automation), Thales (Marketing).
- **Non-negotiables, every generation:** no on-screen text / captions / logos / watermarks
  (burn captions after); keep the lower third clean; photoreal and believable over flashy.
- **World & motif:** **water / ocean / voyage** feel — calm dark seas, gold horizons, dawn light
  on and under the water, mist, brass nautical instruments. **NEVER outer-space, cosmic, orbiting
  planets/globes, satellites, or galaxy imagery.** A literal ship is optional, not required.
- **Palette in prompts = WORDS ONLY, never hex codes.** Models burn hex strings (e.g. `#1A0E36`)
  into the image as visible text. Describe colors by name (deep navy-to-aubergine, antique gold,
  royal purple, warm cream). Hex values are for post-production overlays only.

---

## How to read a template

```
MODEL  : <model id> + tier         ASPECT: <set by tool param + source crop>
EST    : <credits, with basis>     REF   : <start/end frame strategy>
PRE-EMPTED: <playbook failure modes this template already defends against>
```

Fill the `[SLOTS]`. Keep ONE continuous action per video. For anything where identity,
teeth, hands, reflections, or a clean payoff matter → **make the still first (free on
Soul V2 / Seedream), approve it, then animate.**

---

# (a) FEED POSTS — Instagram / Facebook stills

Default to **free** still models. These are the daily-driver brand posts.

### A1 — Brand statement post (gold-lit, no people)
```
MODEL : gpt_image_2 (quality high, 2k)   — best text/clean geometry; OR nano_banana_pro
ASPECT: 4:5 (IG feed) or 1:1             — set in tool param
EST   : ~0–low on Plus (stills lane); confirm chip
REF   : text-to-image fine (no identity risk)
PRE-EMPTED: TEXT-garble (we keep ALL copy out of the image and burn it in post)
```
> Photorealistic premium brand still, [4:5 vertical / 1:1]. A dark navy-to-aubergine
> studio gradient background (`#1A0E36`→`#241546`) lit by a single warm antique-gold
> rim light from the upper left. Centered: [HERO OBJECT — e.g. a sleek matte-black
> control panel glowing with soft gold data lines / a single brushed-gold geometric
> emblem]. Rich shadows, subtle film grain, shallow depth of field, expensive and calm.
> Negative space kept clean and uncluttered in the [lower third / center] for a headline
> added later. NO text, NO logos, NO watermark. Cinematic navy-and-gold color grade.

*Caption (burn in post, Fraunces): the actual hook — e.g. "Your marketing should run
without you."*

### A2 — "Works with the tools you already run" (connectivity)
```
MODEL : gpt_image_2 (high, 2k) or nano_banana_pro   ASPECT: 1:1 or 4:5
EST   : ~0–low on Plus; confirm chip                REF   : text-to-image
PRE-EMPTED: TEXT-garble (no brand logos drawn by model — composite real logos in post)
```
> Photorealistic 1:1 still. A clean dark navy desk surface, soft gold key light. A
> central glowing node connected by thin antique-gold light-threads radiating outward to
> several softly-blurred blank app tiles arranged in a halo (tiles intentionally blank —
> real tool logos composited later). Premium, calm, "central brain" feeling. Shallow DOF,
> film grain, navy-and-gold grade. NO text, NO real logos, NO watermark. Keep lower third
> clean.

### A3 — Niche customer hero (home services / real estate / political — pick one)
```
MODEL : seedream_v4_5 (high)  OR soul_2          ASPECT: 4:5 or 1:1
EST   : 0 on Plus (CONFIRMED free lane)          REF   : text-to-image; medium framing
PRE-EMPTED: FRAMING (medium + environment, not extreme close-up); PACING n/a (still)
```
> Photorealistic editorial 4:5 still, MEDIUM framing with visible environment (not an
> extreme close-up). [SUBJECT: e.g. a confident 45-year-old HVAC business owner in a
> clean branded work shirt standing in front of his service van / a polished real-estate
> agent in a sunlit modern listing / a candidate-neutral community organizer at a town
> event]. Natural realistic skin texture, believable not plastic. Warm, aspirational,
> trustworthy. Soft daylight key, subtle navy-and-gold cinematic grade in the shadows.
> NO text, NO logos, NO watermark. Lower third clean for a caption later.

> ⚠️ Political: keep it **non-partisan** — no party colors, slogans, flags, or claims.
> Show the *automated outreach system* vibe, never a campaign message.

---

# (b) SERVICE ADS — Meta / TikTok / Snapchat (9:16 video)

The credit-spend lane. **Always: make/approve the still first → 480p fast test → full
render.** Confirm the cost chip every step.

### B1 — Service "before→after / problem→solved" reveal
```
MODEL : seedance_2_0 (std)  [start_image + end_image]   ASPECT: 9:16 (crop sources first)
EST   : test 480p/8s ≈ 12 cr (CONFIRMED) · full 720p/std ≈ 30–45 cr (est, confirm chip)
REF   : START = problem state, END = solved state — both approved stills (free to make)
PRE-EMPTED: MULTI-STEP (lock BOTH ends); MIRRORS/MORPH (no fade — defined start→end
            interpolation); ASPECT (crop sources 9:16 first); CAMERA (slow, stabilized)
```
> Photorealistic cinematic 9:16 vertical video, ~8s, ONE continuous take, no cuts, no
> on-screen text, no logos. SUBJECT: [the service transformation — e.g. a dull weathered
> roof becoming a clean restored roof / an empty quiet phone becoming a phone lighting up
> with booked jobs]. 0.0–8.0s — a single smooth [push-in / drift] interpolating from the
> START state to the END state. Natural real-time pacing, steady stabilized motion, final
> beat near-static. NO morph/dissolve/materialize — the change resolves as a defined
> start→end transition. NEGATIVES: no warping/melting; no extra/duplicated parts; no text,
> logos, captions; no slow-motion; no jitter. Keep the lower third clean for captions
> added after. REFERENCE FRAMES: START = [problem still], END = [solved still].

### B2 — Product/UGC service ad via Marketing Studio (one-click pipeline)
```
MODEL : marketing_studio_video  (preset: UGC / Product Review / Tutorial)   ASPECT: 9:16
EST   : video-tier spend — confirm chip (Marketing Studio not sampled in ledger)
REF   : link a product/brand-kit (set up first); optional hook_id + setting_id
PRE-EMPTED: keeps structure on-rails (hook→demo→CTA) so the model doesn't invent pacing
```
> Use Marketing Studio. Preset = [UGC | Product Review | Tutorial]. Product/brand =
> [Amagna service or client product, once a product/brand-kit exists]. Hook = [pick a
> hook_id, e.g. "object flies into frame"]. Setting = [pick a setting_id, e.g. "modern
> sunlit office"]. Avatar = AMG Replica (founder) OR a preset avatar for a generic
> customer testimonial. Keep it authentic, hand-held UGC energy; no on-screen text (burn
> captions after); navy-and-gold grade in post.

### B3 — "Your business runs itself" automation atmosphere (no people)
```
MODEL : seedance_2_0 (std) OR cinematic_studio_3_0   ASPECT: 9:16
EST   : test 480p ≈ 12 cr · full ≈ 30–45 cr (est, confirm chip)
REF   : START frame = a real/approved office-at-night still (gold-lit screens)
PRE-EMPTED: BIG LIGHTING change avoided (start already dark+lit); CAMERA slow/stable
```
> Photorealistic cinematic 9:16, ~8s, ONE continuous slow push-in, no cuts, no text, no
> logos. A quiet dark office at 2am, empty chair, a single monitor glowing with soft
> antique-gold dashboards and slowly updating data lines — work happening with nobody
> there. Calm, premium, "the machine runs itself." Navy shadows, warm gold screen glow,
> film grain. Steady stabilized push-in, final beat near-static, natural pacing, no
> slow-mo, no jitter. NEGATIVES: no warping, no text, no logos, no captions. Lower third
> clean for captions after. REFERENCE: START = approved gold-lit office still.

---

# (c) AMG REPLICA — talking-head / founder avatar

The avatar pillar. **Hair is currently wrong on the Soul — expect it until the manual
retrain.** Stills are free; the talking video is the spend.

### C1 — Founder talking-head STILL (free — make this first, every time)
```
MODEL : soul_2  + soul_id 1623a52f-8c37-4588-8edd-49efb76c65a5  (quality 2k)
ASPECT: 9:16 (Reels/TikTok) or 4:5 (feed)
EST   : 0 credits on Plus (CONFIRMED free lane)
REF   : the Soul IS the identity lock; medium framing
PRE-EMPTED: IDENTITY (Soul-locked); FRAMING (medium + environment); skin realism
```
> Photorealistic [9:16 / 4:5] portrait, MEDIUM framing showing the person and some
> environment (not extreme close-up). The same man as the Soul reference, [late
> 20s/30s], short styled brown hair, [navy button-down / clean dark tee], in a [modern
> dark office with soft gold accent light / clean studio with navy backdrop]. Natural
> realistic skin with visible pores, believable not plastic, confident calm expression
> looking at camera. Soft key light, navy-and-gold cinematic grade. NO text, NO logos,
> NO watermark. Lower third clean.

> Tip: generate several free variations, pick the best frame (hair caveat applies), then
> animate that exact still in C2.

### C2 — Founder talking-head VIDEO (animate the approved still)
```
MODEL : veo3_1 (quality HIGH, model veo-3-1-preview)  [start_image = approved C1 still]
ASPECT: 9:16        DURATION: 8s (Veo cap)
EST   : premium video tier — UNCONFIRMED in ledger; CONFIRM COST CHIP before running
REF   : START = approved C1 Soul still (locks identity + hair you accepted)
PRE-EMPTED: do NOT use fast/basic (the "AI-cheap" lesson — Botox/medspa src); CAMERA
            near-static for a face; PACING natural; identity locked by start_image
```
> Photorealistic cinematic 9:16 video, ~8s, ONE continuous take, no cuts, no on-screen
> text, no logos. SUBJECT: the man in the start frame, speaking naturally to camera,
> relaxed confident micro-expressions and natural blinks, slight head movement. MEDIUM
> framing, environment visible. Camera near-static, gentle if anything. Natural real-time
> pacing, no slow-mo. NEGATIVES: no warping of the face/mouth/teeth, no identity change,
> no extra teeth, no text, no logos, no jitter. Keep the lower third clean for captions
> after. Audio: clean room tone only (VO/captions added in post).

> If credits are tight, **Seedance 2.0 (std, start_image)** is a cheaper photoreal-human
> fallback — run a 480p test first (≈12 cr).

---

# (d) B-ROLL / LIFESTYLE (atmosphere, no people)

Cohesion filler between hooks; cheapest video to get right.

### D1 — Gold-lit tech/abstract b-roll
```
MODEL : seedance_2_0 (std) OR veo3_1_lite           ASPECT: 9:16 (or 16:9 for YouTube)
EST   : test 480p ≈ 12 cr · full 720p ≈ 25–40 (est, confirm chip)
REF   : optional start frame for a specific look; text-to-video OK for atmosphere
PRE-EMPTED: STABILITY (smooth, no jitter); PACING natural; no text
```
> Photorealistic cinematic 9:16 b-roll, ~6–8s, ONE continuous slow move, no cuts, no
> text, no logos. [SUBJECT: antique-gold light threads drifting through dark navy space /
> slow particles of gold dust in a soft beam / a macro of brushed-gold metal catching a
> raking light]. Physically believable motion, smooth stabilized camera, natural pacing,
> no slow-mo unless intended, no jitter. Navy-and-gold cinematic grade, film grain.
> NEGATIVES: no warping, no text, no logos. Lower third clean.

### D2 — Niche environment b-roll (home services / real estate)
```
MODEL : seedance_2_0 (std)  [start_image recommended]   ASPECT: 9:16
EST   : test 480p ≈ 12 cr · full ≈ 30–45 (est, confirm chip)
REF   : START = approved niche still (e.g. roof, listing exterior)
PRE-EMPTED: REAL-PROCESS (encode how the trade actually works); LIGHTING (start partway)
```
> Photorealistic cinematic 9:16, ~8s, ONE continuous drone/dolly move, no cuts, no text.
> [SUBJECT: a clean suburban roofline under soft overcast→breaking light / a bright
> staged living room with slow dolly toward the window]. Premium stabilized motion,
> gentle parallax, natural pacing, no jitter, no speed ramps. Believable filmic grade,
> navy-cool shadows + warm highlights. NO people, NO signage, NO text or logos. Lower
> third clean. REFERENCE: START = [approved niche still].

---

## Enhancement chain (apply to every keeper — from the playbook)

1. **Image-first** — approve the free Soul/Seedream still before animating.
2. **Upscale** — render 720/1080p, then `upscale_video`/`upscale_image` toward 4K.
3. **Post = 50% of the wow** — one house LUT (navy shadows/gold highlights), music,
   burned captions (Fraunces), cut the best 2–3s.
4. **Volume → cherry-pick** ~1 in 3–5; **stitch short beats** over one risky long shot.
5. **Consistency** — reuse AMG Replica Soul/Element + the same grade across a campaign.

## Prompt feedback log (living — appended on `/promptfeedback`)

Newest first. Each entry is a hardened lesson that overrides anything above it.

- **2026-06-12 — World is water/voyage, NOT space.** The S1 "brushed-gold core orb floating with
  orbiting satellite forms" read as outer-space/cosmic. Nowhere in the brand is a space feel. Use
  ocean/voyage motifs (calm seas, gold horizons, light on/under water, mist, brass nautical
  instruments); a ship is optional. — Ayge
- **2026-06-12 — No hex codes in prompts.** S1 rendered the literal hex strings as text in the
  image. Always describe the palette in words; keep hex for post overlays only. — Ayge

## Saving prompts back into Higgsfield

The web app's prompt-saving / Supercomputer-memory surface is **login-gated** and the
browser was logged out this run, so these were **not** saved into Higgsfield UI. This
file is the source of truth; copy a template in when you're logged in (see SETUP-REPORT).
