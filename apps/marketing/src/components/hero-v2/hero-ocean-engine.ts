/**
 * hero-ocean-engine.ts — a FRESH, hero-only painterly seascape (Canvas 2D).
 *
 * Deliberately NOT `home/ocean/ocean-engine.ts` (that one reads as a near-flat
 * dark gradient with barely-visible swells, kept intact for v1). This engine is
 * a cinematic, atmospheric ocean: warm dusty-gold sky above a real horizon line
 * with a hazy bloom, deep navy water below, slow rolling parallax swells with
 * BRIGHT cream/gold crest rims (the readability move), subtle god-rays in the
 * upper atmosphere, horizon haze for depth, and gold/white specular twinkles.
 *
 * Static hero only — no ship, no pointer, no scroll coupling. Pure renderer:
 * the canvas component owns the rAF loop, sizing, tiering, and reduced-motion /
 * visibility lifecycle; this file only lays out the scene and paints one frame.
 */

/** Everything Andrew can dial after seeing it (calm ⇄ busy). */
export interface HeroOceanKnobs {
  /** Base crest amplitude in px (scaled up per layer toward the foreground). */
  amplitude: number;
  /** Base wavelength in px (scaled up per layer toward the foreground). */
  wavelength: number;
  /** How many stacked wave layers (back/horizon → front/bottom). 4–6. */
  layerCount: number;
  /** Crest rim-light strength, 0..1 — what makes the waves legible. */
  crestContrast: number;
  /** Global animation speed (slow rolling ≈ 0.5–0.9, livelier ≈ 1.3+). */
  speed: number;
  /** Specular glints scattered per layer crest (bonus knob). */
  glintDensity: number;
  /** Faint foam line on the front-most layers (bonus knob). */
  foam: boolean;
}

/** Calm, cinematic default tuned for the desktop hero. */
export const DEFAULT_KNOBS: HeroOceanKnobs = {
  amplitude: 16,
  wavelength: 540,
  layerCount: 5,
  crestContrast: 0.95,
  speed: 0.72,
  glintDensity: 7,
  foam: true,
};

/**
 * Mobile override — FEWER layers, but the waves must STAY clearly visible (the
 * spec forbids degrading to a gradient). We keep amplitude + crest contrast and
 * only thin layer/glint counts so fill-rate drops without killing the form.
 */
export const MOBILE_KNOBS: Partial<HeroOceanKnobs> = {
  layerCount: 4,
  glintDensity: 4,
  wavelength: 440,
};

/* --- Palette. Post-sunset AFTERGLOW (matches the WebGL hero). Purple is
   approved in the SKY only; the water stays deep navy with warm orange/pink
   glints near the horizon — NO purple in the water. */
const SKY_TOP = '#241A42'; // dusk blue-purple, zenith
const SKY_MID = '#7C3D9C'; // bright purple (sky only)
const SKY_PINK = '#C85A82'; // pink band
const SKY_HORIZON = '#E87432'; // warm orange just above the waterline
const BLOOM = '#F0883A'; // warm orange afterglow bloom (additive)
const WATER_HORIZON = '#1A2C46'; // navy just under the horizon (lifted)
const WATER_MID = '#0C1626';
const WATER_DEEP = '#05080F'; // deepest foreground — NOT pure black
const WATER_FAR = '#22344E'; // far-wave fill (hazier/lighter for depth)
const CREST_CREAM = '#FAF8F3'; // brightest crest rim (foreground)
const CREST_GOLD = '#E0894F'; // warm afterglow crest (distance)
const GLINT_GOLD = '#E0935A'; // warm afterglow specular glint
const RAY_GOLD = '#E6C988'; // (unused — sun has set, no rays)

/** One stacked wave band, precomputed on layout. */
interface Layer {
  baseY: number;
  amp: number;
  wavelength: number;
  /** Horizontal drift in px/sec; each layer differs for parallax depth. */
  driftPx: number;
  phase: number;
  /** 0 (far/horizon) … 1 (near/bottom). */
  depth: number;
  fillTop: string;
  fillBottom: string;
  glints: { fx: number; tw: number; gold: boolean }[];
}

