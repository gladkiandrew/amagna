import Link from 'next/link';
import { Cinzel } from 'next/font/google';
import { ArrowRight, Check } from 'lucide-react';
import { AUDIT_HREF } from '@/lib/site';

/**
 * The homepage body — four numbered sections telling the Second Brain story
 * on the river canvas (Keito-style numbered system, Amagna voice):
 *
 *   01 What we install  — light, text left / vault-manifest card right
 *   02 What it runs     — dark deep-purple panel, the night shift (24/7)
 *   03 How it compounds — light, centered, the most air (the differentiator)
 *   04 How you start    — purple panel close with the Gold Map CTA
 *
 * Rhythm: canvas → dark panel → canvas → purple panel, so the page alternates
 * surfaces without ever burying the river for long. Entirely server-rendered,
 * zero client JS; all motion on the page belongs to the canvas behind it.
 */

// Cinzel (Roman-inscription face) for the step-chip numerals — the "engraved"
// thread that runs through the brand. Self-hosted, lazy (never on the LCP path).
const cinzel = Cinzel({ subsets: ['latin'], display: 'swap', preload: false });

const OUTPUTS = [
  {
    name: 'Marketing',
    body: 'Content, ads, and funnels generated from the vault — your voice, your offers, your market.',
  },
  {
    name: 'Outreach',
    body: 'Follow-ups and booking that know every lead’s full history before a word goes out.',
  },
  {
    name: 'Operations',
    body: 'Intake, scheduling, handoffs — the busywork lane, automated around how your team actually runs.',
  },
  {
    name: 'Reporting',
    body: 'Your numbers, read by the brain and explained in plain English. You approve what matters.',
  },
] as const;

const VAULT_LEDGER = [
  { k: 'Voice & brand', v: 'How you sound, everywhere' },
  { k: 'Customers & history', v: 'Every job, every conversation' },
  { k: 'Offers & pricing', v: 'What you sell, and to whom' },
  { k: 'Numbers & results', v: 'What’s working, in plain English' },
] as const;

const INSTALL_POINTS = [
  'The memory vault — one source of truth',
  'Custom agents, built for your mission',
  'A human approving anything that matters',
] as const;

const COMPOUND_STOPS = [
  { when: 'Month one', what: 'It knows your business.' },
  { when: 'Month six', what: 'It anticipates it.' },
  { when: 'Month twelve', what: 'It runs like it’s worked there for years.' },
] as const;

const START_STEPS = [
  { word: 'Chart', line: 'The Gold Map plots your route — free, and yours to keep.' },
  { word: 'Build', line: 'We install the vault, the agents, the whole brain.' },
  { word: 'Run', line: 'The crew executes. You stay in command.' },
] as const;

/** Numbered step mark — Cinzel numeral chip + hairline + small-caps eyebrow. */
function StepMark({
  n,
  eyebrow,
  onDark = false,
  center = false,
}: {
  n: string;
  eyebrow: string;
  onDark?: boolean;
  center?: boolean;
}): JSX.Element {
  const tone = onDark ? 'text-brand-warmgold' : 'text-brand-gold';
  const line = onDark ? 'bg-brand-warmgold/50' : 'bg-brand-gold/50';
  const chip = onDark
    ? 'border-brand-warmgold/50 bg-brand-warmgold/10 text-brand-warmgold'
    : 'border-brand-gold/50 bg-brand-gold/10 text-brand-gold';
  return (
    <p className={`flex items-center gap-4 ${center ? 'justify-center' : ''}`}>
      <span
        className={`${cinzel.className} flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-bold ${chip}`}
        aria-hidden
      >
        {n}
      </span>
      <span aria-hidden className={`h-px w-10 ${line}`} />
      <span className={`text-[11px] font-semibold uppercase tracking-[0.3em] ${tone}`}>
        {eyebrow}
      </span>
    </p>
  );
}

