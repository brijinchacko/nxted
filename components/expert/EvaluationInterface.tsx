'use client';

import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/Input';
import { Progress } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';
import type { EvalResult, ErrorCategory } from '@prisma/client';

interface OutputItem {
  id: string;
  outputIndex: number;
  prompt: string;
  aiResponse: string;
  groundTruth?: string | null;
  contextNotes?: string | null;
}

interface Verdict {
  result?: EvalResult;
  confidence?: number;
  errorCategories: ErrorCategory[];
  errorDescription?: string;
  correctedVersion?: string;
  severityScore?: number;
}

const RESULTS: { value: EvalResult; label: string; tone: 'success' | 'warning' | 'danger' | 'neutral' }[] = [
  { value: 'CORRECT', label: 'Correct', tone: 'success' },
  { value: 'PARTIALLY_CORRECT', label: 'Partially correct', tone: 'warning' },
  { value: 'INCORRECT', label: 'Incorrect', tone: 'danger' },
  { value: 'UNSAFE', label: 'Unsafe', tone: 'danger' },
  { value: 'OUT_OF_SCOPE', label: 'Out of scope', tone: 'neutral' },
];

const ERROR_TYPES: ErrorCategory[] = [
  'FACTUAL_ERROR',
  'DOMAIN_ERROR',
  'REASONING_ERROR',
  'HALLUCINATION',
  'BIAS',
  'SAFETY_VIOLATION',
  'INCOMPLETE',
  'MISUNDERSTOOD',
  'OTHER',
];

