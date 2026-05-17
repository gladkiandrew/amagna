import Link from 'next/link';

/**
 * /v2 — rebrand placeholder. The nautical Stitch direction was dropped on
 * 2026-05-16 (see docs/_archive/stitch-v1/README.md). Visual direction
 * will be sourced externally; this route exists so the rebrand chrome
 * (AppShell hides the main site nav/footer here), the deps
 * (framer-motion, react-intersection-observer), the font load (Cormorant),
 * and the navy/gold Tailwind tokens stay in place and the branch is ready
 * to drop a new direction into.
 */
export default function V2Placeholder(): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-gold/60">
        Rebrand work-in-progress
      </p>
      <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-white sm:text-5xl">
        New visual direction landing here.
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55">
        The placeholder Stitch direction was retired. Branch and scaffolding
        held intact; the next iteration will be a hand-built composition.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full border border-gold/30 px-5 py-2 text-xs font-medium text-gold-bright transition-colors hover:bg-gold/10"
      >
        Back to amagna.co
      </Link>
    </div>
  );
}
