import Link from 'next/link';

/**
 * Minimal nautical chrome — a thin gold rule and a single CTA on the right.
 * Deliberately quieter than the main site nav: the page is the experience.
 */
export function V2Nav(): JSX.Element {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-6">
        <Link
          href="/v2"
          className="font-serif text-2xl font-medium tracking-wide text-gold-bright"
          aria-label="Amagna — home"
        >
          Amagna
          <span className="ml-1 text-xs uppercase tracking-[0.3em] text-gold/70">
            · AI
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-white/70">
          <Link
            href="/audit"
            className="hidden transition-colors hover:text-white sm:inline"
          >
            Free audit
          </Link>
          <Link
            href="/checkout"
            className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-gold-bright transition-colors hover:bg-gold/20"
          >
            Subscribe
          </Link>
        </nav>
      </div>
    </header>
  );
}
