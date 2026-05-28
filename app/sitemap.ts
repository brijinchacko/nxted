import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://nxted.ai';
  const staticRoutes = [
    '',
    '/expert',
    '/expert/apply',
    '/capture',
    '/capture/levels',
    '/pricing',
    '/how-it-works',
    '/research',
    '/about',
    '/contact',
    '/privacy/cookies',
    '/legal/terms',
    '/legal/privacy',
    '/legal/gdpr',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const posts = await prisma.researchPost
    .findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } })
    .catch(() => []);

  const postRoutes = posts.map((p) => ({
    url: `${base}/research/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
