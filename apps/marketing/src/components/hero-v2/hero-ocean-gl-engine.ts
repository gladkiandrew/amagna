/**
 * hero-ocean-gl-engine.ts — a photoreal, GPU-simulated ocean (raw WebGL2).
 *
 * Andrew reviewed the Canvas-2D painterly seascape (`hero-ocean-engine.ts`) and
 * rejected it as not realistic enough — his reference is the GPU-simulated water
 * on bluemarinefoundation.com/the-sea-we-breathe: true perspective swell rolling
 * toward the camera, specular sun response, fresnel toward the horizon. The old
 * "Canvas 2D only, no WebGL" rule was lifted for the hero water (PLAN.md §1A).
 *
 * This is the realism engine: a single full-screen triangle fed to a fragment
 * shader that RAYMARCHES an analytic multi-octave wave heightfield. Each pixel
 * casts a camera ray, intersects the living water surface, derives a surface
 * normal from the same wave function it was drawn from (so the light provably
 * sits on the rendered surface), then shades it: deep-navy base, gold subsurface
 * scatter, sky reflection by fresnel, and a warm specular sun-glitter road.
 *
 * Palette law (brand-colors.md): warm gold sky, deep navy / blue-black water,
 * gold light response — NO purple anywhere in the water. We copy the reference's
 * *realism*, not its daylight-blue palette.
 *
 * Zero new dependencies — this is hand-written WebGL2, no three.js. Pure
 * renderer: the React canvas component owns the rAF loop, sizing, tiering,
 * visibility pause and adaptive degradation; this file only compiles the program
 * and paints one frame at time `t`.
 */

/** Live-tunable knobs (Andrew can dial calm ⇄ stormy after seeing it). */
export interface HeroOceanGLKnobs {
  /** Master perf knob: internal render resolution as a fraction of CSS px. */
  renderScale: number;
  /** Overall wave amplitude (swell height). */
  seaHeight: number;
  /** Choppiness of the wave crests. */
  choppy: number;
  /** Animation speed of the swell. */
  speed: number;
  /** Base spatial frequency of the swell (smaller = longer, slower rollers). */
  frequency: number;
}

export const DEFAULT_GL_KNOBS: HeroOceanGLKnobs = {
  renderScale: 1,
  seaHeight: 0.62,
  choppy: 3.6,
  speed: 0.82,
  frequency: 0.16,
};

const VERT_SRC = `#version 300 es
in vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

/**
 * The ocean fragment shader. The wave model (summed `sea_octave`s over a fractal
 * transform) and the height-map ray tracer are the well-established analytic
 * ocean approach; everything else — camera framing, the warm-gold Amagna sky,
 * the navy/gold water shading and tone curve — is tuned to brand.
 */
const FRAG_SRC = `#version 300 es
precision highp float;

out vec4 outColor;

uniform vec2  uResolution;
uniform float uTime;
uniform float uSeaHeight;
uniform float uChoppy;
uniform float uSpeed;
uniform float uFreq;

const int   ITER_GEOMETRY = 3;   // cheap trace pass
const int   ITER_FRAGMENT = 5;   // detailed normal pass
const float PI = 3.141592653589793;

// --- Amagna palette (water stays deep navy / blue-black — no purple) ---
const vec3  SEA_BASE    = vec3(0.012, 0.040, 0.085); // deep navy / blue-black
const vec3  SEA_SCATTER = vec3(0.34, 0.30, 0.19);    // subsurface body (unchanged)
const vec3  SUN_TINT    = vec3(1.0, 0.72, 0.42);     // warm sunset specular glitter
// Low sun near the horizon, ahead of the camera (which looks down −z), so it
// sits just above the waterline. Pre-normalised: normalize(vec3(0,0.16,-1)).
// Drives the sky glow, the god rays, and the water's specular sun-glitter path.
const vec3  SUN_DIR     = vec3(0.0, 0.158, -0.9874);

#define SEA_TIME (1.0 + uTime * uSpeed)
const mat2 OCTAVE_M = mat2(1.6, 1.2, -1.2, 1.6);

mat3 fromEuler(vec3 ang) {
  vec2 a1 = vec2(sin(ang.x), cos(ang.x));
  vec2 a2 = vec2(sin(ang.y), cos(ang.y));
  vec2 a3 = vec2(sin(ang.z), cos(ang.z));
  mat3 m;
  m[0] = vec3(a1.y * a3.y + a1.x * a2.x * a3.x, a1.y * a2.x * a3.x + a3.y * a1.x, -a2.y * a3.x);
  m[1] = vec3(-a2.y * a1.x, a1.y * a2.y, a2.x);
  m[2] = vec3(a3.y * a1.x * a2.x + a1.y * a3.x, a1.x * a3.x - a1.y * a3.y * a2.x, a2.y * a3.y);
  return m;
}

