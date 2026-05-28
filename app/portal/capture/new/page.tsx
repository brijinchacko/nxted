'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Input, TextArea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';
import { SKILL_CATEGORIES, CAPTURE_LEVELS } from '@/lib/constants';

export default function NewCaptureOrderPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [level, setLevel] = useState<string>('L2_SKILLED_TRADES');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const data = {
      skillCategory: fd.get('skillCategory'),
      level,
      hoursRequested: Number(fd.get('hoursRequested')),
      environmentType: fd.get('environmentType'),
      taskSpecification: fd.get('taskSpecification'),
      hardwareNotes: fd.get('hardwareNotes'),
      outputFormat: fd.get('outputFormat'),
      annotationLevel: fd.get('annotationLevel'),
      needsDepthMap: fd.get('needsDepthMap') === 'on',
      needsPoseSkeleton: fd.get('needsPoseSkeleton') === 'on',
      needsActionLabels: fd.get('needsActionLabels') === 'on',
    };
    try {
      const res = await fetch('/api/capture/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      const body = (await res.json()) as { id: string };
      toast.success('Quote requested — we\'ll respond within 24h');
      router.push(`/portal/capture/orders/${body.id}`);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-h2 mb-2">Request a capture dataset</h1>
      <p className="text-[var(--text-secondary)] mb-8">Quote within 24 hours.</p>

      <form onSubmit={onSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>What to capture</CardTitle></CardHeader>
          <CardBody>
            <div className="space-y-5">
              <Select name="skillCategory" label="Skill category" options={[...SKILL_CATEGORIES]} required />
              <div>
                <div className="text-label text-[var(--text-secondary)] mb-3">Level</div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {CAPTURE_LEVELS.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setLevel(l.id)}
                      className={`p-3 rounded-md border text-left text-xs transition-colors ${level === l.id ? 'border-[var(--capture)] bg-[var(--capture-dim)]' : 'border-[var(--border-default)]'}`}
                    >
                      <div className="text-[var(--text-primary)] font-medium">L{l.number}</div>
                      <div className="text-[var(--text-muted)] mt-1">{l.title}</div>
                    </button>
                  ))}
                </div>
              </div>
              <Input name="hoursRequested" type="number" min={1} label="Hours of footage" required defaultValue={50} />
              <Input name="environmentType" label="Environment" placeholder="e.g. Indoor Factory, Home Kitchen" required />
              <TextArea name="taskSpecification" label="Tasks to record" required rows={5} placeholder="Be specific — list the exact tasks and any sub-steps you need" />
              <Input name="hardwareNotes" label="Hardware notes (optional)" placeholder="e.g. Project Aria, GoPro Hero 12" />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Output format</CardTitle></CardHeader>
          <CardBody>
            <div className="space-y-5">
              <Select name="outputFormat" label="Video format" defaultValue="MP4_4K" options={[
                { value: 'MP4_4K', label: 'MP4 4K' },
                { value: 'RLDS', label: 'RLDS' },
                { value: 'HDF5', label: 'HDF5' },
                { value: 'LeRobot', label: 'LeRobot' },
                { value: 'Custom', label: 'Custom (specify in tasks)' },
              ]} />
              <Select name="annotationLevel" label="Annotation level" defaultValue="BASIC" options={[
                { value: 'BASIC', label: 'Basic — timestamps + task segmentation' },
                { value: 'RICH', label: 'Rich — adds metadata + environment classification' },
                { value: 'ROBOTICS_READY', label: 'Robotics-ready — adds pose, depth, action labels' },
              ]} />
              <div className="grid grid-cols-3 gap-3 text-sm">
                <label className="flex items-center gap-2 p-3 border border-[var(--border-default)] rounded-md cursor-pointer">
                  <input type="checkbox" name="needsDepthMap" /> Depth maps
                </label>
                <label className="flex items-center gap-2 p-3 border border-[var(--border-default)] rounded-md cursor-pointer">
                  <input type="checkbox" name="needsPoseSkeleton" /> Pose skeleton
                </label>
                <label className="flex items-center gap-2 p-3 border border-[var(--border-default)] rounded-md cursor-pointer">
                  <input type="checkbox" name="needsActionLabels" defaultChecked /> Action labels
                </label>
              </div>
            </div>
          </CardBody>
        </Card>

        <Button type="submit" variant="capture" size="lg" fullWidth disabled={submitting}>
          {submitting ? 'Submitting…' : 'Request quote'}
        </Button>
      </form>
    </div>
  );
}
