'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Input, TextArea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';
import { EXPERT_PRODUCTS, AI_DOMAINS } from '@/lib/constants';

function NewProjectInner() {
  const router = useRouter();
  const search = useSearchParams();
  const [product, setProduct] = useState(search.get('product') || 'QUICK_SPRINT');
  const [submitting, setSubmitting] = useState(false);

  const selected = EXPERT_PRODUCTS.find((p) => p.key === product);
  const isTestKit = product === 'TEST_KIT';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const data = {
      product,
      title: fd.get('title'),
      aiDomain: fd.get('aiDomain'),
      aiUseCase: fd.get('aiUseCase'),
      whatCorrectMeans: fd.get('whatCorrectMeans'),
      rubricNotes: fd.get('rubricNotes'),
      industry: fd.get('industry'),
      outputsCsv: fd.get('outputsCsv'),
    };
    try {
      const res = await fetch('/api/expert/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      const body = (await res.json()) as { id: string; checkoutUrl?: string };
      if (body.checkoutUrl) {
        window.location.href = body.checkoutUrl;
        return;
      }
      toast.success('Project created');
      router.push(`/portal/expert/${body.id}`);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-h2 mb-2">New Expert project</h1>
      <p className="text-[var(--text-secondary)] mb-8">Three short steps — brief, outputs, payment.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
        <button
          onClick={() => setProduct('TEST_KIT')}
          className={`p-4 rounded-[12px] border text-left transition-colors ${product === 'TEST_KIT' ? 'border-[var(--expert)] bg-[var(--expert-dim)]' : 'border-[var(--border-default)] hover:border-[var(--border-bright)]'}`}
        >
          <div className="text-[var(--text-primary)] font-medium">Free Test Kit</div>
          <div className="text-xs text-[var(--text-muted)] mt-1">20 outputs · £0</div>
        </button>
        {EXPERT_PRODUCTS.map((p) => (
          <button
            key={p.key}
            onClick={() => setProduct(p.key)}
            className={`p-4 rounded-[12px] border text-left transition-colors ${product === p.key ? 'border-[var(--expert)] bg-[var(--expert-dim)]' : 'border-[var(--border-default)] hover:border-[var(--border-bright)]'}`}
          >
            <div className="text-[var(--text-primary)] font-medium">{p.label}</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">{p.price}</div>
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Brief</CardTitle></CardHeader>
          <CardBody>
            <div className="space-y-5">
              <Input name="title" label="Project title" required />
              <Select name="aiDomain" label="AI domain" options={[...AI_DOMAINS]} required />
              <Input name="industry" label="Industry" placeholder="e.g. Industrial manufacturing" />
              <TextArea name="aiUseCase" label="What your AI does" required rows={3} />
              <TextArea name="whatCorrectMeans" label='What "correct" means' required rows={3} />
              <TextArea name="rubricNotes" label="Rubric / evaluation criteria" rows={4} placeholder="Optional — we'll structure these into our verdict UI" />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Outputs</CardTitle></CardHeader>
          <CardBody>
            <TextArea
              name="outputsCsv"
              label="Paste outputs (one per line, format: prompt | ai_response)"
              required
              rows={10}
              placeholder="What is the failure mode of bearing 6205? | Most common is fatigue spalling, followed by..."
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>{isTestKit ? 'Submit' : 'Payment'}</CardTitle></CardHeader>
          <CardBody>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-h3">{isTestKit ? 'Free Test Kit' : selected?.label}</div>
                <div className="text-sm text-[var(--text-muted)]">{isTestKit ? '20 outputs · £0' : `${selected?.outputs} · ${selected?.price}`}</div>
              </div>
            </div>
            <Button type="submit" variant="expert" fullWidth disabled={submitting}>
              {submitting ? 'Working…' : isTestKit ? 'Submit free test kit' : 'Continue to checkout →'}
            </Button>
          </CardBody>
        </Card>
      </form>
    </div>
  );
}

export default function NewExpertProject() {
  return (
    <Suspense fallback={<div className="text-[var(--text-secondary)]">Loading…</div>}>
      <NewProjectInner />
    </Suspense>
  );
}
