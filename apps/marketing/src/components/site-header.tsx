import Link from 'next/link';
import { Wordmark } from '@/components/wordmark';
import { NAV_LINKS, BOOK_A_CALL_HREF } from '@/lib/site';

/**
 * Site header — wordmark home link, primary nav, and the Book a call CTA.
 *
 * The mobile menu uses a native <details> disclosure so the header stays a
 * server component (no client-side JS needed for a five-link menu).
 */
export function SiteHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Amagna AI — home" className="shrink-0">
          <Wordmark className="text-xl" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-royal-purple"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href={BOOK_A_CALL_HREF}
            className="rounded-full bg-royal-purple px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-royal-purple/90"
          >
            Book a call
          </Link>
        </div>

        {/* Mobile menu — native disclosure, no JS */}
        <details className="group relative md:hidden">
          <summary
            className="flex cursor-pointer list-none items-center rounded-md p-2 text-ink [&::-webkit-details-marker]:hidden"
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </summary>
          <div className="absolute right-0 mt-2 w-56 rounded-xl border border-black/5 bg-white p-2 shadow-lg">
            <nav className="flex flex-col" aria-label="Primary (mobile)">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-cream hover:text-royal-purple"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={BOOK_A_CALL_HREF}
                className="mt-1 rounded-md bg-royal-purple px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-royal-purple/90"
              >
                Book a call
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