export function SecondBrainSteps(): JSX.Element {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6">
      {/* ── 01 · WHAT WE INSTALL ─────────────────────────────────────────── */}
      <section aria-labelledby="step-install-title" className="py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_420px] lg:gap-20">
          <div>
            <StepMark n="01" eyebrow="What we install" />
            <h2
              id="step-install-title"
              className="mt-6 max-w-[16ch] text-balance font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-brand-charcoal"
            >
              A Second Brain for your business.
            </h2>
            <p className="mt-6 max-w-[54ch] text-lg leading-[1.65] text-brand-slate">
              Not another tool. One vault holds everything your business knows — your voice, your
              customers, your numbers — with custom agents wired straight into it. We build it. We
              install it. It&apos;s yours.
            </p>
            <ul className="mt-9 space-y-4">
              {INSTALL_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3.5">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-gold/50 bg-brand-gold/10"
                  >
                    <Check className="h-3.5 w-3.5 text-brand-gold" />
                  </span>
                  <span className="leading-[1.55] text-brand-charcoal">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The vault manifest — what the brain holds. */}
          <div className="rounded-3xl border border-brand-gold/30 bg-white p-8 shadow-[0_1px_40px_-14px_rgba(93,46,140,0.3)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
              Inside the vault
            </p>
            <dl className="mt-6 divide-y divide-brand-gold/15">
              {VAULT_LEDGER.map((row) => (
                <div key={row.k} className="py-4 first:pt-0 last:pb-0">
                  <dt className="font-display text-lg font-semibold text-brand-charcoal">{row.k}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-brand-slate">{row.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 rounded-xl border border-brand-gold/30 bg-brand-gold/10 px-4 py-3 text-sm font-medium text-brand-charcoal">
              Sealed to your business. Yours, and no one else&apos;s.
            </p>
          </div>
        </div>
      </section>

      {/* ── 02 · WHAT IT RUNS — the night shift ──────────────────────────── */}
      <section aria-labelledby="step-runs-title" className="py-10 sm:py-14">
        <div className="rounded-[2rem] bg-brand-deep px-7 py-14 sm:px-12 sm:py-16 lg:px-16">
          <StepMark n="02" eyebrow="What it runs" onDark />
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2
              id="step-runs-title"
              className="max-w-[14ch] text-balance font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-brand-cream"
            >
              24/7 Execution.
            </h2>
            <p className="max-w-[38ch] text-lg leading-[1.6] text-brand-cream/75 lg:pb-2">
              Agents built for your mission run the work — in your name, with your approval.
            </p>
          </div>
          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OUTPUTS.map((o) => (
              <div
                key={o.name}
                className="rounded-2xl border border-brand-warmgold/20 bg-white/[0.04] p-6"
              >
                <h3 className="font-display text-xl font-semibold text-brand-cream">{o.name}</h3>
                <p className="mt-2.5 text-sm leading-[1.65] text-brand-cream/70">{o.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-9 text-sm leading-relaxed text-brand-cream/55">
            Every action is logged. Nothing outward-facing ships without your sign-off.
          </p>
        </div>
      </section>

      {/* ── 03 · HOW IT COMPOUNDS — the differentiator, the most air ─────── */}
      <section aria-labelledby="step-compounds-title" className="py-24 text-center sm:py-36">
        <StepMark n="03" eyebrow="How it compounds" center />
        <h2
          id="step-compounds-title"
          className="mx-auto mt-6 max-w-[14ch] text-balance font-display text-[clamp(2.6rem,5.8vw,4.4rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-brand-charcoal"
        >
          Continuous Feedback.
        </h2>
        <p className="mx-auto mt-7 max-w-[52ch] text-lg leading-[1.65] text-brand-slate sm:text-xl">
          Every finished task writes back to the vault. The ads learn from the calls. The content
          learns from the customers. Nothing your business learns is ever lost again.
        </p>

        {/* The compounding line — three stops on a gold current. */}
        <div className="relative mx-auto mt-16 max-w-[880px]">
          <div aria-hidden className="gold-seam absolute inset-x-8 top-[5px] hidden sm:block" />
          <ol className="grid gap-10 sm:grid-cols-3 sm:gap-6">
            {COMPOUND_STOPS.map((stop) => (
              <li key={stop.when} className="relative flex flex-col items-center">
                <span
                  aria-hidden
                  className="h-3 w-3 rotate-45 border border-brand-gold bg-brand-cream shadow-[0_0_12px_rgba(201,169,97,0.5)]"
                />
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
                  {stop.when}
                </p>
                <p className="mt-2 max-w-[24ch] text-balance font-display text-lg font-semibold leading-snug text-brand-charcoal">
                  {stop.what}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mx-auto mt-16 max-w-[38ch] text-balance font-display text-xl font-semibold italic leading-snug text-brand-purple sm:text-2xl">
          Off-the-shelf AI wakes up new every morning. Yours compounds.
        </p>
      </section>

      {/* ── 04 · HOW YOU START — the Gold Map close ──────────────────────── */}
      <section aria-labelledby="step-start-title" className="pb-24 pt-10 sm:pb-32 sm:pt-14">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2A1650] via-brand-purple/90 to-brand-deep px-7 py-14 sm:px-12 sm:py-16 lg:px-16">
          {/* a whisper of gold light in the panel's water */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_10%,rgba(212,184,115,0.14),transparent_60%)]"
          />
          <div className="relative">
            <StepMark n="04" eyebrow="How you start" onDark />
            <h2
              id="step-start-title"
              className="mt-6 max-w-[14ch] text-balance font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-brand-cream"
            >
              Chart your Gold Map.
            </h2>
            <p className="mt-5 max-w-[52ch] text-lg leading-[1.6] text-brand-cream/80">
              Every voyage starts with a map — a free, custom growth plan charted for your
              business. Yours to keep, whether you sail with us or not.
            </p>

            <div className="mt-11 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {START_STEPS.map((step) => (
                <div key={step.word}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-warmgold">
                    {step.word}
                  </p>
                  <div aria-hidden className="mt-3 h-px w-9 bg-brand-warmgold/40" />
                  <p className="mt-3 max-w-[30ch] leading-[1.6] text-brand-cream/80">{step.line}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-5">
              <Link
                href={AUDIT_HREF}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-warmgold px-8 py-4 text-sm font-semibold text-brand-deep transition-colors hover:bg-brand-warmgold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-2 focus-visible:ring-offset-brand-purple"
              >
                Chart Your Gold Map
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <p className="text-sm text-brand-cream/60">Free. No card. About three minutes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
