import { IntegrationsHub } from './integrations-hub';

/**
 * Homepage services section — the integrations hub (orbit diagram) above the
 * pillars of an Autonomous Marketing System, in plain English (Mike must
 * understand every line). Editorial numbered list on the cream content canvas (a
 * deliberate break from the dark water frames), NOT a generic icon grid.
 * Pillars sourced from CLAUDE.md.
 */
type Pillar = { name: string; body: string; eyebrow?: string };

const PILLARS: readonly Pillar[] = [
  {
    name: 'AI-Generated Content',
    body: 'Fresh posts, videos, and emails every week — in your voice, without you writing a word.',
  },
  {
    name: 'Ads Management',
    eyebrow: 'Meta · TikTok · Google',
    body: 'We run and tune your paid ads so the right local people see you and the phone rings.',
  },
  {
    name: 'Central Memory Layer',
    body: 'One brain remembers your brand, your customers, and what’s working — so nothing repeats or goes off-message.',
  },
  {
    name: 'Full-Stack Automations',
    body: 'Follow-ups, bookings, and busywork handled automatically, around the clock.',
  },
  {
    name: 'SEO',
    body: 'Show up on Google when local customers search for exactly what you do.',
  },
  {
    name: 'AEO',
    eyebrow: 'Answer-engine optimization',
    body: 'Get recommended by AI assistants like ChatGPT when people ask them who to hire.',
  },
] as const;

export function ServicesSection(): JSX.Element {
  return (
    <section aria-labelledby="services-title" className="bg-brand-cream">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-24 sm:py-28">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
          <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
          What we run
        </p>
        <h2
          id="services-title"
          className="mt-5 max-w-[20ch] text-balance font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal"
        >
          One system. Everything your marketing needs.
        </h2>
        <p className="mt-6 max-w-[60ch] text-lg leading-[1.6] text-brand-slate">
          Not a pile of tools you have to run — a single machine the crew operates for you.
          Here&apos;s what it does.
        </p>

        {/* Integrations hub — every platform flows through the Amagna AI core. */}
        <div className="mt-12">
          <IntegrationsHub />
        </div>

        <ol className="mt-8 grid gap-x-12 gap-y-px sm:grid-cols-2">
          {PILLARS.map((pillar, i) => (
            <li
              key={pillar.name}
              className="flex gap-5 border-t border-brand-gold/20 py-7"
            >
              <span className="font-mono text-sm font-semibold tracking-wider text-brand-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                {pillar.eyebrow && (
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-purple">
                    {pillar.eyebrow}
                  </p>
                )}
                <h3 className="font-display text-xl font-semibold text-brand-charcoal">
                  {pillar.name}
                </h3>
                <p className="mt-2 max-w-[42ch] leading-[1.6] text-brand-slate">{pillar.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