export function EvaluationInterface({
  taskId,
  projectTitle,
  outputs: initialOutputs,
  rubric,
}: {
  taskId: string;
  projectTitle: string;
  outputs: OutputItem[];
  rubric?: string;
}) {
  const [idx, setIdx] = useState(0);
  const [verdicts, setVerdicts] = useState<Record<string, Verdict>>({});
  const [submitting, setSubmitting] = useState(false);

  const current = initialOutputs[idx];
  const verdict: Verdict = current ? verdicts[current.id] || { errorCategories: [] } : { errorCategories: [] };

  const updateVerdict = useCallback(
    (patch: Partial<Verdict>) => {
      if (!current) return;
      setVerdicts((prev) => ({
        ...prev,
        [current.id]: { ...(prev[current.id] || { errorCategories: [] }), ...patch },
      }));
    },
    [current],
  );

  const toggleError = useCallback(
    (cat: ErrorCategory) => {
      const list = verdict.errorCategories || [];
      const next = list.includes(cat) ? list.filter((c) => c !== cat) : [...list, cat];
      updateVerdict({ errorCategories: next });
    },
    [verdict.errorCategories, updateVerdict],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' && idx < initialOutputs.length - 1) setIdx(idx + 1);
      if (e.key === 'ArrowLeft' && idx > 0) setIdx(idx - 1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, initialOutputs.length]);

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/expert/evaluations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId,
          verdicts: Object.entries(verdicts).map(([outputId, v]) => ({ outputId, ...v })),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success('Evaluations submitted');
      window.location.href = '/me/tasks';
    } catch (err) {
      toast.error((err as Error).message || 'Submit failed');
    } finally {
      setSubmitting(false);
    }
  }

  if (!current) return <p className="text-center py-20">No outputs in this task.</p>;

  const completedCount = Object.values(verdicts).filter((v) => v.result).length;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b border-[var(--border-dim)] bg-[var(--bg-surface)] sticky top-0 z-10">
        <div className="container-site py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-label text-[var(--text-muted)]">{projectTitle}</div>
            <div className="text-sm text-[var(--text-primary)] truncate">
              Output {idx + 1} of {initialOutputs.length}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Progress value={completedCount} max={initialOutputs.length} />
            <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">
              {completedCount} done
            </span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setIdx(Math.max(0, idx - 1))}>
              ← Prev
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIdx(Math.min(initialOutputs.length - 1, idx + 1))}
            >
              Next →
            </Button>
          </div>
        </div>
      </div>

      <div className="container-site py-8 grid lg:grid-cols-2 gap-8 flex-1">
        <div className="space-y-5">
          <section className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] p-6">
            <div className="text-label text-[var(--text-muted)] mb-2">Prompt</div>
            <p className="text-[var(--text-primary)] whitespace-pre-wrap">{current.prompt}</p>
          </section>
          <section className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] p-6">
            <div className="text-label text-[var(--text-muted)] mb-2">AI response</div>
            <p className="text-[var(--text-primary)] whitespace-pre-wrap">{current.aiResponse}</p>
          </section>
          {current.groundTruth && (
            <section className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] p-6">
              <div className="text-label text-[var(--text-muted)] mb-2">Ground truth</div>
              <p className="text-[var(--text-primary)] whitespace-pre-wrap">{current.groundTruth}</p>
            </section>
          )}
          {rubric && (
            <section className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] p-6">
              <div className="text-label text-[var(--text-muted)] mb-2">Rubric</div>
              <p className="text-[var(--text-secondary)] whitespace-pre-wrap text-sm">{rubric}</p>
            </section>
          )}
        </div>

        <div className="space-y-5">
          <section>
            <div className="text-label text-[var(--text-secondary)] mb-3">Verdict</div>
            <div className="grid grid-cols-2 gap-2">
              {RESULTS.map((r) => (
                <button
                  key={r.value}
                  onClick={() => updateVerdict({ result: r.value })}
                  className={`p-3 rounded-md border text-left text-sm transition-colors ${
                    verdict.result === r.value
                      ? 'border-[var(--expert)] bg-[var(--expert-dim)] text-[var(--text-primary)]'
                      : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-bright)]'
                  }`}
                >
                  <Badge tone={r.tone} className="mb-2">{r.label}</Badge>
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="text-label text-[var(--text-secondary)] mb-3">Confidence (1–5)</div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => updateVerdict({ confidence: n })}
                  className={`flex-1 h-10 rounded-md border text-sm font-medium transition-colors ${
                    verdict.confidence === n
                      ? 'border-[var(--expert)] bg-[var(--expert-dim)] text-[var(--text-primary)]'
                      : 'border-[var(--border-default)] text-[var(--text-secondary)]'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="text-label text-[var(--text-secondary)] mb-3">Error categories</div>
            <div className="flex flex-wrap gap-2">
              {ERROR_TYPES.map((cat) => {
                const active = verdict.errorCategories?.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleError(cat)}
                    className={`px-3 py-1.5 rounded-md border text-xs font-medium transition-colors ${
                      active
                        ? 'border-[var(--capture)] bg-[var(--capture-dim)] text-[var(--capture)]'
                        : 'border-[var(--border-default)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {cat.replace(/_/g, ' ').toLowerCase()}
                  </button>
                );
              })}
            </div>
          </section>

          <TextArea
            label="Error description"
            placeholder="What was wrong, specifically?"
            value={verdict.errorDescription || ''}
            onChange={(e) => updateVerdict({ errorDescription: e.target.value })}
            rows={4}
          />

          <TextArea
            label="Corrected version (optional)"
            placeholder="If you can write the correct answer, do."
            value={verdict.correctedVersion || ''}
            onChange={(e) => updateVerdict({ correctedVersion: e.target.value })}
            rows={4}
          />

          <section>
            <div className="text-label text-[var(--text-secondary)] mb-3">Severity (1–5)</div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => updateVerdict({ severityScore: n })}
                  className={`flex-1 h-10 rounded-md border text-sm font-medium transition-colors ${
                    verdict.severityScore === n
                      ? 'border-[var(--capture)] bg-[var(--capture-dim)] text-[var(--capture)]'
                      : 'border-[var(--border-default)] text-[var(--text-secondary)]'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="border-t border-[var(--border-dim)] bg-[var(--bg-surface)]">
        <div className="container-site py-4 flex items-center justify-between">
          <div className="text-sm text-[var(--text-secondary)]">
            {completedCount} of {initialOutputs.length} evaluated · use ← → to navigate
          </div>
          <Button
            onClick={handleSubmit}
            disabled={completedCount < initialOutputs.length || submitting}
            variant="expert"
          >
            {submitting ? 'Submitting…' : 'Submit all evaluations'}
          </Button>
        </div>
      </div>
    </div>
  );
}
