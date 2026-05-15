'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Check, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { submitAudit } from '@/app/audit/actions';
import {
  QUICK_FILL_CHIPS,
  NICHE_OPTIONS,
  INITIAL_AUDIT_STATE,
  type Audit,
  type AuditState,
} from '@/lib/audit-shared';
import { BOOK_A_CALL_HREF } from '@/lib/site';

/** Sequence shown during audit generation — each line ~4s. */
const LOADING_MESSAGES = [
  'Analyzing your current online presence…',
  'Checking how you rank on Google…',
  'Looking at your competitors…',
  'Drafting your 30-day plan…',
  'Calculating opportunity…',
] as const;

const SELECT_CLASS =
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';

function FieldError({ message }: { message?: string }): JSX.Element | null {
  if (!message) return null;
  return <p className="mt-1 text-xs text-destructive">{message}</p>;
}

function LoadingOverlay(): JSX.Element {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => Math.min(i + 1, LOADING_MESSAGES.length - 1)),
      4000,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white/95 backdrop-blur">
      <Loader2 className="h-8 w-8 animate-spin text-royal-purple" aria-hidden="true" />
      <p className="mt-4 text-sm font-medium text-ink">{LOADING_MESSAGES[idx]}</p>
      <p className="mt-1 text-xs text-ink-muted">This usually takes 60 seconds.</p>
    </div>
  );
}

function SubmitButton(): JSX.Element {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-royal-purple text-white hover:bg-royal-purple/90 sm:w-auto"
    >
      {pending ? 'Generating…' : 'Get my free audit'}
    </Button>
  );
}

function AuditResult({ audit }: { audit: Audit }): JSX.Element {
  // After 7 seconds, soft-prompt with the personal Madeira note.
  const [showSoftPrompt, setShowSoftPrompt] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowSoftPrompt(true), 7000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Your audit
        </div>

        {/* Where you stand */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold text-ink">Where you stand now</h2>
          <ul className="mt-3 space-y-2.5">
            {audit.whereYouStand.map((item, i) => (
              <li key={`stand-${i}`} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What's missing */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-ink">What&apos;s missing</h2>
          <ul className="mt-3 space-y-2.5">
            {audit.whatsMissing.map((item, i) => (
              <li key={`gap-${i}`} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-antique-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 30-day plan */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-ink">Your 30-day plan</h2>
          <ol className="mt-3 space-y-3">
            {audit.thirtyDayPlan.map((step, i) => (
              <li key={`plan-${i}`} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                <span className="font-mono text-xs font-semibold text-antique-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-ink">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Opportunity */}
        <section className="mt-8 rounded-xl bg-cream p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-royal-purple">
            The opportunity
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink">{audit.opportunity}</p>
        </section>

        {/* Next step */}
        <section className="mt-8 border-t border-black/5 pt-6">
          <h2 className="text-base font-semibold text-ink">Want us to execute this for you?</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Book a 20-minute call to scope it. Andrew reviews every inquiry personally.
          </p>
          <Link
            href={BOOK_A_CALL_HREF}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-royal-purple px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-royal-purple/90"
          >
            Book a 20-minute call
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>

      {/* Soft prompt — appears after 7 seconds */}
      {showSoftPrompt && (
        <div className="rounded-2xl border border-antique-gold/30 bg-antique-gold/10 p-5 text-sm leading-relaxed text-ink">
          <p>
            <strong className="font-semibold">A note from Andrew:</strong> I&apos;m in Madeira
            this week — book a call now and I&apos;ll have your full plan locked in by the time
            we talk.
          </p>
          <Link
            href={BOOK_A_CALL_HREF}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-royal-purple hover:text-royal-purple/80"
          >
            Grab a time
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}

/** The /audit qualification widget. */
export function AuditWidget(): JSX.Element {
  const [state, formAction] = useFormState<AuditState, FormData>(
    submitAudit,
    INITIAL_AUDIT_STATE,
  );
  const [situationDraft, setSituationDraft] = useState('');

  if (state.status === 'success' && state.audit) {
    return <AuditResult audit={state.audit} />;
  }

  return (
    <form action={formAction} className="relative">
      <FormShell
        state={state}
        situationDraft={situationDraft}
        setSituationDraft={setSituationDraft}
      />
    </form>
  );
}

function FormShell({
  state,
  situationDraft,
  setSituationDraft,
}: {
  state: AuditState;
  situationDraft: string;
  setSituationDraft: (v: string) => void;
}): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <div className="relative">
      {pending && <LoadingOverlay />}

      <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
        {state.status === 'error' && state.message && (
          <p className="mb-6 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.message}
          </p>
        )}

        <div>
          <Label htmlFor="situationText" className="text-base font-semibold text-ink">
            Tell us about your business and your #1 growth goal.
          </Label>
          <Textarea
            id="situationText"
            name="situationText"
            rows={4}
            placeholder="e.g. I run a 15-person HVAC company in Saginaw — summer is packed, winter is dead. I want a steady phone year-round."
            value={situationDraft}
            onChange={(e) => setSituationDraft(e.target.value)}
            className="mt-3"
          />
          <FieldError message={state.fieldErrors.situationText} />

          <div className="mt-4 flex flex-wrap gap-2">
            {QUICK_FILL_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setSituationDraft(chip)}
                className="rounded-full border border-royal-purple/30 bg-royal-purple/5 px-3 py-1.5 text-xs font-medium text-royal-purple transition-colors hover:bg-royal-purple/10"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 border-t border-black/5 pt-8 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="email-gate-intro" className="text-xs font-semibold uppercase tracking-wider text-antique-gold">
              We&apos;ll email your audit + plan as a PDF
            </Label>
            <p id="email-gate-intro" className="mt-1.5 text-xs leading-relaxed text-ink-muted">
              No newsletter spam — one email with your audit, that&apos;s it.
            </p>
          </div>

          <div>
            <Label htmlFor="name">Your name</Label>
            <Input id="name" name="name" className="mt-1.5" />
            <FieldError message={state.fieldErrors.name} />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" className="mt-1.5" />
            <FieldError message={state.fieldErrors.email} />
          </div>

          <div>
            <Label htmlFor="businessName">Business name</Label>
            <Input id="businessName" name="businessName" className="mt-1.5" />
            <FieldError message={state.fieldErrors.businessName} />
          </div>

          <div>
            <Label htmlFor="niche">Niche</Label>
            <select id="niche" name="niche" className={`${SELECT_CLASS} mt-1.5`} defaultValue="">
              <option value="">Select one…</option>
              {NICHE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8">
          <SubmitButton />
          <p className="mt-3 text-xs leading-relaxed text-ink-muted">
            <Check className="mr-1 inline h-3.5 w-3.5 text-antique-gold" aria-hidden="true" />
            60-second audit · real value upfront · no card needed
          </p>
        </div>
      </div>
    </div>
  );
}
