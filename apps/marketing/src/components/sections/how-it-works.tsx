const STEPS = [
  {
    n: '01',
    title: 'Discovery call',
    body: 'Twenty minutes. We learn your market, your most profitable services, and how you actually talk — so nothing we build sounds like a stranger wrote it.',
  },
  {
    n: '02',
    title: 'We build your growth system',
    body: 'A niche-tuned funnel, ad campaigns, a content engine, and a reputation loop — set up on the Sapt platform with the Amagna agent layer wrapped around it.',
  },
  {
    n: '03',
    title: 'The agents run it, every day',
    body: 'Outreach, content, follow-up, and reporting happen on autopilot. You approve what matters and get a weekly report in plain English — not a dashboard you have to decode.',
  },
] as const;

/** Home page — the three-step model, from a prospect's point of view. */
export function HowItWorks(): JSX.Element {
  return (
    <section id="how" className="border-t border-black/5">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
          How it works
        </p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          A full marketing team, without the team
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n}>
              <span className="font-mono text-sm font-medium text-antique-gold">{step.n}</span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
