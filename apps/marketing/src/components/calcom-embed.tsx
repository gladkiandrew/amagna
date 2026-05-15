type CalcomEmbedProps = {
  /**
   * A cal.com scheduling URL, e.g. https://cal.com/andrew-amagna/discovery.
   * Undefined until NEXT_PUBLIC_CALCOM_URL is set on the deployment.
   */
  url?: string;
};

/**
 * Cal.com inline scheduling widget. Phase 1.5 swapped off Calendly for owned-
 * domain control + Google Calendar sync. We use a plain iframe (Cal.com supports
 * `?embed=true`) — no extra script load, no init race conditions, no broken
 * widget if the script vendor moves.
 *
 * Until NEXT_PUBLIC_CALCOM_URL is set the page renders an email fallback so
 * /book is never broken.
 */
export function CalcomEmbed({ url }: CalcomEmbedProps): JSX.Element {
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

  const src = `${url}${url.includes('?') ? '&' : '?'}embed=true&hide-event-type-details=1`;

  return (
    <iframe
      title="Book a 20-minute call with Amagna AI"
      src={src}
      className="w-full overflow-hidden rounded-2xl border border-black/5 bg-white"
      style={{ minWidth: '320px', height: '700px' }}
      loading="lazy"
    />
  );
}
