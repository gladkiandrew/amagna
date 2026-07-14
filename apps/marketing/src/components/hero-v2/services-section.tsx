import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { IntegrationsHub } from './integrations-hub';

/**
 * Homepage services section — the integrations hub (orbit diagram) above the
 * pillars of an Autonomous Marketing System, in plain English (Mike must
 * understand every line). Editorial numbered list on the cream content canvas (a
 * deliberate break from the dark water frames), NOT a generic icon grid.
 * Pillars sourced from CLAUDE.md.
 */
type Pillar = {
  name: string;
  body: string;
  eyebrow?: string;
  /** Optional inline CTA (e.g. the custom-install quote request). */
  href?: string;
  cta?: string;
};

const PILLARS: readonly Pillar[] = [
  {
    name: 'Full-Stack Automations',
    body: 'Follow-ups, bookings, and busywork handled automatically, around the clock.',
  },
  {
    name: 'Ads Management',
    eyebrow: 'Meta · TikTok · Google · Snapchat',
    body: 'We run and tune your paid ads so the right local people see you and the phone rings.',
  },
  {
    name: 'Central Memory Layer',
    body: 'One brain remembers your brand, your customers, and what’s working — so nothing repeats or goes off-message.',
  },
  {
    name: 'AI-Generated Content',
    body: 'Fresh posts, videos, and emails every week — in your voice, without you writing a word.',
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
  {
    name: 'Email + SMS Campaign Management',
    body: 'Automated email and text that follow up, nurture, and win back customers — sent at the right moment, without you lifting a finger.',
  },
  {
    name: 'Creation of Marketing Funnels',
    body: 'Landing pages and funnels built to turn clicks into booked calls — not just traffic, actual customers.',
  },
  {
    name: 'Advanced Data Reporting',
    body: 'Your site analytics and Meta campaign performance in one place, in plain English — so you always know what’s working.',
  },
  {
    name: 'Custom AI Installs',
    eyebrow: 'Full-stack automation · installed in person',
    body: 'Beyond marketing — bespoke AI built and installed across your whole business, on-site and tailored to how you work.',
    href: '/custom-ai-installs',
    cta: 'Check Out How We Build',
  },
] as const;

export function ServicesSection(): JSX.Element {
  return (
    // Transparent surface — sits on the shared RiverCanvas (or the page's own
    // cream bg elsewhere), so the river shows through the whitespace.
    <section aria-labelledby="services-title">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-24 sm:py-28">
        <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
          <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
          What we run
        </p>
        <h2
          id="services-title"
          className="mt-5 max-w-[20ch] text-balance font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal"
        >
          One Brain. Everything Your Business Needs.
        </h2>
        <p className="mt-6 max-w-[60ch] text-lg leading-[1.6] text-brand-slate">
          Not a pile of tools you have to run — a single machine the crew operates for you.
          Here&apos;s what it does.
        </p>

        {/* Integrations hub — every platform flows through the Amagna AI core.
            Slight negative margin on mobile lets the diagram use the full width
            so the orbit logos render larger. */}
        <div className="-mx-2 mt-12 sm:mx-0">
          <IntegrationsHub />
        </div>

        {/* Tool-connectivity message — a key differentiator, stated plainly. */}
        <p className="mx-auto mt-10 max-w-[60ch] text-balance text-center font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-brand-charcoal sm:text-2xl">
          If the tools you already use have an MCP or an API, we connect to them, use them, and
          automate them.
        </p>
        <p className="mx-auto mt-3 max-w-[48ch] text-center leading-[1.6] text-brand-slate">
          If it has a key, we can wire it in.
        </p>

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
                {pillar.href && pillar.cta && (
                  <Link
                    href={pillar.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-brand-purple transition-colors hover:text-brand-purple/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2"
                  >
                    {pillar.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