float hash(vec2 p) {
  float h = dot(p, vec2(127.1, 311.7));
  return fract(sin(h) * 43758.5453123);
}

float noise(in vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return -1.0 + 2.0 * mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

// Fractal noise for clouds — five octaves of value noise, remapped to ~[0,1].
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v * 0.5 + 0.5;
}

float diffuse(vec3 n, vec3 l, float p) { return pow(dot(n, l) * 0.4 + 0.6, p); }
float specular(vec3 n, vec3 l, vec3 e, float s) {
  float nrm = (s + 8.0) / (PI * 8.0);
  return pow(max(dot(reflect(e, n), l), 0.0), s) * nrm;
}

// Sunset sky (Andrew-approved — overrides the gold-only palette). Vivid warm
// orange at the waterline → gold → dusky rose → deep blue at the zenith, with a
// hot low sun glowing toward SUN_DIR. This is the base sky AND the sky the water
// reflects (called from getSeaColor), so the sea picks up the sunset tones.
vec3 getSkyColor(vec3 e) {
  float h = clamp(e.y, 0.0, 1.0);
  vec3 cHorizon = vec3(1.00, 0.41, 0.16); // vivid warm orange at the waterline
  vec3 cLow     = vec3(1.00, 0.58, 0.24); // orange-gold
  vec3 cMid     = vec3(0.72, 0.44, 0.40); // dusky rose transition
  vec3 cHigh    = vec3(0.12, 0.25, 0.47); // deep blue zenith
  vec3 col = mix(cHorizon, cLow, smoothstep(0.0, 0.09, h));
  col = mix(col, cMid, smoothstep(0.07, 0.30, h));
  col = mix(col, cHigh, smoothstep(0.28, 0.92, h));

  // Low sun: a broad warm glow plus a hot near-white core.
  float s = max(dot(e, SUN_DIR), 0.0);
  col += vec3(1.00, 0.60, 0.28) * pow(s, 5.0) * 0.55;
  col += vec3(1.00, 0.92, 0.78) * pow(s, 280.0) * 1.7;
  return col;
}

// Drama layer for the DIRECT sky only (skipped on the water, which reflects the
// cheaper gradient sky): crepuscular god rays fanning from the sun + warm-lit
// procedural clouds. Reference: the attached sunset photo (its sky only).
vec3 skyDrama(vec3 dir, vec3 col) {
  float sunAmt = max(dot(dir, SUN_DIR), 0.0);

  // God rays — bearing around the sun, modulated into spokes that fade with
  // angular distance from it.
  vec3 perp1 = normalize(cross(SUN_DIR, vec3(0.0, 1.0, 0.0)));
  vec3 perp2 = cross(SUN_DIR, perp1);
  vec2 q = vec2(dot(dir, perp1), dot(dir, perp2));
  float ang = atan(q.x, q.y);
  float rays = pow(0.5 + 0.5 * sin(ang * 14.0 + noise(q * 4.0) * 1.6), 2.0);
  col += vec3(1.0, 0.72, 0.40) * rays * pow(sunAmt, 2.2) * 0.42;

  // Clouds — fbm cover over a projected sky plane, warm underside near the sun,
  // cool blue-grey away from it, faded out at the horizon.
  vec2 cuv = dir.xz / max(dir.y, 0.06);
  cuv = cuv * 0.6 + vec2(uTime * 0.004, 0.0);
  float cover = smoothstep(0.50, 0.92, fbm(cuv));
  vec3 cloudWarm = vec3(1.00, 0.52, 0.40);
  vec3 cloudCool = vec3(0.26, 0.28, 0.40);
  vec3 cloudCol = mix(cloudCool, cloudWarm, pow(sunAmt, 1.5) * 0.85 + 0.12);
  float cloudFade = smoothstep(0.015, 0.16, dir.y);
  col = mix(col, cloudCol, cover * cloudFade * 0.8);
  return col;
}

float sea_octave(vec2 uv, float choppy) {
  uv += noise(uv);
  vec2 wv = 1.0 - abs(sin(uv));
  vec2 swv = abs(cos(uv));
  wv = mix(wv, swv, wv);
  return pow(1.0 - pow(wv.x * wv.y, 0.65), choppy);
}

