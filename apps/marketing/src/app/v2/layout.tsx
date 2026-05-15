import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Captain the AI. Dock at every app.',
  description:
    'Amagna captains a fleet of 50+ AI agents that dock at every app your business runs on. One plan, $1,497/month, productized for home services and real estate operators.',
  robots: { index: false, follow: false },
};

/**
 * /v2 — nautical rebrand prototype. Renders on a dark navy canvas instead of
 * the default cream surface. Header/footer are swapped out by AppShell when
 * the route starts with /v2 — this layout only paints the chrome below.
 */
export default function V2Layout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="relative min-h-screen bg-navy-deep text-white antialiased">
      {children}
    </div>
  );
}
