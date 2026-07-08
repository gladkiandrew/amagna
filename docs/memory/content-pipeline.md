# Content Pipeline

> Shared log for **Exodus** (creative/content production) and **Vela** (distribution/scheduling).
> Track each item's status: idea / drafting / rendering / ready / scheduled / published. Append dated
> entries; note channel and post status when distributed.

## 2026-06-30 — Amagna AI 20s brand teaser
- **Status:** delivered
- **Output:** `/Users/drekothapoet/dev/hf-renders/amagna-teaser/renders/amagna-teaser-final.mp4`
- **Render:** HyperFrames → MP4, 1920x1080, high quality, 30fps, 20.0s (600 frames); render time ~1m17s
- **Notes:** 4-scene teaser (wordmark reveal → constellation → BUILD/RUN/GROW → particle-reform lockup). Lint/validate/inspect all clean. Fixed missing `#lightbar` element (the gold light-bar wipe did not render in v1).

## 2026-06-30 — Amagna AI 20s brand teaser v2 (Golden Circle: Why / How / What)
- Status: delivered
- Output: /Users/drekothapoet/dev/hf-renders/amagna-teaser-v2/renders/amagna-teaser-v2-final.mp4 (1920x1080, 30fps, 20.0s, ~11.2MB, high quality)
- Notes: Reused scene-1 logo + scene-4 lockup from v1; rebuilt scenes 2-3 as WHY (gold-node swarm = open-source agents) + HOW (swarm converges to a single glowing core); dropped BUILD/RUN/GROW + light-bar wipe. Tagline updated to "An AI company you can actually hire." Particle phases retimed; lint 0/0, validate clean, inspect clean. 1 draft + 1 final render.

## 2026-06-30 — Amagna teaser v2 — scene-3 recut (AM monogram + diagonal HOW ladder), removed WHY/HOW labels
- Status: delivered
- Output: /Users/drekothapoet/dev/hf-renders/amagna-teaser-v2/renders/amagna-teaser-v2-final.mp4 (1920x1080, 30fps, 20.0s, ~10.4MB, high quality)
- Notes: Edited shipped v2 in place. Removed the never-meant-to-render #s2-label ("Why") and #s3-label ("How") corner labels + their tweens. Rebuilt scene 3 (HOW, 10-15s): replaced the generic core-dot/glow with the REAL Amagna AM vector monogram (crisp gold stroke-on via stroke-dashoffset, deterministic getTotalLength) + radial gold combine-flash glow. Particle HOW phase retimed — select(10-11, core brighten/rest dim) → converge to monogram center(11-12) → disperse/fade(12-13) → faint residual(13-15). Mark recedes to watermark strength (~0.24) so a diagonal 3-clause copy ladder ("We take the strongest," / "build them for companies," / "and put them to work.") reads on top, cream type with gold accents on "strongest"/"work", eased diagonal slide-in. Scene 1/2/4 untouched. lint 0/0, validate clean, inspect 0 issues. 1 draft + 1 final render.

## 2026-06-30 — Amagna teaser v2 — timing+cleanup pass (≈20s→17s, removed slate/corner chrome, monogram stays bold through HOW)
- Status: delivered
- Output: /Users/drekothapoet/dev/hf-renders/amagna-teaser-v2/renders/amagna-teaser-v2-final.mp4 (1920x1080, 30fps, 16.5s, ~8.7MB, high quality)
- Notes: Edited shipped v2 in place (timing + cleanup only). Removed framing chrome — #s1-meta ("Amagna · Brand Film") + #s1-meta-r ("No. 001") slate text and the four .reg corner crosshairs (divs, CSS, GSAP tweens all deleted). Retimed total 20.0s→16.5s: Scene 1 logo trimmed ~1s lead-in (action from 0:00, dive 4.0→2.9), Scene 2 WHY cut ~3s with snappier exit (2.9→5.9), Scene 3 HOW +0.5s (5.9→11.4), Scene 4 WHAT internals identical shifted −3.6s (11.4→16.4). AM monogram formation kept identical (stroke-dashoffset draw-on + combine-flash, lands ~8.0s); DELETED the dim-to-watermark tween so the mark stays BOLD/full-opacity top-center for the entire HOW scene under the 3-clause ladder copy. Particle driver clock retimed to t:16.5 linear; all drawParticles phase boundaries realigned to new scene seams (burst 0-2.0, swarm 2.9-5.9, HOW select/converge/disperse/residual 5.9-11.4, bloom→navy fade by 16.4). Palette preserved (navy/purple/gold/cream, no blue). lint 0/0, validate clean, inspect 0 issues. ffprobe 16.5s / 1920x1080 / 30fps. 1 draft + 1 final render.