/** Tiny deterministic PRNG (mulberry32) so glints don't reshuffle on resize. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Linear-interpolate two hex colours (#rrggbb) → rgb() string. */
function mix(a: string, b: string, t: number): string {
  const ai = parseInt(a.slice(1), 16);
  const bi = parseInt(b.slice(1), 16);
  const ar = (ai >> 16) & 255;
  const ag = (ai >> 8) & 255;
  const ab = ai & 255;
  const br = (bi >> 16) & 255;
  const bg = (bi >> 8) & 255;
  const bb = bi & 255;
  return `rgb(${Math.round(ar + (br - ar) * t)}, ${Math.round(ag + (bg - ag) * t)}, ${Math.round(ab + (bb - ab) * t)})`;
}

/** Smooth 0..1. */
function easeInOut(t: number): number {
  return t * t * (3 - 2 * t);
}

export class HeroOcean {
  private knobs: HeroOceanKnobs;
  private width = 0;
  private height = 0;
  private dpr = 1;
  private horizonY = 0;
  private layers: Layer[] = [];

  constructor(knobs: HeroOceanKnobs = DEFAULT_KNOBS) {
    this.knobs = { ...knobs };
  }

  /** Swap knobs live (Andrew dialing calm⇄busy) — relayouts the layers. */
  setKnobs(knobs: HeroOceanKnobs): void {
    this.knobs = { ...knobs };
    if (this.width && this.height) this.layout(this.width / this.dpr, this.height / this.dpr, this.dpr);
  }

  getKnobs(): HeroOceanKnobs {
    return { ...this.knobs };
  }

  /** Recompute layer geometry. `width`/`height` are CSS px; scaled by `dpr`. */
  layout(width: number, height: number, dpr: number): void {
    this.dpr = dpr;
    this.width = width * dpr;
    this.height = height * dpr;
    // Horizon rides high (matches the WebGL hero): more water, a thin afterglow
    // sky band above.
    this.horizonY = this.height * 0.24;

    const { layerCount, amplitude, wavelength, speed } = this.knobs;
    const rng = mulberry32(0x5ea0ce); // fixed seed → stable glints across resizes
    const layers: Layer[] = [];
    const top = this.horizonY;
    const bottom = this.height * 1.03; // push past the edge so there's no gap

    for (let i = 0; i < layerCount; i += 1) {
      const depth = layerCount === 1 ? 1 : i / (layerCount - 1); // 0 far … 1 near
      const e = easeInOut(depth);
      const baseY = top + (bottom - top) * e; // waterlines bunch near horizon
      const amp = amplitude * dpr * (0.35 + 1.5 * depth); // foreground taller
      const wl = wavelength * dpr * (0.6 + 0.95 * depth); // foreground longer
      const dir = i % 2 === 0 ? 1 : -1; // alternating = cross-swell
      const driftPx = speed * dpr * (6 + 16 * depth) * dir; // slow, depth-scaled

      const glints = [];
      const count = Math.round(this.knobs.glintDensity * (0.5 + depth));
      for (let g = 0; g < count; g += 1) {
        glints.push({ fx: rng(), tw: rng() * Math.PI * 2, gold: rng() > 0.45 });
      }

      layers.push({
        baseY,
        amp,
        wavelength: wl,
        driftPx,
        phase: rng() * Math.PI * 2,
        depth,
        fillTop: mix(WATER_FAR, WATER_MID, e),
        fillBottom: mix(WATER_MID, WATER_DEEP, Math.min(1, e + 0.2)),
        glints,
      });
    }
    this.layers = layers;
  }

  /** Crest y for a layer at device-x `x`, time `tSec`. */
  private crestY(x: number, layer: Layer, tSec: number): number {
    const k1 = (2 * Math.PI) / layer.wavelength;
    const k2 = (2 * Math.PI) / (layer.wavelength * 0.47);
    const k3 = (2 * Math.PI) / (layer.wavelength * 0.23);
    const d = (tSec * layer.driftPx) / layer.wavelength * Math.PI * 2;
    return (
      layer.baseY +
      layer.amp *
        (0.6 * Math.sin(k1 * x + layer.phase + d) +
          0.28 * Math.sin(k2 * x + layer.phase * 1.7 + d * 1.4) +
          0.12 * Math.sin(k3 * x + layer.phase * 0.6 + d * 2.0))
    );
  }

