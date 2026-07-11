import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AUDIT_HREF } from '@/lib/site';

/**
 * Homepage Frame 2 — the Second Brain.
 *
 * Server-rendered with ZERO client JS on the critical path (softlaunch hard
 * rule): the frame is what Amagna actually builds — one central memory vault
 * with custom agents wired into it — drawn as a static top-down flow. The only
 * motion is CSS (`.brain-signal` dots on the connectors, `.vault-breath` glow
 * on the core; both defined in globals.css and disabled under
 * prefers-reduced-motion). Dark #03060e continuation of the hero's water.
 */

type Output = { name: string; body: string };

const OUTPUTS: readonly Output[] = [
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

/** Stage label — "01 · The Vault" style, shared by all three stages. */
function StageLabel({ n, children }: { n: string; children: React.ReactNode }): JSX.Element {
  return (
    <p className="flex items-center justify-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-warmgold">
      <span className="font-mono">{n}</span>
      <span aria-hidden className="h-px w-5 bg-brand-warmgold/50" />
      {children}
    </p>
  );
}

/** Vertical connector with a travelling gold signal dot (pure CSS). */
function Connector(): JSX.Element {
  return (
    <div aria-hidden className="relative mx-auto h-14 w-px bg-gradient-to-b from-brand-warmgold/70 via-brand-gold/25 to-brand-warmgold/70 sm:h-16">
      <span className="brain-signal" />
    </div>
  );
}

export function SecondBrainFrame(): JSX.Element {
  return (
    <section
      aria-labelledby="second-brain-title"
      className="relative isolate overflow-hidden bg-[#03060e] text-brand-cream"
    >
      {/* Faint gold afterglow continuing down from the hero's horizon. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_46%_at_50%_0%,rgba(212,184,115,0.07),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-[1100px] px-6 py-24 sm:py-32">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-warmgold">
          <span aria-hidden className="h-px w-7 bg-brand-warmgold/60" />
          The Second Brain
        </p>
        <h2
          id="second-brain-title"
          className="mt-5 max-w-[24ch] text-balance font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-cream"
        >
          One brain, installed in your business. Everything else is output.
        </h2>
        <p className="mt-6 max-w-[62ch] text-lg leading-[1.6] text-brand-cream/80">
          We don&apos;t hand you another tool. We build your company a second brain — one central
          memory vault holding everything your business knows, with AI agents custom-built to your
          mission wired straight into it. They read the vault before every move, act in your name,
          and write back everything they learn.
        </p>

        {/* THE BUILD — vault → agents → outputs, drawn as a top-down flow. */}
        <div className="mt-16 flex flex-col items-center">
          {/* 01 — the memory vault (the core). */}
          <div className="vault-breath w-full max-w-[600px] rounded-2xl border border-brand-warmgold/50 bg-white/[0.03] p-8 text-center sm:p-10">
            <StageLabel n="01">The Memory Vault</StageLabel>
            <h3 className="mt-4 text-balance font-display text-2xl font-semibold tracking-[-0.015em] text-brand-cream sm:text-[1.7rem]">
              Everything your business knows, in one place.
            </h3>
            <p className="mx-auto mt-4 max-w-[52ch] leading-[1.65] text-brand-cream/75">
              Your voice, your offers, your customers, your numbers, your history — organized into
              one living memory. It&apos;s the source of truth every agent draws from, and it&apos;s
              yours: it compounds for your business, not for a software vendor.
            </p>
          </div>

          <Connector />

          {/* 02 — custom agents wired into the vault. */}
          <div className="w-full max-w-[600px] rounded-2xl border border-brand-gold/30 bg-white/[0.02] p-8 text-center sm:p-10">
            <StageLabel n="02">The Agents</StageLabel>
            <h3 className="mt-4 text-balance font-display text-2xl font-semibold tracking-[-0.015em] text-brand-cream sm:text-[1.7rem]">
              Custom agents, wired to the vault.
            </h3>
            <p className="mx-auto mt-4 max-w-[52ch] leading-[1.65] text-brand-cream/75">
              Not off-the-shelf bots. Each agent is built for your company&apos;s mission and owns
              one lane — reading your context before every task, writing back what it learns after.
              Built and captained by the Amagna crew, with a human approving anything that matters.
            </p>
          </div>

          <Connector />

          {/* 03 — everything downstream is output of the one brain. */}
          <div className="w-full">
            <StageLabel n="03">The Output</StageLabel>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {OUTPUTS.map((o) => (
                <div
                  key={o.name}
                  className="rounded-2xl border border-brand-gold/25 bg-white/[0.02] p-6"
                >
                  <h3 className="font-display text-lg font-semibold text-brand-cream">{o.name}</h3>
                  <p className="mt-2.5 text-sm leading-[1.65] text-brand-cream/70">{o.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The loop — why the retainer compounds instead of depreciating. */}
        <p className="mx-auto mt-14 max-w-[46ch] text-balance text-center font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-brand-cream sm:text-2xl">
          Every finished task writes back to the vault — so the brain compounds.
        </p>
        <p className="mx-auto mt-3 max-w-[52ch] text-center leading-[1.6] text-brand-cream/70">
          Month one it knows your business. Month twelve it runs like it&apos;s worked there for
          years.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href={AUDIT_HREF}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-purple px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-purple/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold focus-visible:ring-offset-2 focus-visible:ring-offset-[#03060e]"
          >
            Chart Your Gold Map
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