## 2026-06-30 — Amagna teaser v2 — +0.5s Scene-2 reading time (16.5s→17.0s)
- Status: delivered
- Output: /Users/drekothapoet/dev/hf-renders/amagna-teaser-v2/renders/amagna-teaser-v2-final.mp4
- Notes: Pure timing tweak, edited in place. Extended Scene-2 (WHY) HOLD by +0.5s (entrance unchanged); Scene-2 exit and everything downstream (all Scene 3 + Scene 4, plus drawParticles phase boundaries at/after the swarm→HOW handoff) shifted +0.5s. data-duration 16.5→17.0 and particle clock tween t/duration 16.5→17.0. Nothing else changed (palette/eases/copy/monogram-stays-bold intact). check 0 errors. ffprobe 17.0s / 1920x1080 / 30fps. Frames @5.0s (WHY held/readable) and @11.0s (monogram bold, ladder readable) verified, no seam/no blue.

## 2026-06-30 — Amagna teaser v2 — seamless-loop outro (end fades to opening #07040f) + faster S2→S3 transition
- Status: delivered
- Output: /Users/drekothapoet/dev/hf-renders/amagna-teaser-v2/renders/amagna-teaser-v2-final.mp4 — 16.13s
- Notes: Edited in place. CHANGE 1 — added loop outro: final ~0.7s fades all Scene-4 lockup elements (#lock-wm/#lock-rule/#lock-tag/#lock-url/#lock-glow) to opacity 0, ramps gold particles to ~0, and tweens #bg back to opening #07040f (replaced old navy #150a2c settle) so last frame ≈ first frame (dark near-empty) and loops seamlessly. CHANGE 2 — S2→S3: Scene-2 entrance/hold/text-out unchanged; particle convergence now begins on text-out at 6.4 (removed dead select-brighten gap, converge 7.2→8.4 retimed to 6.4→7.4) and monogram formation + all of Scene 3 + Scene 4 pulled −0.9s earlier; realigned all drawParticles phase boundaries (scene3 <11.0, scene4 fade 15.4-15.95). data-duration 17.0→16.1, clock tween t/duration matched. Palette/eases/copy/monogram-stays-bold intact. check 0 errors/0 warnings/0 layout issues. ffprobe 16.13s / 1920x1080 / 30fps / 484 frames. Verified: first≈last (both #07040f near-empty), convergence landing by ~7.0s (vs ~8.5s before), monogram bold at 8.0s, no blue.

## 2026-06-30 — Amagna in-depth services video (/grow funnel, 6-agent ring, ~25s)
- Status: delivered
- Output: /Users/drekothapoet/dev/hf-renders/amagna-indepth/renders/amagna-indepth-final.mp4 (1920x1080, 30fps, 25.0s, high quality)
- Notes: New /grow-funnel in-depth video built in the v2 teaser visual DNA (shared #bg/#vignette/#grain layers, deterministic mulberry32 gold-particle canvas driven by a single linear clock.t, Playfair/Space Mono, AM monogram vector, v2 #lock-* close lockup). Replaced v2's scene structure with 6 scenes, data-duration=25, particle clock t:25 linear. S1 (0-3) cream Playfair opening line "One system. / A team of AI agents. / Built around your business." S2 (3-13) the centerpiece agent ring: AM monogram stays BOLD+CENTERED at ~(960,480), six gold nodes evenly on a R=320 ring (Content/Ads/Booking/Follow-Up/Reviews/SEO+AEO with descriptors), labels anchored OUTWARD (right side left-aligned, left side right-aligned, top/bottom centered) so nothing overlaps; sequential light-up at 3.8/5.3/6.8/8.3/9.8/11.3 each = spoke draw-on (stroke-dashoffset, getTotalLength read synchronously) -> dot pop (back.out) -> label+desc fade; all six held bright by ~12.4s. S3 (13-16) "And more Custom Agents". S4 (16-20) "Connect to the tools you already use" + italic "and automate them." S5 (20-22.5) big "Integrate AI Agents into Your Business." (gold accent). S6 (22.5-25) particle gather->bloom into AMAGNA AI lockup + tagline + amagna.co, settle to navy. Palette navy/purple/gold/cream only, NO blue, eased everywhere, smooth cross-fades. Determinism preserved (no Date.now/unseeded random/network/repeat:-1; centering baked into GSAP via xPercent/yPercent to avoid css-transform-conflict). check: 0 errors, 0 console errors, 0 layout issues (2 warnings only: file length + a benign opacity tween overlap). Self-critique frames @1/4.5/7/10/12.4/14/18/21/23/24.4s all verified readable. 1 draft + 1 final render (passed gate on first build).
