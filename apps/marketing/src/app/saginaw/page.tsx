import { permanentRedirect } from 'next/navigation';

/**
 * /saginaw 308-redirects to /michigan — the single local hub page, so the local
 * keyword cluster (Saginaw / Midland / Bay City / Mid-Michigan) consolidates on
 * one strong page instead of splitting authority across thin duplicates.
 */
export default function SaginawRedirect(): never {
  permanentRedirect('/michigan');
}
