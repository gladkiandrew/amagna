/**
 * Ocean engine — pure Canvas 2D, no React, no dependencies.
 * See docs/marketing/PLAN.md §A (perf), §D (ship coupling), §F (tiers).
 *
 * Strategy: one camera window into a virtual sea. The water is rendered as a
 * stack of wave-silhouette layers (back→front) over a depth gradient — cheap
 * and reads as realistic swell. Antique-gold light glints on the crests; the
 * ship is a cached sprite seated on (and pitched to) the SAME wave field the
 * water is drawn from, so it provably sits on the surface.
 *
 * Color law (locked): blue-black water + gold glints, NO purple except the far
 * horizon band. See brand-guidelines.md color-job rules.
 */

export type Tier = 'high' | 'mid' | 'low';

const PALETTE = {
  horizon: '#1a0e36', // brand-deep — far horizon band ONLY
  surface: '#101a2b',
  mid: '#0b1220',
  deep: '#060a12',
  gold: '201, 169, 97', // brand-gold rgb
  warmGold: '212, 184, 115', // brand-warmgold rgb
};

type WaveLayer = {
  baseFrac: number; // vertical seat as fraction of height (0 top … 1 bottom)
  amp: number; // px
  len: number; // wavelength px
  speed: number; // rad/s
  phase: number;
  amp2: number; // secondary chop
  len2: number;
  color: string;
  crest: number; // gold crest-highlight strength 0..1
};

