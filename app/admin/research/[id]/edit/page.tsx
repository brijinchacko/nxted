import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { EditResearchClient } from './client';

export const dynamic = 'force-dynamic';

export default async function EditResearchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.researchPost.findUnique({ where: { id } });
  if (!post) notFound();
  return (
    <EditResearchClient
      post={{
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags,
        content: post.content,
        status: post.status,
      }}
    />
  );
}
