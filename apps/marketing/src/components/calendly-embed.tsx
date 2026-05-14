'use client';

import Script from 'next/script';

type CalendlyEmbedProps = {
  /** A calendly.com scheduling URL, or undefined until NEXT_PUBLIC_CALENDLY_URL is set. */
  url?: string;
};

/**
 * Calendly inline scheduling widget (booking choice — see ADR-0002).
 *
 * The scheduling URL comes from NEXT_PUBLIC_CALENDLY_URL. Until that env var
 * is set, this renders a graceful fallback so /book never shows a broken
 * embed — the moment the URL lands, the real scheduler appears with no code
 * change.
 */
export function CalendlyEmbed({ url }: CalendlyEmbedProps): JSX.Element {
  if (!url) {
    return (
      <div className="rounded-2xl border border-black/5 bg-white p-8 text-center">
        <h2 className="text-lg font-semibold text-ink">Booking is being set up</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
          The online scheduler is almost live. In the meantime, email us and we will get a
          time on the calendar today.
        </p>
        <a
          href="mailto:andrew@amagna.co?subject=Discovery%20call"
          className="mt-6 inline-block rounded-full bg-royal-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royal-purple/90"
        >
          Email andrew@amagna.co
        </a>
      </div>
    );
  }

  return (
    <>
      <div
        className="calendly-inline-widget overflow-hidden rounded-2xl border border-black/5 bg-white"
        data-url={url}
        style={{ minWidth: '320px', height: '700px' }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
