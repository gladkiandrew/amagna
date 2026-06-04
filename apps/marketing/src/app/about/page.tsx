import type { Metadata } from 'next';
import { CtaBand } from '@/components/sections/cta-band';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Why Amagna AI exists: an AI-native agency that sells outcomes, not hours, to home-services and real-estate operators. The thesis, the voyage, the name, and the founder.',
};

/** The Latin lineage behind the name — every entry sourced from README.md. */
const LINEAGE = [
  { term: 'Magna Carta', gloss: 'the 1215 charter that built trust between the governed and the governing' },
  { term: 'Magna Moralia', gloss: "Aristotle's “Great Ethics” — a work on living well" },
  { term: 'Magna Graecia', gloss: '“Great Greece,” the colonies that carried philosophy west' },
  { term: 'Magnanimous', gloss: 'magnus + animus — “great soul,” Aristotle’s ideal character' },
  { term: 'Magnate', gloss: 'a great person, a leader in industry' },
] as const;

/** Shared gold eyebrow + hairline rule (voyage brand treatment). */
function Eyebrow({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
      <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
      {children}
    </p>
  );
}

export default function AboutPage(): JSX.Element {
  return (
    <main className="bg-brand-cream">
      {/* Hero — why we exist */}
      <section className="mx-auto w-full max-w-[820px] px-6 py-20 sm:py-28">
        <Eyebrow>Our Story</Eyebrow>
        <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal sm:text-[3.6rem]">
          We don&apos;t sell hours. We sell the shore you&apos;re trying to reach.
        </h1>
        <div className="mt-7 max-w-[60ch] space-y-4 text-lg leading-[1.6] text-brand-slate">
          <p>
            Most marketing is sold by the hour, the report, or the dashboard. Operators end up
            paying for activity and hoping it turns into customers. We started Amagna to sell
            the other thing — the outcome itself: more calls, more listings, more revenue,
            owned and predictable.
          </p>
          <p>
            We do that for two kinds of operators, and only two:{' '}
            <strong className="font-semibold text-brand-charcoal">home-services owners</strong>{' '}
            and <strong className="font-semibold text-brand-charcoal">real-estate agents and
            teams</strong>. Deep beats wide.
          </p>
        </div>
      </section>

      {/* The thesis — outcomes, not hours */}
      <section className="border-t border-brand-gold/20 bg-white">
        <div className="mx-auto w-full max-w-[820px] px-6 py-20">
          <Eyebrow>The thesis</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-[-0.015em] text-brand-charcoal sm:text-[2.6rem]">
            AI didn&apos;t kill the agency. It killed the one that runs on hours.
          </h2>
          <div className="mt-6 max-w-[64ch] space-y-4 leading-[1.7] text-brand-slate">
            <p>
              The agencies that win from here compress the cost of execution toward zero and
              sell the result, not the time it took. So that is what we built — a productized,
              AI-native agency where the work is mostly software and the price reflects it.
            </p>
            <p>
              Platform-level fulfillment runs on <strong className="font-semibold text-brand-charcoal">Sapt</strong>.
              Around it, a fleet of specialized agents handles outreach, content, follow-up,
              reporting, and operations. The client gets the feeling of hiring a full marketing
              team. The economics work because the team is mostly software — and every client
              makes the next one sharper.
            </p>
          </div>
        </div>
      </section>

      {/* The voyage — the brand metaphor */}
      <section className="border-t border-brand-gold/20">
        <div className="mx-auto w-full max-w-[820px] px-6 py-20">
          <Eyebrow>The voyage</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-[-0.015em] text-brand-charcoal sm:text-[2.6rem]">
            Why a ship, and an open sea
          </h2>
          <div className="mt-6 max-w-[64ch] space-y-4 leading-[1.7] text-brand-slate">
            <p>
              Growth, for most operators, feels like open water. Feast and famine. Storms with
              no warning. A lot of rowing that doesn&apos;t obviously move you closer to shore.
              That&apos;s the sea our whole brand is built around — because it&apos;s honest
              about what running a business actually feels like.
            </p>
            <p>
              Amagna is the ship and the crew. We don&apos;t hand you a paddle and a pep talk;
              we get you to a coast you chose — steady, owned leads if you&apos;re in home
              services, a sphere that never goes cold if you&apos;re in real estate. The free
              audit is the <strong className="font-semibold text-brand-charcoal">gold map</strong>:
              it charts where you are and the route to where you want to be, yours to keep
              whether you sail with us or not.
            </p>
          </div>
        </div>
      </section>

      {/* The name */}
      <section className="border-t border-brand-gold/20 bg-white">
        <div className="mx-auto w-full max-w-[820px] px-6 py-20">
          <Eyebrow>The name</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-[-0.015em] text-brand-charcoal sm:text-[2.6rem]">
            “Amagna” is a promise with a lineage
          </h2>
          <p className="mt-6 max-w-[64ch] leading-[1.7] text-brand-slate">
            The root <em>magna</em> — “great” — runs through two thousand years of institutions
            built to last:
          </p>
          <dl className="mt-8 space-y-4">
            {LINEAGE.map((item) => (
              <div key={item.term} className="border-l-2 border-brand-gold pl-4">
                <dt className="font-semibold text-brand-charcoal">{item.term}</dt>
                <dd className="text-sm leading-relaxed text-brand-slate">{item.gloss}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-[64ch] leading-[1.7] text-brand-slate">
            And hidden inside <em>Amagna</em> are three initials —{' '}
            <strong className="font-semibold text-brand-purple">A·M·G</strong>, Andrew Michael
            Gladki. The name isn&apos;t a clever pun or a color. It claims a standard: trust,
            excellence, magnitude, and order — applied to AI and growth.
          </p>
        </div>
      </section>

      {/* The founder */}
      <section className="border-t border-brand-gold/20">
        <div className="mx-auto w-full max-w-[820px] px-6 py-20">
          <Eyebrow>The founder</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-[-0.015em] text-brand-charcoal sm:text-[2.6rem]">
            Built by an operator, for operators
          </h2>
          <div className="mt-6 max-w-[64ch] space-y-4 leading-[1.7] text-brand-slate">
            <p>
              I&apos;m Andrew Gladki. I run Amagna out of Saginaw, Michigan, and I built it the
              way I wish someone had built it for me.
            </p>
            <p>
              Before Amagna I launched{' '}
              <strong className="font-semibold text-brand-charcoal">Breaking the Fast</strong>,
              a profitable consumer brand running Meta ad campaigns — the proof of concept for
              the Amagna playbook, with its marketing infrastructure running on Sapt. Every play
              in the Amagna system comes from spending my own money on growth and watching what
              actually moves the number.
            </p>
            <p>
              So when we run your marketing, it isn&apos;t a junior account manager reading from
              a template. It&apos;s the same playbook I run on my own businesses, applied to
              yours — with the AI doing the repetitive work so we can charge a fraction of what
              an old-school agency would.
            </p>
            <p>
              The deal is simple: we show our work, we report in plain English, and we earn your
              next month every month. If we&apos;re not getting you more calls or more listings,
              you shouldn&apos;t be paying us.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Want to build with us early?"
        subheading="The first clients get the founder's full attention. Get your free audit — your gold map — or book a 20-minute call and let's talk."
      />
    </main>
  );
}
