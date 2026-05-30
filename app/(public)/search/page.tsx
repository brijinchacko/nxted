import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { pageMeta } from '@/lib/seo';
import { Badge } from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';

export const metadata = pageMeta({
  title: 'Search nxted research & insights',
  description:
    'Search nxted research and insights on physical AI, egocentric data, RLHF, robotics dataset formats and data governance.',
  path: '/search',
  noindex: true,
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  const query = q.trim();

  const posts = query
    ? await prisma.researchPost
        .findMany({
          where: {
            status: 'PUBLISHED',
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { excerpt: { contains: query, mode: 'insensitive' } },
              { content: { contains: query, mode: 'insensitive' } },
              { tags: { has: query.toLowerCase() } },
            ],
          },
          orderBy: { publishedAt: 'desc' },
          take: 30,
        })
        .catch(() => [])
    : [];

  return (
    <section className="page-pad">
      <div className="container-site max-w-3xl">
        <h1 className="text-h1 mb-6">Search</h1>
        <form action="/search" method="get" className="mb-10">
          <label htmlFor="q" className="sr-only">Search</label>
          <input
            id="q"
            name="q"
            defaultValue={query}
            placeholder="Search research and insights..."
            className="w-full bg-[var(--bg-card)] border border-[var(--border-default)] rounded-lg px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--expert)]"
          />
        </form>

        {query && (
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            {posts.length} result{posts.length === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
          </p>
        )}

        <div className="space-y-4">
          {posts.map((p) => (
            <Link key={p.id} href={`/research/${p.slug}`} className="block surface surface-hover p-5">
              <Badge tone="expert">{p.category}</Badge>
              <h2 className="text-h4 mt-3">{p.title}</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-2">{p.excerpt}</p>
            </Link>
          ))}
          {query && posts.length === 0 && (
            <p className="text-[var(--text-secondary)]">
              No results. Try a broader term, or browse{' '}
              <Link href="/research" className="text-[var(--expert)] underline">all research</Link>.
            </p>
          )}
          {!query && (
            <p className="text-[var(--text-secondary)]">
              Type a query above, or browse{' '}
              <Link href="/research" className="text-[var(--expert)] underline">all research</Link>.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
