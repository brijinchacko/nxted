import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { slugify, readingTimeMinutes } from '@/lib/utils';

const schema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  category: z.string(),
  tags: z.string().optional(),
  content: z.string(),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
});

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return new NextResponse('Forbidden', { status: 403 });
  const body = (await req.json()) as unknown;
  const parsed = schema.safeParse(body);
  if (!parsed.success) return new NextResponse(parsed.error.message, { status: 400 });
  const { title, excerpt, category, tags, content, status } = parsed.data;
  const post = await prisma.researchPost.create({
    data: {
      title,
      excerpt,
      category,
      tags: tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      content,
      status,
      slug: slugify(title),
      readingTime: readingTimeMinutes(content),
      publishedAt: status === 'PUBLISHED' ? new Date() : null,
    },
  });
  return NextResponse.json({ id: post.id });
}
