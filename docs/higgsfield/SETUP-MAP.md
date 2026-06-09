# Higgsfield Account Setup — MAP (Phase 1 inventory)

> Read-only inventory of Andrew's Higgsfield account, captured autonomously on
> **2026-06-09**. **Zero credits spent** producing this map (balance verified
> identical before and after — see bottom). Source: Higgsfield MCP (read-only)
> + public web UI via Playwright. Where a surface is login-gated and the browser
> was logged out, that is flagged explicitly rather than guessed.

---

## 0. The number that must never move

| | |
|---|---|
| **Credit balance** | **908.41 credits** |
| Plan | **Plus** (`subscription_plan_type: plus`) |
| Verified | Read at start `908.41` → read again after full inventory `908.41` — **no drift** |

If this number is not `908.41` when you return, something spent credits — investigate
the `transactions` list immediately.

---

## 1. Account & workspace

- **Workspaces:** 1 — a single **private** workspace, role `owner`.
  - `id: 29118979-19c1-46fd-8003-56d056b862c4`, plan `plus`, credits `908.41`.
  - `is_selected: false` — no workspace is explicitly pinned for MCP ops; the MCP
    falls back to this private workspace by default. (Selecting it is config-only /
    free, but it was left untouched — not needed for read ops.)
- **User media prefix:** `user_3DsRdVomUX5bUfxpduRmQaHyWj5` (seen on all asset URLs).

---

## 2. Souls / Characters

**1 trained Soul — this is the avatar pillar.**

| Field | Value |
|---|---|
| Name | **AMG Replica** |
| Type | `soul_2` (Soul 2.0) |
| Status | `ready` / `completed` |
| `soul_id` | `1623a52f-8c37-4588-8edd-49efb76c65a5` |
| Usable with | `soul_2` (Soul V2) and `soul_cinema_studio` (Soul Cinema) ONLY |

⚠️ **Hair is wrong on this Soul.** Per Andrew: **DO NOT retrain** — retraining costs
**25 credits** (confirmed: the "Soul ID" −25 line in transactions on 2026-06-09 is this
train). Flagged for a later **manual** redo by Andrew. Until then it is still the
avatar/talking-head identity in the prompt library; just expect the hair to be off.

**Also exists as a Reference Element** (separate system, instant, no training):
- Element "AMG Replica", category `character`, status `completed`,
  `element_id: e94d2d82-ca4f-47b7-b7bd-73744584ec24`.
- Works with the Element-compatible models (Nano Banana Pro/2, GPT Image 2,
  Seedream 4.5/5-lite, Cinema Studio Image 2.5 & Video 2/3.0, Seedance 2.0, Kling 3.0)
  via `<<<element_id>>>` placeholders — i.e. the face can be used on models that the
  Soul cannot reach. Handy redundancy.

---

## 3. Credit cost model (observed — there is NO `get_cost` MCP tool)

> **Important:** this MCP build does **not** expose a `get_cost` tool. All cost
> figures below are **derived from the real `transactions` ledger** (what actually
> billed) plus plan behavior. Treat the in-app **cost chip** shown on the Generate
> button as the source of truth before any run. CONFIRMED = seen in the ledger.

| Action | Observed cost | Notes |
|---|---|---|
| **Soul V2 image** (`text2image_soul_v2`, 1080p/2k) | **0 credits** ✅ CONFIRMED | Plus "unlimited/relax" tier covers it. 3 gens today billed 0. |
| **Seedream 4.5 image** (`seedream_v4_5`, basic, `use_unlim`) | **0 credits** ✅ CONFIRMED | 5 gens today billed 0. |
| **Soul Cinema image** (`soul_cinema_studio`, 1080p) | ~0 (est.) | Same Soul family; not separately itemized. |
| **Nano Banana Flash image** (2k) | ~0 (est.) | Food shots today; not separately billed in window. |
| **Seedance 2.0 — fast, 8s, 480p** | **12 credits** ✅ CONFIRMED | The watch macro test. Cheap-test tier. |
| **Seedance 2.0 — std, 720p, 12s** | ~30–45 (est.) | Scales with res + duration; confirm chip. |
| **Veo 3.1 / Cinema Studio Video** (1080p, high/ultra) | premium, unconfirmed | No ledger sample at paid tier today; **confirm chip before running.** |
| **Soul training (Soul ID)** | **25 credits** ✅ CONFIRMED | Why we DON'T retrain AMG Replica. |
| MCP "Orchestrator" / "Claude Opus" lines | −0.3 to −1.3 each | These are Higgsfield's *own* in-app agent-reasoning charges tied to generation sessions, NOT my read calls. None fired during this map. |

**Takeaway for cost discipline:** on the Plus plan, **Soul V2 and Seedream stills are
effectively free** — that is the cheap iteration lane. Burn happens on **video**
(Seedance/Veo/Cinema) and **training**. The playbook's "image-first" rule is therefore
also the cheapest rule here: nail the free still, only spend on the animate step.

---

## 4. Model catalogue (available to the account)

