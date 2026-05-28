import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { readingTimeMinutes } from '@/lib/utils';

const schema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  category: z.string(),
  tags: z.string().optional(),
  content: z.string(),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return new NextResponse('Forbidden', { status: 403 });
  const body = (await req.json()) as unknown;
  const parsed = schema.safeParse(body);
  if (!parsed.success) return new NextResponse(parsed.error.message, { status: 400 });

  const existing = await prisma.researchPost.findUnique({ where: { id } });
  if (!existing) return new NextResponse('Not found', { status: 404 });

  const { title, excerpt, category, tags, content, status } = parsed.data;
  const publishedAt =
    status === 'PUBLISHED' && existing.status !== 'PUBLISHED' ? new Date() : existing.publishedAt;

  const post = await prisma.researchPost.update({
    where: { id },
    data: {
      title,
      excerpt,
      category,
      tags: tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      content,
      status,
      readingTime: readingTimeMinutes(content),
      publishedAt,
    },
  });
  return NextResponse.json({ id: post.id });
}
