'use client';

import { useState, useEffect, useId } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Copy, Check, ArrowRight, X as XIcon, Anchor } from 'lucide-react';
import { useReducedMotion } from '@/components/home/ocean/use-reduced-motion';
import { BOOK_A_CALL_HREF } from '@/lib/site';
import {
  emptyIntake,
  validateIntake,
  coercePlan,
  assembleKeyPrompt,
  BUSINESS_TYPES,
  REVENUE_RANGES,
  EMPLOYEE_RANGES,
  SOCIAL_CHANNELS,
  LINK_FIELDS,
  type GoldMapIntake,
  type GoldMapLinks,
  type GoldMapPlan,
} from '@/lib/gold-map-shared';
import { captureGoldMapIntake, generateGoldMapPlanAction, markGoldMapKeyed } from '@/app/audit/actions';
import { TurnstileWidget, TURNSTILE_ENABLED } from './turnstile-widget';

type Phase = 'intake' | 'forge' | 'turn' | 'digging' | 'chest' | 'plan';
type Errors = Partial<Record<keyof GoldMapIntake, string>>;

const DIG_LINES = [
  'The crew is digging at your X…',
  'reading the currents…',
  "charting what's buried…",
];

export function GoldMap(): JSX.Element {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('intake');
  const [intake, setIntake] = useState<GoldMapIntake>(emptyIntake);
  const [errors, setErrors] = useState<Errors>({});
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [keyText, setKeyText] = useState('');
  const [plan, setPlan] = useState<GoldMapPlan | null>(null);
  const [busy, setBusy] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [digError, setDigError] = useState<string | null>(null);

  const set = <K extends keyof GoldMapIntake>(k: K, v: GoldMapIntake[K]) =>
    setIntake((s) => ({ ...s, [k]: v }));

  // Step 1 → capture the lead immediately, then advance to Forge.
  const submitIntake = async () => {
    const e = validateIntake(intake);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setBusy(true);
    try {
      const res = await captureGoldMapIntake(intake);
      if (!res.ok) {
        setErrors(res.fieldErrors);
        return;
      }
      setSubmissionId(res.submissionId);
      setPhase('forge');
      scrollToTop();
    } finally {
      setBusy(false);
    }
  };

  // The dig — verify (bot check) + generate (cost-gated), then reveal the chest.
  const runDig = async (withKey: boolean) => {
    setDigError(null);
    setPhase('digging');
    scrollToTop();
    if (withKey && submissionId) {
      void markGoldMapKeyed({ submissionId, intake, key: keyText });
    }
    try {
      const res = await generateGoldMapPlanAction({
        submissionId,
        intake,
        key: withKey ? keyText : undefined,
        turnstileToken: turnstileToken ?? undefined,
      });
      if (!res.ok) {
        // Bot check failed or generation errored — send them back to re-verify.
        setTurnstileToken(null);
        setDigError(res.message ?? 'The crew couldn’t verify you. Complete the check and try again.');
        setPhase('turn');
        scrollToTop();
        return;
      }
      // Defense in depth: never hand a malformed plan to the render (it would
      // crash PlanView). The server already coerces, this is the backstop.
      const safePlan = coercePlan(res.plan);
      if (!safePlan) {
        setTurnstileToken(null);
        setDigError('The crew hit a snag charting your map. Please try the dig again.');
        setPhase('turn');
        scrollToTop();
        return;
      }
      setPlan(safePlan);
      setPhase('chest');
    } catch {
      setTurnstileToken(null);
      setDigError('Something went wrong on the dig. Please try again.');
      setPhase('turn');
      scrollToTop();
    }
  };

  return (
    <main className="relative isolate w-full overflow-hidden bg-brand-deep text-brand-cream">
      <GoldMapStyles />
      {/* Deep navy night with a faint warm glow, the voyage at dusk. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(212,184,115,0.12),transparent_60%)]"
      />

      <ScrollHero />

      <div className="mx-auto w-full max-w-[760px] px-5 pb-28 sm:px-6">
        {phase === 'intake' && (
          <IntakeForm intake={intake} errors={errors} set={set} busy={busy} onSubmit={submitIntake} />
        )}
        {phase === 'forge' && (
          <ForgeStep intake={intake} reduced={reduced} onNext={() => { setPhase('turn'); scrollToTop(); }} />
        )}
        {phase === 'turn' && (
          <TurnStep
            keyText={keyText}
            setKeyText={setKeyText}
            onTurn={() => runDig(true)}
            onFallback={() => runDig(false)}
            turnstileToken={turnstileToken}
            onToken={setTurnstileToken}
            error={digError}
          />
        )}
        {phase === 'digging' && <DigAnimation reduced={reduced} />}
        {(phase === 'chest' || phase === 'plan') && (
          <ChestAndPlan
            opened={phase === 'plan'}
            onOpen={() => { setPhase('plan'); }}
            plan={plan}
            reduced={reduced}
          />
        )}
      </div>
    </main>
  );
}

function scrollToTop() {
  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ------------------------------------------------------------------ */
/* The scroll (hero). Styled parchment placeholder — Andrew can drop in
   real scroll art later; the layout/copy stay.                        */
/* ------------------------------------------------------------------ */
function ScrollHero(): JSX.Element {
  const STEPS = ['Tell us about your business', 'Create Your Key', 'Find your Plan to Gold'];
  return (
    <section aria-labelledby="gm-title" className="mx-auto w-full max-w-[820px] px-5 pb-10 pt-16 text-center sm:px-6 sm:pt-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-brand-warmgold">The treasure hunt</p>
      <h1 id="gm-title" className="mt-4 font-display text-[clamp(2.6rem,8vw,5rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
        The Gold Map
      </h1>
      <p className="mx-auto mt-5 max-w-[24ch] text-balance font-display text-[clamp(1.3rem,3.4vw,2.1rem)] font-semibold leading-[1.1] text-brand-cream/95">
        Every Operator&apos;s Journey to Gold is Different
      </p>

      {/* Vertical parchment scroll (rolled ends top + bottom). */}
      <div className="relative mx-auto mt-12 max-w-[520px]">
        <div aria-hidden className="gm-roll gm-roll--top" />
        <div className="relative gm-parchment rounded-[6px] px-7 py-12 text-left sm:px-12">
          <p className="font-display text-xl font-semibold italic text-[#5b4a2a]">Here&apos;s how we find yours:</p>
          <ol className="mt-7 space-y-6">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#b8923f]/60 font-display text-lg font-semibold text-[#8a6a23]">
                  {i + 1}
                </span>
                <span className="pt-1 text-[1.05rem] leading-snug text-[#4a3c1f]">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div aria-hidden className="gm-roll gm-roll--bottom" />
      </div>
      <p className="mt-9 text-sm uppercase tracking-[0.18em] text-brand-warmgold/70">
        The crew reviews every application.
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shared field bits                                                   */
/* ------------------------------------------------------------------ */
const fieldClass =
  'mt-1.5 w-full rounded-md border border-brand-warmgold/30 bg-white/[0.06] px-3.5 py-2.5 text-brand-cream placeholder:text-brand-cream/40 outline-none transition focus:border-brand-warmgold focus:bg-white/[0.1] focus-visible:ring-2 focus-visible:ring-brand-warmgold/50';

function Field({
  label, children, error, htmlFor,
}: { label: string; children: React.ReactNode; error?: string; htmlFor: string }): JSX.Element {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-medium text-brand-cream/85">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}

function StepHead({ kicker, title, sub }: { kicker: string; title: string; sub?: string }): JSX.Element {
  return (
    <div className="mb-8 border-l-2 border-brand-warmgold/60 pl-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-warmgold">{kicker}</p>
      <h2 className="mt-2 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.015em]">
        {title}
      </h2>
      {sub && <p className="mt-3 max-w-[52ch] leading-[1.6] text-brand-cream/75">{sub}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 1 — Log your vessel (intake)                                   */
/* ------------------------------------------------------------------ */
function IntakeForm({
  intake, errors, set, busy, onSubmit,
}: {
  intake: GoldMapIntake;
  errors: Errors;
  set: <K extends keyof GoldMapIntake>(k: K, v: GoldMapIntake[K]) => void;
  busy: boolean;
  onSubmit: () => void;
}): JSX.Element {
  const id = useId();
  const toggleChannel = (c: string) =>
    set('socialChannels', intake.socialChannels.includes(c)
      ? intake.socialChannels.filter((x) => x !== c)
      : [...intake.socialChannels, c]);
  const setLink = (k: keyof GoldMapLinks, v: string) => set('links', { ...intake.links, [k]: v });
  const linkCount = LINK_FIELDS.filter(({ key }) => intake.links[key].trim()).length;

  return (
    <form
      className="rounded-2xl border border-brand-warmgold/20 bg-white/[0.03] p-6 sm:p-8"
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
      noValidate
    >
      <StepHead kicker="Step One" title="Log your vessel." sub="The boring-but-important details. This is what we follow up on — even if you stop here." />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor={`${id}-name`} error={errors.name}>
          <input id={`${id}-name`} className={fieldClass} value={intake.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
        </Field>
        <Field label="Email" htmlFor={`${id}-email`} error={errors.email}>
          <input id={`${id}-email`} type="email" className={fieldClass} value={intake.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />
        </Field>
        <Field label="Phone (optional)" htmlFor={`${id}-phone`}>
          <input id={`${id}-phone`} type="tel" className={fieldClass} value={intake.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" />
        </Field>
        <Field label="Business name" htmlFor={`${id}-bn`} error={errors.businessName}>
          <input id={`${id}-bn`} className={fieldClass} value={intake.businessName} onChange={(e) => set('businessName', e.target.value)} autoComplete="organization" />
        </Field>
        <Field label="Business type" htmlFor={`${id}-bt`} error={errors.businessType}>
          <select id={`${id}-bt`} className={fieldClass} value={intake.businessType} onChange={(e) => set('businessType', e.target.value)}>
            <option value="">Select one…</option>
            {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Service area" htmlFor={`${id}-sa`} error={errors.serviceArea}>
          <input id={`${id}-sa`} className={fieldClass} placeholder="City, region, or zip" value={intake.serviceArea} onChange={(e) => set('serviceArea', e.target.value)} />
        </Field>
        <Field label="Monthly revenue" htmlFor={`${id}-rev`} error={errors.monthlyRevenue}>
          <select id={`${id}-rev`} className={fieldClass} value={intake.monthlyRevenue} onChange={(e) => set('monthlyRevenue', e.target.value)}>
            <option value="">Select a range…</option>
            {REVENUE_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>
        <Field label="Team size" htmlFor={`${id}-emp`}>
          <select id={`${id}-emp`} className={fieldClass} value={intake.employees} onChange={(e) => set('employees', e.target.value)}>
            <option value="">Select a range…</option>
            {EMPLOYEE_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-brand-cream/85">Where you post now (pick any)</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SOCIAL_CHANNELS.map((c) => {
            const on = intake.socialChannels.includes(c);
            return (
              <button
                type="button"
                key={c}
                aria-pressed={on}
                onClick={() => toggleChannel(c)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold/60 ${
                  on
                    ? 'border-brand-warmgold bg-brand-warmgold text-brand-deep'
                    : 'border-brand-warmgold/30 text-brand-cream/80 hover:border-brand-warmgold/60'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Optional — collapsed so the form doesn't feel longer. */}
      <details className="group mt-6 rounded-xl border border-brand-warmgold/20 bg-white/[0.02]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-brand-cream/85 [&::-webkit-details-marker]:hidden">
          <span>
            Where you live online{' '}
            <span className="text-brand-cream/50">— optional, helps us build on what you&apos;ve got</span>
            {linkCount > 0 && (
              <span className="ml-2 rounded-full bg-brand-warmgold/20 px-2 py-0.5 text-xs text-brand-warmgold">
                {linkCount} added
              </span>
            )}
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-brand-warmgold transition-transform group-open:rotate-90" aria-hidden />
        </summary>
        <div className="grid gap-4 px-4 pb-5 pt-1 sm:grid-cols-2">
          {LINK_FIELDS.map(({ key, label, placeholder }) => (
            <Field key={key} label={`${label} (optional)`} htmlFor={`${id}-link-${key}`}>
              <input
                id={`${id}-link-${key}`}
                type="url"
                inputMode="url"
                autoComplete="off"
                className={fieldClass}
                placeholder={placeholder}
                value={intake.links[key]}
                onChange={(e) => setLink(key, e.target.value)}
              />
            </Field>
          ))}
        </div>
      </details>

      <div className="mt-6 grid gap-5">
        <Field label="What are you doing for marketing right now? (optional)" htmlFor={`${id}-cm`}>
          <textarea id={`${id}-cm`} rows={2} className={fieldClass} value={intake.currentMarketing} onChange={(e) => set('currentMarketing', e.target.value)} />
        </Field>
        <Field label="What do you want more of?" htmlFor={`${id}-goal`} error={errors.goals}>
          <textarea id={`${id}-goal`} rows={2} className={fieldClass} placeholder="e.g. more booked jobs in the slow months" value={intake.goals} onChange={(e) => set('goals', e.target.value)} />
        </Field>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="mt-8 inline-flex items-center gap-2 rounded-[3px] border border-brand-warmgold bg-brand-warmgold px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-deep transition hover:bg-brand-warmgold/90 disabled:opacity-60"
      >
        {busy ? 'Logging…' : 'Start the hunt'}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
      <p className="mt-3 text-xs text-brand-cream/55">Free. No card. Your plan is emailed to you and yours to keep.</p>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2 — Forge your key                                             */
/* ------------------------------------------------------------------ */
function ForgeStep({ intake, reduced, onNext }: { intake: GoldMapIntake; reduced: boolean; onNext: () => void }): JSX.Element {
  const [copied, setCopied] = useState(false);
  const prompt = assembleKeyPrompt(intake);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <section className="rounded-2xl border border-brand-warmgold/20 bg-white/[0.03] p-6 sm:p-8">
      <StepHead kicker="Step Two" title="Forge your key." sub="We built this prompt from your answers." />

      {/* Zeno video slot — drop-in like the example videos. */}
      <ZenoVideo reduced={reduced} />

      <div className="mt-6">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-[3px] border border-brand-warmgold bg-brand-warmgold px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-deep transition hover:bg-brand-warmgold/90"
        >
          {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
          {copied ? 'Copied' : 'Copy this prompt'}
        </button>
        <pre className="mt-4 max-h-64 overflow-auto rounded-lg border border-brand-warmgold/20 bg-black/30 p-4 text-xs leading-relaxed text-brand-cream/80 whitespace-pre-wrap">
{prompt}
        </pre>
      </div>

      <p className="mt-6 max-w-[60ch] leading-[1.7] text-brand-cream/80">
        Copy it into your own AI — ChatGPT, Claude, Gemini — the one that already knows you. Tell it your
        goals, give it everything. It&apos;ll hand you back one master prompt. That&apos;s your key.
      </p>

      <button
        type="button"
        onClick={onNext}
        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-warmgold underline decoration-brand-warmgold/40 decoration-1 underline-offset-[6px] transition hover:decoration-brand-warmgold"
      >
        I&apos;ve forged my key — turn it
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    </section>
  );
}

function ZenoVideo({ reduced }: { reduced: boolean }): JSX.Element {
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-brand-warmgold/30 bg-[#0a1322]">
      {(!ready || failed) && (
        <div className="absolute inset-0 flex items-center gap-4 p-5 sm:p-6">
          <div className="relative hidden h-full max-h-[140px] w-[120px] shrink-0 overflow-hidden rounded-lg border border-brand-warmgold/30 sm:block">
            <Image src="/brand/crew/zeno.webp" alt="Zeno, Captain" fill className="object-cover object-[center_18%]" sizes="120px" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-warmgold">Zeno explains — video coming soon</p>
            <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-brand-cream/75">
              Copy the prompt below into your own AI, add your goals and context, and it returns one
              dense &ldquo;master prompt.&rdquo; That&apos;s the key you&apos;ll turn in Step Three.
            </p>
          </div>
        </div>
      )}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src="/brand/gold-map/zeno-step2.mp4"
        muted
        loop
        playsInline
        autoPlay={!reduced}
        preload="metadata"
        aria-label="Zeno explains how to forge your key"
        onCanPlay={() => setReady(true)}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
        style={{ opacity: ready && !failed ? 1 : 0 }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3 — Turn the key                                               */
/* ------------------------------------------------------------------ */
function TurnStep({
  keyText, setKeyText, onTurn, onFallback, turnstileToken, onToken, error,
}: {
  keyText: string;
  setKeyText: (v: string) => void;
  onTurn: () => void;
  onFallback: () => void;
  turnstileToken: string | null;
  onToken: (token: string | null) => void;
  error: string | null;
}): JSX.Element {
  const id = useId();
  const hasKey = keyText.trim().length > 12;
  // When bot protection is on, both paths wait for a verified token.
  const needsToken = TURNSTILE_ENABLED && !turnstileToken;
  return (
    <section className="rounded-2xl border border-brand-warmgold/20 bg-white/[0.03] p-6 sm:p-8">
      <StepHead kicker="Step Three" title="Turn the key." sub="Paste your master prompt below. X marks the spot." />
      <label htmlFor={`${id}-key`} className="sr-only">Your master prompt (the key)</label>
      <textarea
        id={`${id}-key`}
        rows={6}
        className={fieldClass}
        placeholder="Paste the master prompt your AI gave you…"
        value={keyText}
        onChange={(e) => setKeyText(e.target.value)}
      />

      {/* Bot check — renders only when a site key is configured. */}
      <TurnstileWidget onToken={onToken} />

      {error && (
        <p role="alert" className="mt-4 rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onTurn}
          disabled={!hasKey || needsToken}
          className="inline-flex items-center justify-center gap-2 rounded-[3px] border border-brand-warmgold bg-brand-warmgold px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-deep transition hover:bg-brand-warmgold/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <XIcon className="h-4 w-4" aria-hidden />
          Mark the spot
        </button>
        <button
          type="button"
          onClick={onFallback}
          disabled={needsToken}
          className="text-left text-sm text-brand-cream/55 underline decoration-brand-cream/25 decoration-1 underline-offset-4 transition hover:text-brand-cream/80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          No AI handy? The crew can chart from your log alone →
        </button>
      </div>
      {needsToken && (
        <p className="mt-3 text-xs text-brand-cream/50">Complete the quick check above to dig.</p>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The dig (loading)                                                   */
/* ------------------------------------------------------------------ */
function DigAnimation({ reduced }: { reduced: boolean }): JSX.Element {
  const [line, setLine] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setLine((l) => (l + 1) % DIG_LINES.length), 2600);
    return () => window.clearInterval(t);
  }, []);
  return (
    <section aria-live="polite" className="flex flex-col items-center py-20 text-center">
      {reduced ? (
        <Anchor className="h-12 w-12 text-brand-warmgold" aria-hidden />
      ) : (
        <div className="gm-dig" aria-hidden>
          <svg viewBox="0 0 120 120" className="h-32 w-32">
            <circle cx="60" cy="78" r="34" fill="none" stroke="#D4B873" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="4 6" />
            <g className="gm-dig-x">
              <line x1="44" y1="62" x2="76" y2="94" stroke="#D4B873" strokeWidth="6" strokeLinecap="round" />
              <line x1="76" y1="62" x2="44" y2="94" stroke="#D4B873" strokeWidth="6" strokeLinecap="round" />
            </g>
            <g className="gm-dig-shovel">
              <rect x="58" y="14" width="4" height="34" rx="2" fill="#C9A961" />
              <path d="M50 46 h20 l-4 14 a6 6 0 0 1 -12 0 z" fill="#C9A961" />
            </g>
          </svg>
        </div>
      )}
      <p className="mt-8 font-display text-2xl font-semibold text-brand-cream">{DIG_LINES[line]}</p>
      <p className="mt-3 text-sm text-brand-cream/60">This can take up to a minute — the crew digs carefully.</p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The chest + the plan                                                */
/* ------------------------------------------------------------------ */
function ChestAndPlan({
  opened, onOpen, plan, reduced,
}: { opened: boolean; onOpen: () => void; plan: GoldMapPlan | null; reduced: boolean }): JSX.Element {
  return (
    <section className="py-10">
      {!opened ? (
        <div className="flex flex-col items-center py-10 text-center">
          <Chest open={false} reduced={reduced} />
          <button
            type="button"
            onClick={onOpen}
            className="mt-8 inline-flex items-center gap-2 rounded-[3px] border border-brand-warmgold bg-brand-warmgold px-9 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep transition hover:bg-brand-warmgold/90"
          >
            <XIcon className="h-4 w-4" aria-hidden /> Press X to open
          </button>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center text-center">
            <Chest open reduced={reduced} />
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.02]">
              No gold in here. Yet.
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-lg leading-[1.6] text-brand-cream/80">
              Gold doesn&apos;t get found — it gets made. Here&apos;s exactly how we&apos;d make yours:
            </p>
          </div>
          {plan && <PlanView plan={plan} />}
          <div className="mt-14 rounded-2xl border border-brand-warmgold/30 bg-white/[0.04] p-8 text-center">
            <h3 className="font-display text-[clamp(1.5rem,3.4vw,2.2rem)] font-semibold leading-[1.1]">
              The map is yours. The crew sails when you say go.
            </h3>
            <Link
              href={BOOK_A_CALL_HREF}
              className="mt-6 inline-flex items-center gap-2 rounded-[3px] border border-brand-warmgold bg-brand-warmgold px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-deep transition hover:bg-brand-warmgold/90"
            >
              Book the call <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

function Chest({ open, reduced }: { open: boolean; reduced: boolean }): JSX.Element {
  return (
    <svg viewBox="0 0 160 130" className={`h-36 w-44 ${open && !reduced ? 'gm-chest-open' : ''}`} aria-hidden>
      {/* body */}
      <rect x="24" y="60" width="112" height="56" rx="8" fill="#6b4a1e" stroke="#C9A961" strokeWidth="2" />
      <rect x="72" y="78" width="16" height="22" rx="3" fill="#C9A961" />
      {/* lid */}
      <g className="gm-lid" style={{ transformOrigin: '80px 60px' }}>
        <path d="M24 60 a56 30 0 0 1 112 0 z" fill="#7a5523" stroke="#C9A961" strokeWidth="2" />
        <rect x="72" y="50" width="16" height="14" rx="3" fill="#C9A961" />
      </g>
    </svg>
  );
}

function PlanView({ plan }: { plan: GoldMapPlan }): JSX.Element {
  return (
    <article className="mt-12 rounded-2xl border border-brand-warmgold/20 bg-white/[0.03] p-6 sm:p-9">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-warmgold">Your Plan to Gold</p>
      <h3 className="mt-3 font-display text-[clamp(1.5rem,3.6vw,2.3rem)] font-semibold leading-[1.1]">{plan.headline}</h3>
      <p className="mt-4 max-w-[62ch] leading-[1.7] text-brand-cream/80">{plan.summary}</p>

      <ol className="mt-9 space-y-7">
        {plan.phases.map((ph, i) => (
          <li key={i} className="border-t border-brand-warmgold/15 pt-6">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm font-semibold text-brand-warmgold">{String(i + 1).padStart(2, '0')}</span>
              <h4 className="font-display text-xl font-semibold text-brand-cream">{ph.title}</h4>
              <span className="text-xs uppercase tracking-wider text-brand-cream/50">{ph.timeframe}</span>
            </div>
            <ul className="mt-3 space-y-2 pl-7">
              {ph.steps.map((s, j) => (
                <li key={j} className="flex gap-2.5 leading-[1.6] text-brand-cream/80">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-warmgold" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-9 rounded-xl border border-brand-warmgold/15 bg-black/20 p-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-warmgold">What the crew handles for you</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {plan.crewHandles.map((c, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-[1.6] text-brand-cream/80">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-warmgold" aria-hidden />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-7 text-brand-cream/90">
        <span className="font-semibold text-brand-warmgold">First move:</span> {plan.firstMove}
      </p>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Scoped CSS (parchment + dig + chest), reduced-motion aware          */
/* ------------------------------------------------------------------ */
function GoldMapStyles(): JSX.Element {
  const css = `
.gm-parchment{
  background:
    radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.5), transparent 60%),
    linear-gradient(180deg,#f3e6c4 0%,#ecdcb0 50%,#e4d0a0 100%);
  box-shadow: inset 0 0 60px rgba(120,90,40,0.25), 0 24px 60px -24px rgba(0,0,0,0.6);
  border:1px solid rgba(150,120,60,0.4);
}
.gm-roll{height:26px;border-radius:13px;background:linear-gradient(180deg,#caa860,#7a5a23);box-shadow:inset 0 2px 4px rgba(255,255,255,0.4),0 6px 16px -6px rgba(0,0,0,0.6);}
.gm-roll--top{margin-bottom:-6px;}
.gm-roll--bottom{margin-top:-6px;}
@keyframes gmDig{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(10px) rotate(6deg)}}
.gm-dig-shovel{animation:gmDig 1.1s ease-in-out infinite;transform-origin:60px 30px;}
@keyframes gmPulse{0%,100%{opacity:.5}50%{opacity:1}}
.gm-dig-x{animation:gmPulse 1.6s ease-in-out infinite;}
.gm-lid{transition:transform .6s cubic-bezier(.34,1.56,.64,1);}
.gm-chest-open .gm-lid{transform:rotate(-42deg);}
@media (prefers-reduced-motion: reduce){
  .gm-dig-shovel,.gm-dig-x{animation:none}
  .gm-lid{transition:none}
}
`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