  /**
   * Paint one frame at `tSec` seconds. Called every rAF frame (animated) or
   * exactly once for the reduced-motion static frame (e.g. tSec = 9 — a pose
   * with clearly-formed crests).
   */
  draw(ctx: CanvasRenderingContext2D, tSec: number): void {
    const { width: w, height: h, horizonY } = this;
    if (!w || !h) return;

    this.drawSky(ctx);
    this.drawWater(ctx);
    this.drawHorizonHaze(ctx);
    // No god rays — the sun has set (afterglow).
    this.drawHorizonBloom(ctx);

    const step = Math.max(2 * this.dpr, w / 200);
    for (const layer of this.layers) this.drawLayer(ctx, layer, tSec, step);

    // Bottom vignette to seat the foreground + aid text contrast.
    const vig = ctx.createLinearGradient(0, h * 0.62, 0, h);
    vig.addColorStop(0, 'rgba(3,5,9,0)');
    vig.addColorStop(1, 'rgba(3,5,9,0.5)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, h * 0.62, w, h * 0.38);
    void horizonY;
  }

  private drawSky(ctx: CanvasRenderingContext2D): void {
    const { width: w, horizonY } = this;
    const pad = horizonY * 0.08;
    const sky = ctx.createLinearGradient(0, 0, 0, horizonY + pad);
    sky.addColorStop(0, SKY_TOP);
    sky.addColorStop(0.42, SKY_MID);
    sky.addColorStop(0.72, SKY_PINK);
    sky.addColorStop(1, SKY_HORIZON);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, horizonY + pad);
  }

  private drawWater(ctx: CanvasRenderingContext2D): void {
    const { width: w, height: h, horizonY } = this;
    const water = ctx.createLinearGradient(0, horizonY, 0, h);
    water.addColorStop(0, WATER_HORIZON);
    water.addColorStop(0.45, WATER_MID);
    water.addColorStop(1, WATER_DEEP);
    ctx.fillStyle = water;
    ctx.fillRect(0, horizonY, w, h - horizonY);
  }

  /** Soft warm haze sitting behind the far waves → atmospheric distance. */
  private drawHorizonHaze(ctx: CanvasRenderingContext2D): void {
    const { width: w, height: h, horizonY } = this;
    const band = h * 0.16;
    const haze = ctx.createLinearGradient(0, horizonY - band * 0.5, 0, horizonY + band);
    haze.addColorStop(0, 'rgba(232,116,50,0)');
    haze.addColorStop(0.4, 'rgba(232,116,50,0.24)');
    haze.addColorStop(1, 'rgba(232,116,50,0)');
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = haze;
    ctx.fillRect(0, horizonY - band * 0.5, w, band * 1.5);
    ctx.restore();
  }

  /** Bright hazy bloom across the horizon line (additive). */
  private drawHorizonBloom(ctx: CanvasRenderingContext2D): void {
    const { width: w, horizonY } = this;
    const r = w * 0.62;
    const bloom = ctx.createRadialGradient(w * 0.5, horizonY, 0, w * 0.5, horizonY, r);
    bloom.addColorStop(0, `${BLOOM}66`);
    bloom.addColorStop(0.35, `${BLOOM}26`);
    bloom.addColorStop(1, `${BLOOM}00`);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = bloom;
    ctx.fillRect(0, 0, w, horizonY * 1.5);
    ctx.restore();
  }

  /** Subtle light shafts slanting through the upper atmosphere (additive). */
  private drawGodRays(ctx: CanvasRenderingContext2D, tSec: number): void {
    const { width: w, horizonY } = this;
    const sunX = w * 0.62;
    const sunY = -horizonY * 0.18;
    const rayCount = 6;

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, w, horizonY + 1); // confine rays to the sky
    ctx.clip();
    ctx.globalCompositeOperation = 'lighter';