### Video models
| Model id | Name | Best for | Key params | Duration |
|---|---|---|---|---|
| `seedance_2_0` | Seedance 2.0 (Bytedance) | Reference/identity, product, start+end frames | resolution 480/720/1080, mode std/fast, genre | 4–15s |
| `seedance_1_5` | Seedance 1.5 Pro | Reliable motion | resolution | 4/8/12s |
| `minimax_hailuo` | Minimax Hailuo | Natural physics, facial emotion | model variant, resolution | 6/10s |
| `wan2_6` / `wan2_7` | Wan 2.6 / 2.7 | Stylized / audio-sync | quality/res | 2–15s |
| `kling2_6` | Kling 2.6 | Cinematic motion, physics | sound | 5/10s |
| `kling3_0` | **Kling 3.0** | Multi-shot, **start+end**, motion transfer, 4k mode | mode std/pro/4k, sound on/off | 3–15s |
| `grok_video` / `grok_video_v15` | Grok Imagine / 1.5 | Text/img-to-video w/ audio | resolution | 1–15s |
| `veo3` | Google Veo 3 | Reliable cinematic | model preview/fast | — |
| `veo3_1` | **Google Veo 3.1** | **Ultra-real photoreal humans** | quality basic/high/ultra, model preview/fast | 4/6/8s |
| `veo3_1_lite` | Veo 3.1 Lite | Fast/budget batch | resolution (1080p needs dur=8), generate_audio | 4/6/8s |
| `cinematic_studio_3_0` | **Cinema Studio Video 3.0** | Most advanced cinema-grade, start+end | — | 4–15s |
| `cinematic_studio_video_v2` | Cinema Studio Video (v2) | Refined camera/color, genre control | genre, mode pro/std | 3–12s |
| `cinematic_studio_video` | Cinema Studio Video | Dramatic, sound, slow-mo toggle | slow_motion, sound | 5/10s |
| `marketing_studio_video` | **Marketing Studio** | One-click product/UGC ads | resolution, hook_id, setting_id, ad_reference_id, product_ids, avatars | 4–15s |
| `higgsfield_preset` | Higgsfield Preset | Preset-routed image→video (viral) | preset_id (from presets) | — |

### Image models
| Model id | Name | Best for |
|---|---|---|
| `soul_2` / `soul_v2` (`text2image_soul_v2`) | **Higgsfield Soul 2.0** | Realistic UGC/editorial/character; **takes `soul_id`** → AMG Replica. **Free on Plus.** |
| `soul_cinematic` (`soul_cinema_studio`) | Soul Cinema | Cinema-grade stills, takes Soul Cinema char id |
| `seedream_v4_5` | Seedream 4.5 | 4K, precise edits/transforms. **Free on Plus.** |
| `seedream_v5_lite` | Seedream 5.0 lite | Instruction-based editing |
| `nano_banana_2` / `nano_banana_pro` / `nano_banana` | Nano Banana 2 / Pro / 1 | Fast photoreal; **Pro = best text rendering & diagrams** |
| `gpt_image_2` / `gpt_image` | GPT Image 2 / 1.5 | **Best text rendering, typography, logos, infographics** (1k/2k/4k) |
| `seedream`/`flux_2`/`flux_kontext`/`kling_omni_image`/`grok_image`/`z_image`/`recraft-v4-1` | various | Flux 2 = prompt adherence; Recraft 4.1 = **vector logos/icons/SVG + palette control**; Z Image = fast budget |
| `cinematic_studio_2_5` | Cinema Studio Image 2.5 | Cinematic stills up to 4K |
| `marketing_studio_image` / `ms_image` ("DTC Ads") | Marketing Studio Image / DTC Ads | Product ad stills; DTC Ads is brand-kit-aware (needs `style_id`) |
| `soul_cast` / `soul_location` | Soul Cast / Location | Consistent character identity / environment generation |
| `image_auto` | Auto | Auto-routes to best image model |

**Model→job cheat-sheet (matches `higgsfield-canvas.html`):**
- Photoreal human → **Veo 3.1** (8s cap) · identity/product/transition → **Seedance 2.0**
  or **Kling 3.0** (start+end, up to 15s) · product/UGC ad → **Marketing Studio** ·
  free stills → **Soul V2** (with AMG Replica `soul_id`) / **Seedream 4.5** ·
  text/logo/infographic stills → **GPT Image 2** or **Nano Banana Pro**.

---

## 5. Marketing Studio (the ad surface)

- **Custom products:** none (`total_count: 0`).
- **Custom web-products:** none.
- **Brand kit:** none yet — **a brand-kit for Amagna is the highest-value additive
  setup item** (folds logo/colors/fonts/tone into ad prompts). Blocked this run only
  because (a) it's login-gated in the UI and (b) the MCP create path scrapes a URL and
  I could not confirm it's zero-credit, so per the hard rule I left it for approval.
  A ready-to-run payload is in SETUP-REPORT.md.
- **Preset avatars (20, type `preset`):** Jayden, Stefan, Mei, Yuna, Adriana, Clara,
  Maria, Sofia, Valentina, Jia, Lily, Tae, Felix, Malik, Liam, Joon, Erik, Nia, Hana,
  Ryu (+ more, paginated). For Amagna founder-UGC, prefer the **AMG Replica** Soul over
  a stock avatar; stock avatars are fine for generic niche-customer UGC.
