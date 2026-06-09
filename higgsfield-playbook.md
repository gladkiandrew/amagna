# Higgsfield Prompt-Hardening Playbook

> Source of truth for turning a video concept into a hardened, model-aware
> Higgsfield/Seedance prompt that one-shots as often as possible. Credits are
> real money — the north star is **fewer wasted generations.**
>
> **Read this before drafting any prompt. Update it after every feedback round.
> It only grows — never drop a learned rule.**

---

## How we work (commands)

- **`/prompt [concept + any reference images]`** → produce a hardened prompt in
  the output format below, then list: (a) which failure modes were pre-empted,
  (b) any residual risk, (c) the cheapest way to test before a full render.
- **`/feedback [what I saw — good or bad]`** → diagnose which failure mode it
  maps to, ADD or REFINE a rule below (cite the video), then restate the
  corrected prompt.
- **`/win [what worked]`** → log the winning pattern so it's reinforced and reused.
- **`/playbook`** → print the current rules.

---

## Prompt output format (always use this)

- **Line 1 — format:** "Photorealistic cinematic 9:16 vertical video, ~Xs,
  [ONE continuous take / single action], no cuts, no on-screen text, no logos."
- **SUBJECT:** one line.
- **Timestamped beats:** "0.0–X.Xs — BEAT NAME: concrete visual direction."
- **CRITICAL-ELEMENT callouts** for any high-risk element (teeth, mirror, hands,
  etc.) with explicit safeguards.
- **CAMERA & MOTION** rules.
- **NEGATIVES** block.
- End with: "Keep the lower third clean for captions added after."
- **State which START frame / END frame reference images to load**, if any.

---

## Hardening checklist (run silently on every prompt)

1. **Text/CTA/logo in the concept?** → strip it out, note "burn captions after,"
   add to negatives.
2. **Aspect ratio** is set by the TOOL param + SOURCE IMAGE shape, never prompt
   text → instruct: crop the source to vertical 9:16 first.
3. **High-risk mechanics** — reflections/mirrors, materializing faces,
   clear/small handheld objects, multi-step sequences, big lighting changes,
   fast/complex camera moves → flag and apply the matching seed rule.
4. **People/scene shot?** → default MEDIUM framing with environment context,
   "not extreme close-up." Macro/product/detail shot (watch, squeegee)? → tight
   is intentional, say so.
5. **Pacing** → default natural real-time; only slow motion if asked.
6. **Lock the hardest moment** (ending, face, reflection) with a START/END
   reference frame whenever possible.
7. **REFERENCE IMAGES (default recommendation):** for ANY shot where realism,
   identity, teeth, or a specific payoff matters, RECOMMEND creating reference
   image(s) and using image-to-video instead of text-to-video. A locked still
   the model animates toward beats a face/smile it invents frame-by-frame every
   time. Always offer: "generate/approve the still(s) first, then animate."

---

## Reference-image strategy (the highest-leverage habit)

Text-to-video makes the model invent everything and drift — that's where warps,
melted teeth, and identity swaps come from. **Image-to-video gives it a locked
truth and just adds motion.** Default to it whenever quality matters.

- **One still + animate:** nail a perfect frame, then animate gentle motion. Best
  for beauty/portrait/product hero shots.
- **START + END frames:** give a start image and an end image; the model
  interpolates the journey. Best for controlled transitions, reveals, and
  anything where the PAYOFF (a smile, a clean result) must be exact — the ending
  is a pre-approved picture, so the model can't hallucinate it. Models that
  support both: **Seedance 2.0, Kling 3.0** (also up to ~15s; Veo 3.1 caps 8s).
- **Workflow:** generate the still(s) cheaply → iterate until correct (especially
  teeth/identity) → approve → animate. Far cheaper than re-rolling full videos.

---

## Quality settings (don't ship the cheap tier)

- Use the **preview / high / ultra** model variant, **1080p** — NOT the fast/basic
  default. The fast tier is most of why a clip looks "AI-cheap." (src: Botox —
  ran on veo-3-1-fast/basic, looked rough.)
- Match model to job: photoreal humans → Veo 3.1 / Seedance 2.0; longer or
  start+end transitions → Seedance 2.0 / Kling 3.0.

---

## SEED RULES (current knowledge — keep adding)

Format: **Failure mode → Symptom → Pattern that fixes it → (src).**

- **TEXT** → on-screen text garbles → never put text/CTA in the prompt; burn
  captions in after. → (src: general)
- **ASPECT RATIO** → renders horizontal when you wanted vertical → not controlled
  by prompt words; set by tool param + source-image shape. Crop source to vertical
  9:16 first. → (src: roofing — kept rendering horizontal)
- **MIRRORS / REFLECTIONS** → reflected face fades in / materializes as a blob →
  require a COMPLETE, recognizable reflection present the instant the mirror is in
  place; resolve soft→sharp via a FOCUS PULL — never fade/dissolve/morph. Best:
  lock the reflection with an END-frame reference image. → (src: orthodontist —
  face faded in weirdly)
- **TEETH** → melt / multiply / wrong count, worst when macro + moving → medium
  framing (not macro); smile forms ONCE then HOLDS steady; state "anatomically
  correct count, no extra/duplicated/melting teeth, no mouth warp." Best: lock the
  smiling face as an END-frame reference. → (src: orthodontist)
- **HANDS + CLEAR/SMALL OBJECTS** (aligners, small mirrors) → high warp risk →
  avoid, or keep minimal / partly out of frame. → (src: orthodontist)
- **MULTI-STEP SEQUENCES** → model favors ONE continuous action and botches
  multi-beat → if multi-beat is required, lock BOTH endpoints with start_image +
  end_image. → (src: orthodontist)
