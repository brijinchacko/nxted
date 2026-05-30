import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { submitToIndexNow } from '@/lib/indexnow';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Admin-only: submit all public URLs to IndexNow (Bing/Yandex instant indexing).
 * Call after a deploy or content change. Optionally POST { urls: string[] } to
 * submit a specific set instead of the full site.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const base = (process.env.NEXT_PUBLIC_APP_URL || 'https://nxted.ai').replace(/\/$/, '');

  let urls: string[] = [];
  const body = await req.json().catch(() => ({}));
  if (Array.isArray(body?.urls) && body.urls.length) {
    urls = body.urls;
  } else {
    const staticPaths = [
      '', '/capture', '/capture/levels', '/expert', '/pricing', '/trust',
      '/research', '/case-studies', '/how-it-works', '/contact', '/glossary',
    ];
    const posts = await prisma.researchPost
      .findMany({ where: { status: 'PUBLISHED' }, select: { slug: true } })
      .catch(() => []);
    urls = [
      ...staticPaths.map((p) => `${base}${p}`),
      ...posts.map((p) => `${base}/research/${p.slug}`),
    ];
  }

  const result = await submitToIndexNow(urls);
  return NextResponse.json(result);
}
