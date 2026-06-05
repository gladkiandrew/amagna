import type { Metadata } from 'next';
import Image from 'next/image';
import { OG_IMAGE } from '@/lib/site';
import { CtaBand } from '@/components/sections/cta-band';
import { CREW } from '@/lib/crew';

const CREW_DESCRIPTION =
  'Meet the Amagna crew: five specialized AI agents — Zeno (captain), Exodus, Solon, Hero, and Thales — captained by Zeno and run by the founder, Andrew. Every agent has one job and a human in the loop.';

export const metadata: Metadata = {
  title: 'Meet the Crew',
  description: CREW_DESCRIPTION,
  openGraph: {
    title: 'Meet the Crew — Amagna AI',
    description: CREW_DESCRIPTION,
    type: 'website',
    url: '/crew',
    images: [OG_IMAGE],
  },
};

function Eyebrow({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
      <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
      {children}
    </p>
  );
}

/**
 * /crew — the canon roster (source: lib/crew.ts). Each agent gets a portrait, a
 * role, what it does, and the human-in-the-loop line, with an anchor id
 * (#zeno …) that Frame 2 links to. Zeno captains the AI fleet; Andrew, the
 * founder, is the human at the helm of the company — distinct from Zeno.
 */
export default function CrewPage(): JSX.Element {
  return (
    <main className="bg-brand-cream">
      {/* Hero */}
      <section className="mx-auto w-full max-w-[920px] px-6 py-20 sm:py-28">
        <Eyebrow>Meet the Crew</Eyebrow>
        <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal sm:text-[3.6rem]">
          A full marketing team. Mostly software.
        </h1>
        <p className="mt-7 max-w-[60ch] text-lg leading-[1.6] text-brand-slate">
          When you hire Amagna it feels like you hired a department. Really, it&apos;s five
          specialized agents — each with one job and a human watching over it — captained by
          Zeno and run day-to-day by the founder. This is the crew that sails your marketing.
        </p>
      </section>

      {/* The crew */}
      <section className="border-t border-brand-gold/20 bg-white">
        <div className="mx-auto w-full max-w-[920px] space-y-16 px-6 py-16 sm:py-20">
          {CREW.map((member) => (
            <article
              key={member.slug}
              id={member.slug}
              className="grid scroll-mt-24 gap-7 sm:grid-cols-[240px_1fr] sm:gap-9"
            >
              <div
                className={
                  'relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-cream ' +
                  (member.captain
                    ? 'border-2 border-brand-gold ring-2 ring-brand-gold/30 ring-offset-2'
                    : 'border border-brand-gold/30')
                }
              >
                <Image
                  src={`/brand/crew/${member.slug}.webp`}
                  alt={`${member.name}, ${member.title}`}
                  fill
                  sizes="(min-width:640px) 240px, 90vw"
                  className="object-cover object-[center_22%]"
                />
                {member.captain && (
                  <span className="absolute left-3 top-3 rounded-full bg-brand-charcoal/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-warmgold ring-1 ring-brand-warmgold/50">
                    Captain
                  </span>
                )}
              </div>

              <div className="sm:pt-2">
                <h2 className="font-display text-2xl font-semibold text-brand-charcoal sm:text-3xl">
                  {member.name}
                </h2>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-purple">
                  {member.title}
                </p>
                <p className="mt-4 max-w-[58ch] leading-[1.7] text-brand-slate">
                  {member.description}
                </p>
                <p className="mt-4 flex items-start gap-2 text-sm text-brand-slate">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                  <span>
                    <span className="font-semibold text-brand-charcoal">Human in the loop:</span>{' '}
                    {member.trust}
                  </span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* The human at the helm — the founder (distinct from Zeno). */}
      <section className="border-t border-brand-gold/20">
        <div className="mx-auto w-full max-w-[920px] px-6 py-20">
          <Eyebrow>At the helm</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-[-0.015em] text-brand-charcoal sm:text-[2.6rem]">
            Andrew Michael Gladki
          </h2>
          <div className="mt-6 max-w-[64ch] space-y-4 leading-[1.7] text-brand-slate">
            <p>
              Zeno captains the AI fleet. I captain the company. I&apos;m the founder — I run
              Amagna out of Saginaw, Michigan, an entrepreneur and builder building this one in
              public.
            </p>
            <p>
              The crew above isn&apos;t a metaphor we hide behind — it&apos;s the system we
              proved on our first client,{' '}
              <strong className="font-semibold text-brand-charcoal">Breaking the Fast</strong>, a
              consumer brand on Meta ads we still run today. The agents do the repetitive work at
              a scale a human team can&apos;t match; a human — usually me, early on — signs off on
              anything that reaches you or your customers. Software for the volume, people for the
              judgment.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Want this crew working your pipeline?"
        subheading="Get your free audit — your gold map — or book a 20-minute call and meet the captain directly."
      />
    </main>
  );
}
