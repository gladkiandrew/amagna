import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, MapPinned, Users, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Custom solutions',
  description:
    'For multi-location operators, home services companies with multiple Google Business Profiles, and brokerages with several agents. Custom scope, custom pricing, founder-reviewed.',
};

const EXAMPLES = [
  {
    icon: Building2,
    title: 'Multi-location real estate developers',
    body: 'Several properties or communities, each needing its own SEO footprint and marketing presence — managed as one system, not ten disconnected ones.',
  },
  {
    icon: MapPinned,
    title: 'Home services with multiple GBPs',
    body: 'Multiple service areas or locations, each with its own Google Business Profile to rank, fill, and keep reviewed — without the admin eating your week.',
  },
  {
    icon: Users,
    title: 'Brokerages with multiple agents',
    body: 'A roster of agents who each need a marketing presence, unified under one brand standard and one reporting view for the broker.',
  },
] as const;

const PROCESS = [
  {
    n: '01',
    title: 'Tell us your situation',
    body: 'A short intake — company size, how many locations or properties, what you spend now, and what you actually want to happen.',
  },
  {
    n: '02',
    title: 'The founder scopes it',
    body: 'Every custom inquiry is reviewed personally by Andrew. No sales team, no telephone game — the person scoping the work is the person who built the system.',
  },
  {
    n: '03',
    title: 'You get a custom quote',
    body: 'Custom pricing for custom work, back to you within one business day. Clear scope, clear deliverables, clear number.',
  },
  {
    n: '04',
    title: 'We build, then the agents run it',
    body: 'A bespoke system built for your structure — then the Amagna agent fleet runs it day to day, the same way it does for every client.',
  },
] as const;

const CAPABILITIES = [
  {
    title: 'Custom websites & funnels',
    body: 'Bespoke sites and conversion funnels on Next.js and Cloudflare — fast, owned, built to convert.',
  },
  {
    title: 'Custom AI implementations',
    body: 'Chatbots, voice agents, intake automation, and knowledge bases wired into how you actually operate.',
  },
  {
    title: 'Custom dashboards & integrations',
    body: 'Internal ops tools, unified reporting, and data pipelines that connect the systems you already run.',
  },
  {
    title: 'Brand & positioning work',
    body: 'Niche positioning, voice documentation, and a visual refresh so a multi-location operation feels like one brand.',
  },
] as const;

export default function CustomPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
          Custom solutions
        </p>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          When you have outgrown the boxes, we scope it to you.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
          The productized tiers fit solo operators and small teams. Larger operations need
          something built for their structure — custom scope, custom pricing, custom build.
        </p>
        <div className="mt-8">
          <Link
            href="/custom-quote"
            className="inline-flex items-center gap-1.5 rounded-full bg-royal-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royal-purple/90"
          >
            Get a custom quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20">
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Built for operators at scale
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {EXAMPLES.map((example) => (
              <div key={example.title} className="rounded-2xl border border-black/5 bg-cream p-6">
                <example.icon className="h-6 w-6 text-royal-purple" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-ink">{example.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{example.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How custom works */}
      <section className="border-t border-black/5">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
            How it works
          </p>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Four steps, founder-reviewed
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {PROCESS.map((step) => (
              <div key={step.n} className="flex gap-4">
                <span className="font-mono text-sm font-medium text-antique-gold">{step.n}</span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you can get */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20">
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            What a custom build can include
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {CAPABILITIES.map((cap) => (
              <div key={cap.title} className="rounded-2xl border border-black/5 bg-cream p-6">
                <h3 className="text-base font-semibold text-ink">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{cap.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-royal-purple">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Tell us what you are working with
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-white/75">
            A few questions about your operation, and the founder gets back to you within one
            business day with a scope and a number.
          </p>
          <Link
            href="/custom-quote"
            className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-royal-purple transition-colors hover:bg-white/90"
          >
            Get a custom quote
          </Link>
        </div>
      </section>
    </>
  );
}
