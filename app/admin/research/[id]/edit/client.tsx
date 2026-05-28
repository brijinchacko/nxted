'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Input, TextArea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';

export function EditResearchClient({
  post,
}: {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    tags: string[];
    content: string;
    status: string;
  };
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    try {
      const res = await fetch(`/api/research/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success('Post saved');
      router.push('/admin/research');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-h2 mb-8">Edit research post</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Post</CardTitle></CardHeader>
          <CardBody>
            <div className="space-y-4">
              <Input name="title" label="Title" defaultValue={post.title} required />
              <Input name="excerpt" label="Excerpt" defaultValue={post.excerpt} required />
              <Select name="category" label="Category" defaultValue={post.category} options={['Physical AI', 'RLHF', 'India Tech', 'Research']} />
              <Input name="tags" label="Tags (comma-separated)" defaultValue={post.tags.join(', ')} />
              <TextArea name="content" label="Body (Markdown)" required rows={24} defaultValue={post.content} />
              <Select name="status" label="Status" defaultValue={post.status} options={[{ value: 'DRAFT', label: 'Draft' }, { value: 'PUBLISHED', label: 'Published' }]} />
            </div>
          </CardBody>
        </Card>
        <Button type="submit" variant="expert" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save changes'}
        </Button>
      </form>
    </div>
  );
}
