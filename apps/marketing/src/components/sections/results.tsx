const METRICS = [
  { label: 'Leads delivered to clients', value: '—' },
  { label: 'Content pieces shipped', value: '—' },
  { label: 'Reviews generated', value: '—' },
  { label: 'Weekly reports sent', value: '—' },
] as const;

/**
 * Home page — results section. Amagna is a new agency building in public, so
 * this is honest: it states what we measure and fills in as clients land,
 * rather than inventing testimonials or vanity numbers.
 */
export function Results(): JSX.Element {
  return (
    <section id="results" className="border-t border-black/5 bg-white">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
          Results
        </p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          We measure outcomes, not vanity metrics
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
          Amagna is a new agency, and we are building in public. These counters are live and
          honest — they fill in as clients come on. We would rather show you real numbers late
          than invented numbers now.
        </p>

        <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-black/5 bg-cream p-6">
              <dd className="font-mono text-3xl font-semibold text-royal-purple">
                {metric.value}
              </dd>
              <dt className="mt-2 text-sm leading-relaxed text-ink-muted">{metric.label}</dt>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-sm text-ink-muted">
          Want to be one of the first case studies? That is the best time to work with an
          agency — you get the founder&apos;s full attention.
        </p>
      </div>
    </section>
  );
}