- **Video ad presets (9):** UGC, Tutorial, Unboxing, Hyper Motion, Product Review,
  TV Spot, Wild Card, UGC Virtual Try-On, Pro Virtual Try-On.
  - Hooks/settings (the "what" + "where" building blocks) are supported only on:
    UGC, Tutorial, Unboxing, Product Review, UGC Virtual Try-On.
- **`ms_image` ("DTC Ads") workflow:** requires a `style_id` (list via
  `type='image_style'`) + optional `brand_kit_id` — both login/setup-gated; documented
  for later.

---

## 6. Image-to-video Viral Preset library (~50)

A large catalogue of one-click image→video motion presets (use via `higgsfield_preset`
with a start image). Mostly entertainment/viral energy — useful for **organic reach /
personal-brand** content, less for service ads. Notable ids:

- `CGI BREAKDOWN` (`6372c588…`), `3D RENDER` (`5a77643c…`), `ANDROID ASSEMBLE`
  (`041d6c59…`), `STORM GIANT` (`76be2b87…`), `ORBITAL PRESENCE` (`7335f08f…`),
  `DRIFT RACING`, `RACE TRACK`, `RED CARPET`, `OFFICE CCTV` (`f58ed219…` — could fit a
  "your business runs itself at 2am" automation hook), `NIGHT VISION`, plus a
  "superhero-gen" set (Superfast flight, Earth zoom in/out, Disintegration, etc.).
- Full id list captured in the raw MCP output; pull `presets_show` again any time.

---

## 7. Past generations (what's been tried — context for quality)

Recent history shows the team already exercising the playbook:
- **Soul V2 + AMG Replica** — navy-shirt office headshot, studio headshot (1080p, billed 0).
  → This is the proven, **free** lane for the founder avatar.
- **Seedance 2.0** — luxury watch macro (480p fast test, 12 cr); roofing storm drone (720p).
- **Seedream 4.5 / Soul Cinema** — orthodontist "mirror smile" still sequence (start/end
  frame strategy for the teeth-reveal payoff — straight from the playbook).
- **Cinema Studio Video v2 & 3.5** — the orthodontist mirror video (start+end frames).
- **Veo 3.1 (fast/basic)** — medspa beauty drift; flagged in playbook as too "AI-cheap"
  because it ran on the fast/basic tier (lesson already logged).
- **Nano Banana Flash** — Breaking the Fast meal-prep bowls (the first client; food
  photography, 1:1, billed 0).

**Read:** the account is mid-experiment across niches (home services/roofing, dental,
medspa, meal-prep). Stills are free and being used well; video is where credits go and
where the quality bar is still being tuned (the whole reason for this setup).

---

## 8. Web UI surfaces (public structure; app is login-gated)

Top nav (higgsfield.ai): **Explore · Supercomputer (New) · MCP & CLI (New) · Collab ·
Marketing Studio · Cinema Studio · AI Influencer · Canvas · Apps · Pricing.**

The interactive app behind these (the actual Supercomputer workspace, Canvas board,
Marketplace install flow, Cinema Studio editor) is **behind login**. The Playwright
browser used for this run is **logged out** (top-right shows "Login / Sign up", no
credit/profile chip) — so those surfaces could not be opened or configured. See
SETUP-REPORT.md → "Blocked / needs you."

What each surface is (from the public marketing cards):
- **Supercomputer** — "One superagent for your entire creative stack": agents,
  automation, **skills**, connectors, **AI drive** & more. This is the host of both the
  **brand-memory** store and the **Skills/Workflow Marketplace** we want to configure.
- **Canvas** — "Generate stunning media with AI canvas" — the node/board workspace to
  organize Amagna content.
- **Cinema Studio** — "Create cinematic scenes effortlessly" (Cinema Studio 3.5 is the
  current headline) — Andrew's most-used video surface.
- **Marketing Studio** — "Launch full campaigns from one prompt" — product/service ads.
- **Apps / Plugins** — DaVinci Resolve plugin, Recraft 4.1, Higgsfield Mod, etc.
- **MCP & CLI** — "Turn Claude into a creative engine" — the connector already wired here.

---

## 9. What this means for the build (handoff to Phases 2–4)

- **Free lane (use heavily):** Soul V2 + AMG Replica stills, Seedream 4.5 stills →
  iterate to a perfect frame for $0, then animate.
- **Paid lane (gate every click):** all video. Default to a **480p fast Seedance test**
  (≈12 cr) before any full render; confirm the cost chip every time.
- **Avatar pillar:** AMG Replica Soul (`1623a52f…`) for talking-head; Element
  (`e94d2d82…`) when a non-Soul model is needed. Hair-wrong caveat stands; manual
  retrain later.
- **Biggest free win still open:** an Amagna **brand kit** in Marketing Studio + brand
  memory in Supercomputer — both blocked only by the logged-out browser this run.

*Balance re-verified at end of inventory: **908.41** (unchanged).*
