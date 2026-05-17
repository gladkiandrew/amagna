'use client';

import { usePathname } from 'next/navigation';

/**
 * Wraps the page body so the standard header/footer can be swapped out on
 * routes that ship a different chrome (the nautical rebrand at /v2).
 *
 * Server components (SiteHeader/SiteFooter) are passed in as props so this
 * file stays the only client boundary; the chrome itself stays static.
 */
export function AppShell({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();
  const isRebrand = pathname?.startsWith('/v2') ?? false;
  if (isRebrand) {
    return <main className="flex-1">{children}</main>;
  }
  return (
    <>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
