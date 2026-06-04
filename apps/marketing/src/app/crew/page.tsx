import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/site';
import { CtaBand } from '@/components/sections/cta-band';

const CREW_DESCRIPTION =
  'The Amagna crew: five specialized AI agents — Outreach, Content, Reporting, Operations, and Sales — and the founder who captains them. Every agent has one job and a human in the loop.';

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

/**
 * The crew manifest. Roles and responsibilities are sourced from CLAUDE.md /
 * README.md (the Phase-4 agent fleet). Nautical titles are brand flavor for the
 * voyage metaphor. Each agent: one job, what it does for a client, and the
 * human-in-the-loop line — nothing reaches a real person without a human's nod.
 */
const CREW = [
  {
    title: 'The Scout',
    role: 'Outreach',
    duty: 'Finds and warms the right leads.',
    forClient:
      'Scans your market for the businesses worth talking to, enriches them, and runs patient multi-touch warming so calls land on the calendar already half-sold — not cold.',
    trust: 'Every message is approved before it reaches a real person.',
  },
  {
    title: 'The Storyteller',
    role: 'Content',
    duty: 'Keeps your voice in the water, daily.',
    forClient:
      'Drafts ad copy, social posts, and broadcasts in your voice — pulled from your brand memory so it sounds like you, not a template. A steady current of content without you writing a word.',
    trust: 'You see and can edit anything before it publishes.',
  },
  {
    title: 'The Navigator',
    role: 'Reporting',
    duty: 'Reads the instruments and plots the position.',
    forClient:
      'Pulls your numbers from every channel and writes a plain-English weekly report — what moved, what didn’t, what’s next — flagging issues before they become surprises.',
    trust: 'A human reviews every report before it reaches you.',
  },
  {
    title: 'The Quartermaster',
    role: 'Operations',
    duty: 'Keeps the ship in order.',
    forClient:
      'Runs onboarding, collects what we need, routes tasks, and handles the standard requests — so the work moves without you chasing anyone for status.',
    trust: 'Anything client-facing passes a human first.',
  },
  {
    title: 'The First Mate',
    role: 'Sales',
    duty: 'Greets everyone who comes aboard.',
    forClient:
      'Qualifies the leads your marketing brings in, books the good ones onto the calendar, sends pre-call materials, and follows up on missed calls so nothing slips overboard.',
    trust: 'Real conversations are handed to a human, never faked.',
  },
] as const;

function Eyebrow({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
      <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
      {children}
    </p>
  );
}

export default function CrewPage(): JSX.Element {
  return (
    <main className="bg-brand-cream">
      {/* Hero */}
      <section className="mx-auto w-full max-w-[860px] px-6 py-20 sm:py-28">
        <Eyebrow>Meet the Crew</Eyebrow>
        <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal sm:text-[3.6rem]">
          A full marketing team. Mostly software.
        </h1>
        <p className="mt-7 max-w-[60ch] text-lg leading-[1.6] text-brand-slate">
          When you hire Amagna it feels like you hired a department. Really, it&apos;s five
          specialized agents — each with one job and a human watching over it — coordinated by
          the founder. This is the crew that sails your marketing.
        </p>
      </section>

      {/* The crew manifest */}
      <section className="border-t border-brand-gold/20 bg-white">
        <div className="mx-auto w-full max-w-[860px] px-6 py-16 sm:py-20">
          <h2 className="sr-only">The agent crew</h2>
          <ul className="divide-y divide-brand-gold/15">
            {CREW.map((member, i) => (
              <li
                key={member.role}
                className="grid gap-x-8 gap-y-3 py-9 sm:grid-cols-[auto_1fr] sm:py-10"
              >
                <div className="flex items-baseline gap-4 sm:flex-col sm:gap-1">
                  <span className="font-mono text-xs font-semibold tracking-wider text-brand-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-display text-xl font-semibold text-brand-charcoal sm:mt-2">
                    {member.title}
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-purple">
                    {member.role}
                  </p>
                </div>
                <div>
                  <p className="text-base font-semibold text-brand-charcoal">{member.duty}</p>
                  <p className="mt-2 max-w-[58ch] leading-[1.7] text-brand-slate">
                    {member.forClient}
                  </p>
                  <p className="mt-3 flex items-start gap-2 text-sm text-brand-slate">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                    <span>
                      <span className="font-semibold text-brand-charcoal">Human in the loop:</span>{' '}
                      {member.trust}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The captain — the founder */}
      <section className="border-t border-brand-gold/20">
        <div className="mx-auto w-full max-w-[860px] px-6 py-20">
          <Eyebrow>The Captain</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-[-0.015em] text-brand-charcoal sm:text-[2.6rem]">
            Andrew Michael Gladki
          </h2>
          <div className="mt-6 max-w-[64ch] space-y-4 leading-[1.7] text-brand-slate">
            <p>
              I&apos;m the founder, and for now I&apos;m the one steering. I run Amagna out of
              Saginaw, Michigan — an entrepreneur and builder, building this one in public.
            </p>
            <p>
              The crew above isn&apos;t a metaphor I hide behind. It&apos;s the same system I run
              on my own brand,{' '}
              <strong className="font-semibold text-brand-charcoal">Breaking the Fast</strong> — a
              profitable consumer brand on Meta ads that proved the playbook before I ever sold
              it. I&apos;d rather show you the machine than hide it behind account-manager speak.
            </p>
            <p>
              That&apos;s the promise of the whole crew: the agents do the repetitive work at a
              scale a human team can&apos;t match, and a human — usually me, early on — signs off
              on anything that reaches you or your customers. Software for the volume, people for
              the judgment.
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
