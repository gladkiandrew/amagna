import { permanentRedirect } from 'next/navigation';

/**
 * Political Candidates is retired as a serviced industry (2026-06-15) — replaced
 * in Who We Serve by Custom AI Installs / Full-Stack Automation. Permanent (308)
 * redirect so old links and ad URLs keep working.
 */
export default function PoliticalCandidatesRedirect(): never {
  permanentRedirect('/custom-ai-installs');
}
