'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Input, TextArea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';

export default function NewResearchPostPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success('Post created');
      router.push('/admin/research');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-h2 mb-8">New research post</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Post</CardTitle></CardHeader>
          <CardBody>
            <div className="space-y-4">
              <Input name="title" label="Title" required />
              <Input name="excerpt" label="Excerpt" required />
              <Select name="category" label="Category" options={['Physical AI', 'RLHF', 'India Tech', 'Research']} />
              <Input name="tags" label="Tags (comma-separated)" />
              <TextArea name="content" label="Body (Markdown)" required rows={20} />
              <Select name="status" label="Status" options={[{ value: 'DRAFT', label: 'Draft' }, { value: 'PUBLISHED', label: 'Published' }]} />
            </div>
          </CardBody>
        </Card>
        <Button type="submit" variant="expert" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save post'}
        </Button>
      </form>
    </div>
  );
}
