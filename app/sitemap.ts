import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://nxted.ai';

  // path -> [priority, changeFrequency]
  const routes: Record<string, [number, MetadataRoute.Sitemap[number]['changeFrequency']]> = {
    '': [1, 'weekly'],
    '/capture': [0.9, 'weekly'],
    '/expert': [0.9, 'weekly'],
    '/trust': [0.9, 'monthly'],
    '/pricing': [0.9, 'weekly'],
    '/research': [0.8, 'daily'],
    '/capture/levels': [0.7, 'monthly'],
    '/case-studies': [0.7, 'monthly'],
    '/how-it-works': [0.6, 'monthly'],
    '/apply': [0.6, 'monthly'],
    '/contact': [0.5, 'monthly'],
    '/legal/terms': [0.3, 'yearly'],
    '/legal/privacy': [0.3, 'yearly'],
    '/legal/cookies': [0.3, 'yearly'],
    '/legal/dpa': [0.3, 'yearly'],
    '/legal/aup': [0.3, 'yearly'],
    '/legal/contributor-agreement': [0.3, 'yearly'],
    '/legal/refund': [0.3, 'yearly'],
    '/legal/ai-act': [0.3, 'yearly'],
    '/legal/accessibility': [0.3, 'yearly'],
    '/legal/dmca': [0.3, 'yearly'],
    '/legal/modern-slavery': [0.3, 'yearly'],
    '/legal/bribery': [0.3, 'yearly'],
    '/legal/security': [0.3, 'yearly'],
    '/legal/whistleblowing': [0.3, 'yearly'],
  };

  const staticRoutes = Object.entries(routes).map(([path, [priority, changeFrequency]]) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const posts = await prisma.researchPost
    .findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } })
    .catch(() => []);

  const postRoutes = posts.map((p) => ({
    url: `${base}/research/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
