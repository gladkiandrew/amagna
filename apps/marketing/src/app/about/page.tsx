import type { Metadata } from 'next';
import Image from 'next/image';
import { OG_IMAGE } from '@/lib/site';
import { CtaBand } from '@/components/sections/cta-band';
import { FieldNotesSection } from '@/components/sections/field-notes-section';
import { CREW } from '@/lib/crew';

const ABOUT_DESCRIPTION =
  'Why Amagna AI exists: an AI-native agency that sells outcomes, not hours — autonomous marketing systems run by a crew of AI agents with a human at the helm. The thesis, the voyage, the crew, and the founder.';

export const metadata: Metadata = {
  title: 'Our Story',
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'Our Story — Amagna AI',
    description: ABOUT_DESCRIPTION,
    type: 'website',
    url: '/about',
    images: [OG_IMAGE],
  },
};

const LINEAGE = [
  { term: 'Magna Carta', gloss: 'the 1215 charter that built trust between the governed and the governing' },
  { term: 'Magnanimous', gloss: 'magnus + animus — “great soul,” Aristotle’s ideal character' },
  { term: 'Magnate', gloss: 'a great person, a leader in industry' },
] as const;

function Eyebrow({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }): JSX.Element {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] ${
        onDark ? 'text-brand-warmgold' : 'text-brand-gold'
      }`}
    >
      <span aria-hidden className={`h-px w-7 ${onDark ? 'bg-brand-warmgold/60' : 'bg-brand-gold/60'}`} />
      {children}
    </p>
  );
}

const captain = CREW.find((m) => m.captain)!;
const crewmates = CREW.filter((m) => !m.captain);

export default function AboutPage(): JSX.Element {
  return (
    <main className="bg-brand-cream">
      {/* Hero — why we exist */}
      <section className="mx-auto w-full max-w-[860px] px-6 py-20 sm:py-28">
        <Eyebrow>Our Story</Eyebrow>
        <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.04] tracking-[-0.02em] text-brand-charcoal sm:text-[3.6rem]">
          We don&apos;t sell hours. We sell the shore you&apos;re trying to reach.
        </h1>
        <p className="mt-7 max-w-[58ch] text-xl leading-[1.5] text-brand-slate">
          Most marketing is sold by the hour, the report, or the dashboard — activity you pay for
          and hope turns into customers. We sell the other thing: the outcome. More calls, more
          customers, owned and predictable.
        </p>
      </section>

      {/* The thesis */}
      <section className="border-t border-brand-gold/20 bg-white">
        <div className="mx-auto w-full max-w-[820px] px-6 py-20">
          <Eyebrow>The thesis</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-[-0.015em] text-brand-charcoal sm:text-[2.6rem]">
            AI didn&apos;t kill the agency. It killed the one that runs on hours.
          </h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-[1.7] text-brand-slate">
            The agencies that win from here drive the cost of execution toward zero and sell the
            result, not the time it took. So that&apos;s what we built: a productized, AI-native
            agency where the work is mostly software and the price reflects it — your own marketing
            department, without the department.
          </p>
        </div>
      </section>

      {/* The voyage — dark section for rhythm */}
      <section className="bg-brand-deep">
        <div className="mx-auto w-full max-w-[820px] px-6 py-20 sm:py-24">
          <Eyebrow onDark>The voyage</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-[-0.015em] text-brand-cream sm:text-[2.6rem]">
            Why a ship, and an open sea.
          </h2>
          <div className="mt-6 max-w-[62ch] space-y-4 text-lg leading-[1.7] text-brand-cream/80">
            <p>
              Growth feels like open water — feast and famine, storms with no warning, a lot of
              rowing that doesn&apos;t obviously move you closer to shore. Our whole brand is built
              around that sea because it&apos;s honest about what running a business feels like.
            </p>
            <p>
              Amagna is the ship and the crew. We don&apos;t hand you a paddle and a pep talk — we
              get you to a coast you chose. The{' '}
              <strong className="font-semibold text-brand-warmgold">Gold Map</strong> charts where
              you are and the route to where you&apos;re going. It&apos;s yours to keep, whether you
              sail with us or not.
            </p>
          </div>
        </div>
      </section>

      {/* The expansion — autonomous marketing → full-stack custom installs */}
      <section className="border-t border-brand-gold/20 bg-white">
        <div className="mx-auto w-full max-w-[820px] px-6 py-20">
          <Eyebrow>The expansion</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-[-0.015em] text-brand-charcoal sm:text-[2.6rem]">
            From marketing that runs itself to a whole business that does.
          </h2>
          <div className="mt-6 max-w-[62ch] space-y-4 text-lg leading-[1.7] text-brand-slate">
            <p>
              Amagna started by building{' '}
              <strong className="font-semibold text-brand-charcoal">autonomous marketing systems</strong>{' '}
              — one crew of specialized AI agents, run from a single command center, each owning a
              lane of the voyage.
            </p>
            <p>
              That same engine reaches further now. We build{' '}
              <strong className="font-semibold text-brand-charcoal">full-stack automation</strong> —
              custom AI installed <em>in person</em>, mapped to one business and wired across
              marketing, outreach, retention, content, and operations. Not a template; a system
              shaped around exactly how you work.
            </p>
            <p>
              What makes a bespoke install safe is{' '}
              <strong className="font-semibold text-brand-purple">Mansa</strong>, our Memory &amp;
              Security specialist — the dedicated layer that protects each client&apos;s data and IP
              and gives their AI a true memory of their business. Your operation&apos;s knowledge
              stays yours, and the system gets smarter without ever leaking what it learns.
            </p>
            <p>
              Through all of it, the human stays in command. Andrew captains the company; the crew
              does the work; and the client always steers — nothing of consequence ships without a
              person&apos;s say-so.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the crew */}
      <section id="crew" className="scroll-mt-24 border-t border-brand-gold/20 bg-brand-cream">
        <div className="mx-auto w-full max-w-[1040px] px-6 py-20 sm:py-24">
          <div className="max-w-[760px]">
            <Eyebrow>Meet the crew</Eyebrow>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-[-0.015em] text-brand-charcoal sm:text-[2.6rem]">
              A full marketing team. Mostly software.
            </h2>
            <p className="mt-6 text-lg leading-[1.7] text-brand-slate">
              Hiring Amagna feels like hiring a department. Really it&apos;s a crew of specialized
              AI agents, each owning one lane, working in sync — with a human at the helm approving
              anything that matters. <strong className="font-semibold text-brand-charcoal">Zeno</strong>{' '}
              reads the goal and assigns the work; the rest execute their lane and report back. The
              result compounds: every client makes the whole crew sharper.
            </p>
          </div>

          {/* Captain — featured */}
          <article className="mt-12 grid gap-7 rounded-2xl border border-brand-warmgold/40 bg-white p-6 shadow-[0_1px_30px_-12px_rgba(93,46,140,0.25)] sm:grid-cols-[260px_1fr] sm:items-center sm:p-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-brand-deep sm:aspect-square">
              <Image
                src={`/brand/crew/${captain.slug}.webp`}
                alt={`${captain.name}, ${captain.title}`}
                fill
                sizes="(min-width:640px) 260px, 90vw"
                className="object-cover object-[center_25%]"
              />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-warmgold">
                {captain.title}
              </p>
              <h3 className="mt-1.5 font-display text-2xl font-semibold text-brand-charcoal">
                {captain.name}
              </h3>
              <p className="mt-3 leading-[1.7] text-brand-slate">{captain.description}</p>
              <p className="mt-3 text-sm leading-relaxed text-brand-slate/80">{captain.trust}</p>
            </div>
          </article>

          {/* The rest of the crew */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {crewmates.map((member) => (
              <article
                key={member.slug}
                className="flex flex-col rounded-2xl border border-brand-gold/30 bg-white p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-deep">
                    <Image
                      src={`/brand/crew/${member.slug}.webp`}
                      alt={`${member.name}, ${member.title}`}
                      fill
                      sizes="80px"
                      className="object-cover object-[center_25%]"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-brand-charcoal">
                      {member.name}
                    </h3>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                      {member.title}
                    </p>
                  </div>
                </div>
                <p className="mt-4 flex-1 leading-[1.6] text-brand-slate">{member.description}</p>
                <p className="mt-3 text-sm leading-relaxed text-brand-slate/80">{member.trust}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The name */}
      <section className="border-t border-brand-gold/20 bg-white">
        <div className="mx-auto w-full max-w-[820px] px-6 py-20">
          <Eyebrow>The name</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-[-0.015em] text-brand-charcoal sm:text-[2.6rem]">
            “Amagna” is a promise with a lineage.
          </h2>
          <p className="mt-6 max-w-[62ch] leading-[1.7] text-brand-slate">
            The root <em>magna</em> — “great” — runs through two thousand years of institutions
            built to last:
          </p>
          <dl className="mt-7 grid gap-4 sm:grid-cols-3">
            {LINEAGE.map((item) => (
              <div key={item.term} className="border-l-2 border-brand-gold pl-4">
                <dt className="font-semibold text-brand-charcoal">{item.term}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-brand-slate">{item.gloss}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-[62ch] leading-[1.7] text-brand-slate">
            And hidden inside <em>Amagna</em> are three initials —{' '}
            <strong className="font-semibold text-brand-purple">A·M·G</strong>, Andrew Michael
            Gladki. The name claims a standard: trust, excellence, magnitude, and order — applied
            to AI and growth.
          </p>
        </div>
      </section>

      {/* The founder */}
      <section className="border-t border-brand-gold/20">
        <div className="mx-auto w-full max-w-[820px] px-6 py-20">
          <Eyebrow>The founder</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-[-0.015em] text-brand-charcoal sm:text-[2.6rem]">
            Built by an operator, for operators.
          </h2>
          <div className="mt-6 max-w-[62ch] space-y-4 text-lg leading-[1.7] text-brand-slate">
            <p>
              I&apos;m Andrew Gladki. I run Amagna out of Saginaw, Michigan — the human at the
              helm, captaining the crew that captains your marketing.
            </p>
            <p>
              Our first client was{' '}
              <strong className="font-semibold text-brand-charcoal">Breaking the Fast</strong>, a
              consumer brand running Meta campaigns — and we still run their growth today. That&apos;s
              where the playbook got proven on real budget and real numbers. Every play earned its
              place on live client work before we offered it to anyone else.
            </p>
            <p>
              The deal is simple: we show our work, report in plain English, and earn the next month
              every month. If we&apos;re not getting you results, you shouldn&apos;t be paying us.
            </p>
          </div>
        </div>
      </section>

      <FieldNotesSection />

      <CtaBand
        heading="Want to build with us early?"
        subheading="The first clients get the founder's full attention. Chart your Gold Map — a free, custom plan to start."
      />
    </main>
  );
}