float seaMap(vec3 p, int iters) {
  float freq = uFreq;
  float amp = uSeaHeight;
  float choppy = uChoppy;
  vec2 uv = p.xz; uv.x *= 0.75;
  float h = 0.0;
  for (int i = 0; i < 8; i++) {
    if (i >= iters) break;
    float d = sea_octave((uv + SEA_TIME) * freq, choppy);
    d += sea_octave((uv - SEA_TIME) * freq, choppy);
    h += d * amp;
    uv *= OCTAVE_M; freq *= 1.9; amp *= 0.22;
    choppy = mix(choppy, 1.0, 0.2);
  }
  return p.y - h;
}

vec3 getSeaColor(vec3 p, vec3 n, vec3 l, vec3 eye, vec3 dist) {
  float fresnel = clamp(1.0 - dot(n, -eye), 0.0, 1.0);
  fresnel = min(fresnel * fresnel * fresnel, 0.5);
  vec3 reflected = getSkyColor(reflect(eye, n));
  vec3 refracted = SEA_BASE + diffuse(n, l, 80.0) * SEA_SCATTER * 0.12;
  vec3 color = mix(refracted, reflected, fresnel);
  float atten = max(1.0 - dot(dist, dist) * 0.001, 0.0);
  color += SEA_SCATTER * (p.y - uSeaHeight) * 0.18 * atten;
  color += SUN_TINT * specular(n, l, eye, 60.0);
  return color;
}

vec3 getNormal(vec3 p, float eps) {
  vec3 n;
  n.y = seaMap(p, ITER_FRAGMENT);
  n.x = seaMap(vec3(p.x + eps, p.y, p.z), ITER_FRAGMENT) - n.y;
  n.z = seaMap(vec3(p.x, p.y, p.z + eps), ITER_FRAGMENT) - n.y;
  n.y = eps;
  return normalize(n);
}

float heightMapTracing(vec3 ori, vec3 dir, out vec3 p) {
  float tm = 0.0;
  float tx = 1000.0;
  float hx = seaMap(ori + dir * tx, ITER_GEOMETRY);
  if (hx > 0.0) { p = ori + dir * tx; return tx; }
  float hm = seaMap(ori + dir * tm, ITER_GEOMETRY);
  float tmid = 0.0;
  for (int i = 0; i < 8; i++) {
    tmid = mix(tm, tx, hm / (hm - hx));
    p = ori + dir * tmid;
    float hmid = seaMap(p, ITER_GEOMETRY);
    if (hmid < 0.0) { tx = tmid; hx = hmid; }
    else { tm = tmid; hm = hmid; }
  }
  return tmid;
}

vec3 getPixel(in vec2 coord, float time) {
  vec2 uv = coord / uResolution.xy;
  uv = uv * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;

  // Camera: just above the surface, pitched further down than before so the
  // horizon rides high and the sea fills most of the frame (more water, less
  // sky). Wave scale and the planetary horizon curvature (the length(uv) term)
  // are unchanged — only the pitch moved.
  vec3 ang = vec3(0.0, 0.38, 0.0);
  vec3 ori = vec3(0.0, 3.4, time * 0.0);
  vec3 dir = normalize(vec3(uv.xy, -2.0));
  dir.z += length(uv) * 0.14;
  dir = normalize(dir) * fromEuler(ang);

  vec3 p;
  heightMapTracing(ori, dir, p);
  vec3 dist = p - ori;
  vec3 n = getNormal(p, dot(dist, dist) * (0.10 / uResolution.x));

  // Direct sky gets the full drama (god rays + clouds); the water reflects the
  // cheaper gradient+glow sky inside getSeaColor, so it still picks up the
  // sunset tones and a convincing sun-glitter path.
  vec3 sky = getSkyColor(dir);
  if (dir.y > -0.03) sky = skyDrama(dir, sky);

  vec3 sea = getSeaColor(p, n, SUN_DIR, dir, dist);

  // Horizon haze: blend sky↔sea across the waterline so the seam is atmospheric,
  // not a hard line.
  vec3 color = mix(sky, sea, pow(smoothstep(0.0, -0.04, dir.y), 0.25));
  return color;
}