    for (let i = 0; i < rayCount; i += 1) {
      const t = i / (rayCount - 1);
      // Fan the bases across the width, with a slow lateral sway.
      const sway = Math.sin(tSec * 0.12 + i * 1.3) * w * 0.015;
      const baseX = w * (0.1 + 0.85 * t) + sway;
      const halfW = w * 0.05;
      const grad = ctx.createLinearGradient(sunX, sunY, baseX, horizonY);
      const a = 0.05 + 0.03 * (0.5 + 0.5 * Math.sin(tSec * 0.2 + i));
      grad.addColorStop(0, `rgba(230,201,136,${a.toFixed(3)})`);
      grad.addColorStop(1, 'rgba(230,201,136,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(sunX, sunY);
      ctx.lineTo(baseX - halfW, horizonY);
      ctx.lineTo(baseX + halfW, horizonY);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
    void RAY_GOLD;
  }

  private drawLayer(
    ctx: CanvasRenderingContext2D,
    layer: Layer,
    tSec: number,
    step: number,
  ): void {
    const { width: w, height: h } = this;

    // --- Fill silhouette. ---
    ctx.beginPath();
    ctx.moveTo(0, h);
    const firstY = this.crestY(0, layer, tSec);
    ctx.lineTo(0, firstY);
    for (let x = step; x <= w; x += step) ctx.lineTo(x, this.crestY(x, layer, tSec));
    ctx.lineTo(w, h);
    ctx.closePath();
    const fill = ctx.createLinearGradient(0, layer.baseY - layer.amp, 0, h);
    fill.addColorStop(0, layer.fillTop);
    fill.addColorStop(1, layer.fillBottom);
    ctx.fillStyle = fill;
    ctx.fill();

    // --- Crest rim-light: soft glow under a crisp bright line. ---
    const crestAlpha = this.knobs.crestContrast * (0.4 + 0.6 * layer.depth);
    const crestColor = layer.depth > 0.5 ? CREST_CREAM : CREST_GOLD;
    const trace = () => {
      ctx.beginPath();
      ctx.moveTo(0, firstY);
      for (let x = step; x <= w; x += step) ctx.lineTo(x, this.crestY(x, layer, tSec));
    };

    ctx.save();
    trace();
    ctx.strokeStyle = mix(CREST_GOLD, CREST_CREAM, layer.depth);
    ctx.globalAlpha = crestAlpha * 0.4;
    ctx.lineWidth = 4 * this.dpr;
    ctx.lineCap = 'round';
    ctx.shadowColor = CREST_GOLD;
    ctx.shadowBlur = 8 * this.dpr;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    trace();
    ctx.strokeStyle = crestColor;
    ctx.globalAlpha = crestAlpha;
    ctx.lineWidth = (layer.depth > 0.5 ? 1.7 : 1.2) * this.dpr;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();

    // --- Foam on the front-most layers. ---
    if (this.knobs.foam && layer.depth > 0.62) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, firstY + 2.5 * this.dpr);
      for (let x = step; x <= w; x += step) ctx.lineTo(x, this.crestY(x, layer, tSec) + 2.5 * this.dpr);
      ctx.strokeStyle = CREST_CREAM;
      ctx.globalAlpha = 0.15 * layer.depth;
      ctx.lineWidth = 2.4 * this.dpr;
      ctx.setLineDash([6 * this.dpr, 10 * this.dpr]);
      ctx.lineDashOffset = (tSec * 12 * this.dpr) % 1000;
      ctx.stroke();
      ctx.restore();
    }

    // --- Specular twinkles riding the crest. ---
    for (const gl of layer.glints) {
      const x = gl.fx * w;
      const y = this.crestY(x, layer, tSec);
      const tw = 0.5 + 0.5 * Math.sin(tSec * 1.5 + gl.tw);
      const a = (0.16 + 0.55 * layer.depth) * tw;
      if (a <= 0.02) continue;
      const r = (0.9 + 1.6 * layer.depth) * this.dpr;
      const c = gl.gold ? GLINT_GOLD : CREST_CREAM;
      const spark = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
      spark.addColorStop(0, c);
      spark.addColorStop(1, `${gl.gold ? GLINT_GOLD : '#FAF8F3'}00`);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = spark;
      ctx.beginPath();
      ctx.arc(x, y, r * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}
