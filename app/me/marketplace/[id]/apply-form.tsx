'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { TextArea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function ApplyForm({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/me/projects/${projectId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coverNote: note }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success('Application submitted');
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="surface p-7 space-y-5">
      <div>
        <h3 className="text-h4 mb-2">Apply to this project</h3>
        <p className="text-sm text-[var(--text-secondary)]">A short note about why you're a fit. We match within 24 hours.</p>
      </div>
      <TextArea
        label="Cover note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Why is this project a fit for your background?"
        rows={4}
      />
      <Button type="submit" variant="expert" disabled={submitting} fullWidth>
        {submitting ? 'Submitting…' : 'Submit application'}
      </Button>
    </form>
  );
}