void main() {
  vec2 coord = gl_FragCoord.xy;
  vec3 color = getPixel(coord, uTime);
  // Gentle filmic gamma for richer contrast and deeper navies.
  color = pow(color, vec3(0.82));
  outColor = vec4(color, 1.0);
}`;

interface GLState {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  vao: WebGLVertexArrayObject;
  uResolution: WebGLUniformLocation | null;
  uTime: WebGLUniformLocation | null;
  uSeaHeight: WebGLUniformLocation | null;
  uChoppy: WebGLUniformLocation | null;
  uSpeed: WebGLUniformLocation | null;
  uFreq: WebGLUniformLocation | null;
}

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    // Surface the GLSL error in dev; the React layer falls back to Canvas 2D.
    if (typeof console !== 'undefined') {
      console.warn('[hero-ocean-gl] shader compile failed:', gl.getShaderInfoLog(sh));
    }
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/** Lightweight capability probe — does the browser give us a usable WebGL2 ctx? */
export function supportsWebGL2(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const c = document.createElement('canvas');
    return !!c.getContext('webgl2');
  } catch {
    return false;
  }
}

/**
 * The photoreal ocean renderer. Construct against a canvas; if WebGL2 or shader
 * compilation is unavailable, `ok` is false and the caller falls back to the
 * Canvas-2D engine.
 */
export class HeroOceanGL {
  private state: GLState | null = null;
  private knobs: HeroOceanGLKnobs;
  private widthPx = 0;
  private heightPx = 0;

  constructor(canvas: HTMLCanvasElement, knobs: HeroOceanGLKnobs = DEFAULT_GL_KNOBS) {
    this.knobs = { ...knobs };
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: 'high-performance',
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      if (typeof console !== 'undefined') {
        console.warn('[hero-ocean-gl] program link failed:', gl.getProgramInfoLog(program));
      }
      return;
    }

    // One full-screen triangle covers the viewport with no index buffer.
    const vao = gl.createVertexArray();
    const buf = gl.createBuffer();
    if (!vao || !buf) return;
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    this.state = {
      gl,
      program,
      vao,
      uResolution: gl.getUniformLocation(program, 'uResolution'),
      uTime: gl.getUniformLocation(program, 'uTime'),
      uSeaHeight: gl.getUniformLocation(program, 'uSeaHeight'),
      uChoppy: gl.getUniformLocation(program, 'uChoppy'),
      uSpeed: gl.getUniformLocation(program, 'uSpeed'),
      uFreq: gl.getUniformLocation(program, 'uFreq'),
    };
  }

  /** True when WebGL2 + shaders compiled and the engine can render. */
  get ok(): boolean {
    return this.state !== null;
  }

  /** Swap render scale live (adaptive degradation re-layouts the backing store). */
  setRenderScale(scale: number): void {
    this.knobs.renderScale = scale;
  }

  getRenderScale(): number {
    return this.knobs.renderScale;
  }

  /**
   * Size the backing store. `cssW`/`cssH` are layout px; `pixelRatio` already
   * folds in the DPR cap. Internal resolution = css × pixelRatio × renderScale —
   * water hides the upscaling, so sub-native resolution is the cheap perf win.
   */
  layout(cssW: number, cssH: number, pixelRatio: number): void {
    const s = this.state;
    if (!s) return;
    const scale = pixelRatio * this.knobs.renderScale;
    const w = Math.max(1, Math.round(cssW * scale));
    const h = Math.max(1, Math.round(cssH * scale));
    this.widthPx = w;
    this.heightPx = h;
    s.gl.canvas.width = w;
    s.gl.canvas.height = h;
    s.gl.viewport(0, 0, w, h);
  }

  /** Paint one frame at `tSec` seconds. */
  draw(tSec: number): void {
    const s = this.state;
    if (!s || !this.widthPx) return;
    const { gl } = s;
    gl.useProgram(s.program);
    gl.bindVertexArray(s.vao);
    gl.uniform2f(s.uResolution, this.widthPx, this.heightPx);
    gl.uniform1f(s.uTime, tSec);
    gl.uniform1f(s.uSeaHeight, this.knobs.seaHeight);
    gl.uniform1f(s.uChoppy, this.knobs.choppy);
    gl.uniform1f(s.uSpeed, this.knobs.speed);
    gl.uniform1f(s.uFreq, this.knobs.frequency);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);
  }

  /**
   * Release GL resources. We deliberately do NOT call
   * `WEBGL_lose_context.loseContext()`: React reuses the same `<canvas>` DOM
   * node across a StrictMode mount→cleanup→remount cycle, and a force-lost
   * context stays lost on re-acquire — poisoning the second mount (shader
   * compiles fail with an empty log) and dropping us to the 2D fallback. We only
   * ever hold one context, so freeing the program/VAO/buffer is enough; the
   * context is released by GC when the canvas is gone.
   */
  dispose(): void {
    const s = this.state;
    if (!s) return;
    const { gl } = s;
    gl.deleteProgram(s.program);
    gl.deleteVertexArray(s.vao);
    this.state = null;
  }
}
