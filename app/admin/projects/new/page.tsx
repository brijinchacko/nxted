'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Input, TextArea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';

export default function NewMarketplaceProjectPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const data = {
      title: String(fd.get('title')),
      track: String(fd.get('track')),
      domain: String(fd.get('domain')),
      summary: String(fd.get('summary')),
      scopeDetails: String(fd.get('scopeDetails')),
      requirements: String(fd.get('requirements') || ''),
      toolsList: String(fd.get('toolsList') || ''),
      estimatedHours: Number(fd.get('estimatedHours')),
      hourlyRateGBP: Number(fd.get('hourlyRateGBP')),
      totalBudgetGBP: Number(fd.get('totalBudgetGBP') || 0) || null,
      seatsAvailable: Number(fd.get('seatsAvailable') || 1),
    };
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success('Project posted to marketplace');
      router.push('/admin/projects');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-h2 mb-8">Post a marketplace project</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Project overview</CardTitle></CardHeader>
          <CardBody>
            <div className="space-y-5">
              <Input name="title" label="Title" required placeholder="Vibration spectrum review · industrial pumps" />
              <div className="grid grid-cols-2 gap-4">
                <Select name="track" label="Track" required options={[
                  { value: 'EXPERT_EVAL', label: 'Expert eval (RLHF)' },
                  { value: 'RED_TEAM', label: 'Red-team' },
                  { value: 'COMPLIANCE', label: 'EU AI Act compliance' },
                  { value: 'WRITTEN_EVAL', label: 'Written eval' },
                  { value: 'CAPTURE', label: 'Capture' },
                ]} />
                <Input name="domain" label="Domain" required placeholder="Industrial maintenance" />
              </div>
              <TextArea name="summary" label="Summary" required rows={3} placeholder="One-paragraph project description shown on the marketplace card." />
              <TextArea name="scopeDetails" label="Detailed scope" required rows={6} placeholder="What the contributor will do, deliverables, week-by-week breakdown if needed." />
              <Input name="requirements" label="Required skills (comma-separated)" placeholder="ISO 10816, vibration analysis, bearing failure modes" />
              <Input name="toolsList" label="Tools (comma-separated)" placeholder="MATLAB, Excel, Nxted evaluation portal" />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Compensation</CardTitle></CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 gap-4">
              <Input name="hourlyRateGBP" label="Rate (£/hr)" type="number" min={5} step={0.5} required defaultValue={25} />
              <Input name="estimatedHours" label="Estimated hours" type="number" min={1} required defaultValue={20} />
              <Input name="totalBudgetGBP" label="Total budget (£) - optional" type="number" min={0} step={1} />
              <Input name="seatsAvailable" label="Seats available" type="number" min={1} required defaultValue={1} />
            </div>
          </CardBody>
        </Card>

        <Button type="submit" variant="expert" size="lg" disabled={submitting}>
          {submitting ? 'Posting…' : 'Post project'}
        </Button>
      </form>
    </div>
  );
}