- **FRAMING / ZOOM** → people-shots default too tight/claustrophobic → specify
  MEDIUM + visible environment, "not extreme close-up." → (src: Botox — too
  zoomed in)
- **PACING** → renders dreamy / slow-mo → specify natural real-time speed, "no
  slow motion," unless requested. → (src: Botox — too slow-mo)
- **BIG LIGHTING CHANGES** (clear sky → storm) → under-delivers the change →
  start from a source already partway (e.g., overcast). → (src: roofing)
- **CAMERA** → orbits/speed-ramps wreck identity & detail → keep slow, stabilized;
  final beat near-static when faces/teeth/detail are on screen. → (src: general)
- **REAL-WORLD TRADE PROCESS** → model guesses the process wrong → encode how the
  job ACTUALLY works from the operator (e.g., soft-washing = apply solution, dwell,
  rinse — not blast-clean). Get the real process before drafting. → (src: pressure
  washing)

---

## Cost discipline

- Harden the FIRST prompt; never rely on re-rolls to fix a KNOWN failure mode.
- Lock hard parts (ending, face, reflection) with start/end reference frames —
  this is why endings land clean.
- Suggest a cheap low-res / short test pass to validate motion before a full render.
- Be honest: generative video is stochastic — hardening cuts re-rolls, never to zero.

---

## OUTPUT ENHANCEMENT — how to close the gap to "barely-tell-it's-AI"

The viral clips you admire are not raw model output. The render is *footage*, not
the finished video. Enhancement is where amateur output becomes premium.

**1. Image-first is the #1 quality lever.** Generate (or supply) a perfect still,
approve it, then animate. The model preserves the locked frame instead of
inventing it — this single habit fixes most teeth/identity/geometry problems.

**2. Generate clean, then AI-upscale.** Render at 720p/1080p for speed/cost, then
run `upscale_video` to sharpen toward 4K crispness. Cheaper than rendering huge,
and removes the soft "AI-cheap" look.

**3. Post-production carries 50% of the "wow."** Raw clip → finished video means:
color grade (a consistent house LUT so all Amagna content feels cohesive), music
(carries the emotion), captions burned in (via Claude/editor — never in the
prompt), sound design, and cutting the best 2–3 seconds out of each generation.

**4. Volume → cherry-pick.** Expect ~1 in 3–5 generations to be usable. Generate
several, keep the best beats, discard the rest. Plan credits for this, don't fight
it.

**5. Stitch short beats.** Instead of one risky 15s shot, generate 2–3 clean short
beats and edit them into one polished piece. More control, fewer warps.

**6. Reference images / Soul characters for consistency.** Across a campaign, reuse
a reference image (or a trained Soul) so the same person/look recurs. Consistency
is what makes a set feel professional.

**7. Compositing tools (Higgsfield).** `remove_background` to drop a product onto a
clean branded backdrop; `outpaint_image` to extend a frame to vertical 9:16;
`motion_control` for directed camera moves; `upscale_image` to sharpen a hero
still before animating it.

**8. House look.** Decide one grade/palette/font-caption style for all Amagna
content so every clip reads as the same brand — this is what makes an agency's
output look like an agency, not a hobby.

---

## Account state (live — updated 2026-06-09 autonomous setup run)

Captured read-only via the Higgsfield MCP. Full detail in `docs/higgsfield/SETUP-MAP.md`.

- **Plan: Plus. Credit balance baseline: 908.41** (unchanged by the setup run).
- **Free lane (0 cr on Plus): Soul V2 stills + Seedream 4.5 stills** — confirmed billing
  0. This is the cheap iteration lane; "image-first" is also the cheapest rule here.
- **Spend lane: all video.** Confirmed: Seedance 2.0 fast/8s/480p = **12 cr**. Soul
  training = **25 cr** (why we never retrain a Soul casually).
- **No `get_cost` tool on this MCP build** — estimate from the `transactions` ledger and
  **always confirm the in-app cost chip before rendering video.**
- **Avatar:** Soul **AMG Replica** `soul_id 1623a52f-8c37-4588-8edd-49efb76c65a5` (works
  with `soul_2` / `soul_cinematic` only) + Reference Element `e94d2d82-ca4f-47b7-b7bd-73744584ec24`
  (works with Nano Banana / Seedream / Kling / Cinema Studio via `<<<id>>>`).
  ⚠️ **Hair is wrong — do NOT retrain; manual redo pending.**
- **Models confirmed available:** video — Seedance 2.0/1.5, Kling 2.6/3.0, Veo 3/3.1/Lite,
  Minimax Hailuo, Wan 2.6/2.7, Grok, Cinema Studio Video v2/3.0, Marketing Studio, preset
  router. image — Soul 2.0/Cinema, Seedream 4.5/5-lite, Nano Banana 2/Pro/1, GPT Image
  2/1.5, Flux 2/Kontext, Recraft 4.1 (vector/logos), Cinema Studio Image 2.5, DTC Ads.
- **Marketing Studio:** 20 preset avatars + 9 video presets (UGC, Tutorial, Unboxing,
  Hyper Motion, Product Review, TV Spot, Wild Card, Virtual Try-On ×2). **No custom
  product / brand kit yet** — building an Amagna brand kit is the top free setup item.
- **Reusable Amagna prompt templates live in `docs/higgsfield/PROMPTS.md`.**
- **Web-app config surfaces (Supercomputer memory, Canvas, Skills Marketplace) are
  login-gated** — pending an authenticated browser session (see SETUP-REPORT.md).

## Continuous learning (non-negotiable)

Every `/feedback` and `/win` updates this file. Goal is **monotonic**: every video
must make the next prompt measurably better. Never remove a learned rule.