const TIER_CONFIG: Record<Tier, { layers: number; glints: number; seg: number; dprCap: number }> = {
  high: { layers: 5, glints: 46, seg: 6, dprCap: 2 },
  mid: { layers: 4, glints: 30, seg: 9, dprCap: 1.5 },
  low: { layers: 2, glints: 14, seg: 14, dprCap: 1 },
};

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export class OceanEngine {
  private ctx: CanvasRenderingContext2D;
  private tier: Tier;
  private cfg: (typeof TIER_CONFIG)[Tier];
  private layers: WaveLayer[] = [];

  private cssW = 0;
  private cssH = 0;
  private dpr = 1;

  private t = 0; // accumulated seconds (wave/glint phase)

  // Targets vs eased (premium inertia — see §D).
  private progress = 0; // raw scroll progress 0..1
  private progEased = 0;
  // Light direction is FIXED at center — cursor-aware effects are excluded
  // by brand rule (master spec §D.6). Moving water is the only "response".
  private readonly lightX = 0.5;

  ship: HTMLImageElement | HTMLCanvasElement | null = null;
  private shipReady = false;

  // Time-based intro (sail-in). Starts when the sprite is ready and runs on
  // the engine clock — NOT scroll — so the ship is alive at scroll = 0.
  private introT = 0;
  private static readonly INTRO_DUR = 3.2; // seconds

  constructor(ctx: CanvasRenderingContext2D, tier: Tier) {
    this.ctx = ctx;
    this.tier = tier;
    this.cfg = TIER_CONFIG[tier];
    this.buildLayers();
  }

  get dprCap(): number {
    return this.cfg.dprCap;
  }

  setShip(img: HTMLImageElement | HTMLCanvasElement): void {
    this.ship = img;
    this.shipReady = true;
    this.introT = 0; // begin the sail-in the moment the sprite exists
  }

  private buildLayers(): void {
    const n = this.cfg.layers;
    const layers: WaveLayer[] = [];
    for (let i = 0; i < n; i++) {
      const f = i / (n - 1 || 1); // 0 back … 1 front
      layers.push({
        baseFrac: lerp(0.52, 0.96, f),
        amp: lerp(5, 16, f),
        len: lerp(520, 240, f),
        speed: lerp(0.35, 0.7, f) * (i % 2 === 0 ? 1 : -1),
        phase: i * 1.7,
        amp2: lerp(2, 7, f),
        len2: lerp(150, 70, f),
        color: this.mixDepth(f),
        crest: lerp(0.15, 0.6, f),
      });
    }
    this.layers = layers;
  }

  /** Blend the depth ramp from back (lit surface) to front (deep trough). */
  private mixDepth(f: number): string {
    const stops =
      f < 0.5
        ? [PALETTE.surface, PALETTE.mid, smoothstep(0, 0.5, f)]
        : [PALETTE.mid, PALETTE.deep, smoothstep(0.5, 1, f)];
    return mixHex(stops[0] as string, stops[1] as string, stops[2] as number);
  }

  resize(cssW: number, cssH: number, dpr: number): void {
    this.cssW = cssW;
    this.cssH = cssH;
    this.dpr = dpr;
  }

  setProgress(p: number): void {
    this.progress = clamp(p, 0, 1);
  }

  /** Surface y at world x for a given layer, plus analytic slope (for pitch). */
  private surface(layer: WaveLayer, x: number): { y: number; slope: number } {
    const k1 = (Math.PI * 2) / layer.len;
    const k2 = (Math.PI * 2) / layer.len2;
    const a1 = layer.phase + k1 * x + layer.speed * this.t;
    const a2 = layer.phase * 1.3 + k2 * x + layer.speed * 1.6 * this.t;
    const baseY = this.cssH * layer.baseFrac;
    const y = baseY + layer.amp * Math.sin(a1) + layer.amp2 * Math.sin(a2);
    const slope = layer.amp * k1 * Math.cos(a1) + layer.amp2 * k2 * Math.cos(a2);
    return { y, slope };
  }

  /** Advance time + ease targets. dt in seconds. */
  update(dt: number): void {
    this.t += dt;
    if (this.shipReady) this.introT = Math.min(this.introT + dt, OceanEngine.INTRO_DUR);
    const ease = (cur: number, target: number, tau: number) =>
      cur + (target - cur) * (1 - Math.exp(-dt / tau));
    this.progEased = ease(this.progEased, this.progress, 0.12);
  }

  /** One full render pass (back → front). */
  render(): void {
    const { ctx, cssW: W, cssH: H } = this;
    ctx.clearRect(0, 0, W, H);

    // 1) Depth gradient base (horizon purple only at the very top band).
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, PALETTE.horizon);
    g.addColorStop(0.16, PALETTE.surface);
    g.addColorStop(0.55, PALETTE.mid);
    g.addColorStop(1, PALETTE.deep);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Soft gold horizon glow — fixed central light source (no cursor coupling).
    const lightX = W * this.lightX;
    const glow = ctx.createRadialGradient(lightX, H * 0.2, 0, lightX, H * 0.2, W * 0.6);
    glow.addColorStop(0, `rgba(${PALETTE.warmGold}, 0.16)`);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // 2) Wave layers, back → front.
    const seg = this.cfg.seg;
    for (let li = 0; li < this.layers.length; li++) {
      const layer = this.layers[li] as WaveLayer;
      ctx.beginPath();
      ctx.moveTo(0, H);
      let firstY = 0;
      for (let x = 0; x <= W + seg; x += seg) {
        const { y } = this.surface(layer, x);
        if (x === 0) firstY = y;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fillStyle = layer.color;
      ctx.fill();

      // Gold crest highlight on the lit side (front layers carry more).
      if (layer.crest > 0.18) {
        ctx.beginPath();
        for (let x = 0; x <= W + seg; x += seg) {
          const { y, slope } = this.surface(layer, x);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          void slope;
        }
        const grad = ctx.createLinearGradient(0, 0, W, 0);
        const lit = this.lightX;
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(clamp(lit, 0.05, 0.95), `rgba(${PALETTE.gold}, ${0.13 * layer.crest})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.25;
        ctx.stroke();
        void firstY;
      }
    }

    // 3) Sparse additive gold glints near the front crest.
    this.renderGlints();

    // 4) The ship, seated on the frontmost wave.
    this.renderShip();

    // 5) Foreground vignette — pulled back (was 0.55) so the gold crest glints
    // and horizon glow carry; just enough edge darkening for text contrast.
    const vig = ctx.createRadialGradient(W / 2, H * 0.5, H * 0.5, W / 2, H * 0.5, H * 1.05);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(3,6,12,0.3)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);
  }

  private renderGlints(): void {
    const { ctx, cssW: W } = this;
    const front = this.layers[this.layers.length - 1] as WaveLayer;
    const mid = this.layers[Math.max(0, this.layers.length - 2)] as WaveLayer;
    const n = this.cfg.glints;
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < n; i++) {
      // Deterministic pseudo-random scatter (no Math.random — SSR/replay safe).
      const r = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const rx = (r < 0 ? r + 1 : r);
      const layer = i % 3 === 0 ? mid : front;
      const x = rx * W;
      const { y } = this.surface(layer, x);
      // Twinkle + concentrate near the light.
      const twinkle = 0.5 + 0.5 * Math.sin(this.t * 2.2 + i * 1.7);
      const nearLight = 1 - Math.abs(x / W - this.lightX);
      const a = 0.06 + 0.22 * twinkle * clamp(nearLight, 0.15, 1);
      const radius = 0.8 + 1.8 * twinkle;
      const rg = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
      rg.addColorStop(0, `rgba(${PALETTE.warmGold}, ${a})`);
      rg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  private renderShip(): void {
    if (!this.shipReady || !this.ship) return;
    const { ctx, cssW: W, cssH: H } = this;
    const front = this.layers[this.layers.length - 1] as WaveLayer;

    // --- Time-based motion: a self-contained gentle sail-in on load, then an
    // ongoing slow bob/pitch on the engine clock. No scroll coupling — the
    // ship is alive at scroll = 0. Prow faces LEFT, so it enters from the
    // RIGHT and settles onto its seat (master spec §D.2).
    const intro = smoothstep(0, 1, this.introT / OceanEngine.INTRO_DUR); // 0→1 eased
    const landX = W < 768 ? 0.5 : 0.62; // seat: lower third, clear of the copy column
    const driftX = lerp(landX + 0.24, landX, intro);
    const ambient = 0.012 * Math.sin(this.t * 0.18); // perpetual slow drift
    const shipX = W * (driftX + ambient * intro);

    const { y, slope } = this.surface(front, shipX);

    // Scale — the deliberate focal element. The crew ship is a painterly
    // panorama (AR ~0.77), so it carries more width than the old sprite.
    const targetW = W < 768 ? clamp(W * 0.8, 280, 460) : clamp(W * 0.4, 380, 700);
    const ar = this.ship.height / this.ship.width || 0.77;
    const shipW = targetW;
    const shipH = targetW * ar;

    // Seat the hull slightly INTO the water so crests lap the keel; add an
    // independent slow bob on top of the wave seat so it never reads static.
    const bob = 3 * Math.sin(this.t * 0.5) * intro;
    const shipY = y - shipH * 0.4 + lerp(shipH * 0.08, 0, intro) + bob;
    const pitch = Math.atan(slope) * 0.42; // follows the wave field
    const roll = 0.02 * Math.sin(this.t * 0.55); // ongoing slow pitch/roll

    // Sail "breathing" — a hair of horizontal flex so the canvas never reads
    // frozen (true cloth flutter arrives with the Higgsfield ambient loop).
    const breathe = 1 + 0.005 * Math.sin(this.t * 0.7);

    ctx.save();
    ctx.globalAlpha = lerp(0, 1, smoothstep(0, 0.35, intro)); // fade with the sail-in
    ctx.translate(shipX, shipY);
    ctx.rotate(pitch + roll);
    ctx.scale(breathe, 1);

    // Gold reflection smear under the hull on the water.
    ctx.globalCompositeOperation = 'lighter';
    const refl = ctx.createLinearGradient(0, shipH * 0.18, 0, shipH * 0.6);
    refl.addColorStop(0, `rgba(${PALETTE.warmGold}, 0.12)`);
    refl.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = refl;
    ctx.fillRect(-shipW * 0.4, shipH * 0.18, shipW * 0.8, shipH * 0.45);
    ctx.globalCompositeOperation = 'source-over';

    ctx.drawImage(this.ship, -shipW / 2, -shipH / 2, shipW, shipH);

    // Dragon-prow shimmer: a slow additive gold pulse on the figurehead
    // (upper-left of the sprite). Time-based, subtle, never strobing.
    const prowX = -shipW * 0.38;
    const prowY = -shipH * 0.22;
    const pulse = 0.5 + 0.5 * Math.sin(this.t * 0.9);
    const shimmerA = (0.04 + 0.09 * pulse) * intro;
    ctx.globalCompositeOperation = 'lighter';
    const shim = ctx.createRadialGradient(prowX, prowY, 0, prowX, prowY, shipW * 0.16);
    shim.addColorStop(0, `rgba(${PALETTE.warmGold}, ${shimmerA})`);
    shim.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shim;
    ctx.beginPath();
    ctx.arc(prowX, prowY, shipW * 0.16, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    ctx.restore();
    void H;
  }

  /** Single static frame for prefers-reduced-motion (no loop). */
  renderStatic(): void {
    this.t = 6.2; // a flattering frozen phase
    this.introT = OceanEngine.INTRO_DUR; // ship fully arrived, no sail-in
    this.progEased = 0.12;
    this.render();
  }
}

/** Mix two #rrggbb hex colors. */
function mixHex(a: string, b: string, t: number): string {
  const pa = hexToRgb(a);
  const pb = hexToRgb(b);
  const r = Math.round(lerp(pa[0], pb[0], t));
  const g = Math.round(lerp(pa[1], pb[1], t));
  const bl = Math.round(lerp(pa[2], pb[2], t));
  return `rgb(${r}, ${g}, ${bl})`;
}
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

/** Pick a render tier from device hints (called once on mount). */
export function detectTier(): Tier {
  if (typeof window === 'undefined') return 'mid';
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const small = window.innerWidth < 768;
  if (coarse || small) return 'low';
  const cores = navigator.hardwareConcurrency ?? 4;
  const dpr = window.devicePixelRatio ?? 1;
  if (cores >= 8 && dpr <= 2) return 'high';
  return 'mid';
}
