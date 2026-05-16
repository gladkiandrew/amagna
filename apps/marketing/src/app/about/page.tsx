import type { Metadata } from 'next';
import { CtaBand } from '@/components/sections/cta-band';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Amagna AI is an AI-native marketing agency for home services and real estate operators. The name, the founder, and the thesis behind it.',
};

const LINEAGE = [
  { term: 'Magna Carta', gloss: 'the charter that built trust between the governed and governing' },
  { term: 'Magna Moralia', gloss: "Aristotle's “Great Ethics” — a work on living well" },
  { term: 'Magna Graecia', gloss: '“Great Greece,” the colonies that carried philosophy west' },
  { term: 'Magnanimous', gloss: 'magnus + animus — “great soul,” Aristotle’s ideal character' },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-[760px] px-6 py-20 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
          About
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          The name is a promise.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">
          Most agencies are named after a founder, a color, or a clever pun. Ours is built on
          a Latin root — <em>magna</em>, “great” — that runs through two thousand years of
          serious institutions. We picked it on purpose.
        </p>
      </section>

      {/* The name */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-[760px] px-6 py-20">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Where “Amagna” comes from
          </h2>
          <p className="mt-5 leading-relaxed text-ink-muted">
            The root <em>magna</em> shows up wherever people built things meant to last:
          </p>
          <dl className="mt-8 space-y-4">
            {LINEAGE.map((item) => (
              <div key={item.term} className="border-l-2 border-antique-gold pl-4">
                <dt className="font-semibold text-ink">{item.term}</dt>
                <dd className="text-sm leading-relaxed text-ink-muted">{item.gloss}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 leading-relaxed text-ink-muted">
            And hidden inside <em>Amagna</em> are three initials: <strong>A·M·G</strong> —
            Andrew Michael Gladki. The name claims a lineage. It says we are not generic:
            we are built on principles that have governed serious institutions for two
            thousand years — trust, excellence, magnitude, and order — applied to AI and
            growth.
          </p>
        </div>
      </section>

      {/* The founder */}
      <section className="border-t border-black/5">
        <div className="mx-auto w-full max-w-[760px] px-6 py-20">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Built by an operator, for operators
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-muted">
            <p>
              I&apos;m Andrew Gladki. I run Amagna out of Saginaw, Michigan, and I built it
              the way I wish someone had built it for me.
            </p>
            <p>
              Before Amagna I launched <strong>Breaking the Fast</strong>, a consumer brand
              that pays its own bills with Meta ads. Every play in the Amagna system — the
              funnels, the content rhythm, the offers, the reporting — comes from spending my
              own money on growth and watching what actually moves the number.
            </p>
            <p>
              So when we run your marketing, it is not a junior account manager reading from
              a template. It is the same playbook I run on my own businesses, applied to
              yours — with the AI doing the repetitive work so we can charge a fraction of
              what an old-school agency would.
            </p>
            <p>
              The deal is simple: we show our work, we report in plain English, and we earn
              your next month every month. If we are not getting you more calls or more
              listings, you should not be paying us.
            </p>
          </div>
        </div>
      </section>

      {/* The thesis */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-[760px] px-6 py-20">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Why an AI-native agency
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-muted">
            <p>
              AI did not kill the agency model. It killed the agency model that runs on
              hours, headcount, and people. The agencies that win from here on compress the
              cost of execution toward zero and sell the result — leads, listings, revenue —
              not the time it took.
            </p>
            <p>
              So that is what we built. Platform-level fulfillment runs on Sapt. Around it,
              a fleet of specialized agents handles outreach, content, follow-up, and
              reporting. The client gets the feeling of hiring a full marketing team. The
              economics work because the team is mostly software — and every client makes the
              next one sharper.
            </p>
            <p>
              We stay narrow on purpose: two niches, home services and real estate. Deep
              beats wide. We would rather be the obvious choice for an HVAC owner or a
              listing agent than a generalist to everyone.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Want to build with us early?"
        subheading="The first clients get the founder's full attention — and become the case studies. Book a call and let's talk."
      />
    </>
  );
}
