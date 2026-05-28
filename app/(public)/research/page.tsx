import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { FadeUp } from '@/components/motion/FadeUp';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Research — Nxted',
};

export const dynamic = 'force-dynamic';

export default async function ResearchPage() {
  const posts = await prisma.researchPost
    .findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 30,
    })
    .catch(() => []);

  return (
    <section className="pt-[140px] pb-[120px]">
      <div className="container-site max-w-5xl">
        <div className="mb-12 max-w-3xl">
          <div className="text-label text-[var(--text-secondary)] mb-4">Research</div>
          <h1 className="text-h1">
            Notes from the frontier of <span className="text-[var(--expert)]">human × machine</span>.
          </h1>
        </div>

        {posts.length === 0 ? (
          <p className="text-[var(--text-muted)]">No research posts published yet.</p>
        ) : (
          <ul className="divide-y divide-[var(--border-dim)]">
            {posts.map((post, i) => (
              <FadeUp key={post.id} delay={i * 0.04}>
                <li className="py-8">
                  <Link href={`/research/${post.slug}`} className="group block">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge tone="expert">{post.category}</Badge>
                      {post.publishedAt && (
                        <span className="text-xs text-[var(--text-muted)]">
                          {new Date(post.publishedAt).toLocaleDateString('en-GB', { dateStyle: 'medium' })}
                        </span>
                      )}
                      {post.readingTime && (
                        <span className="text-xs text-[var(--text-muted)]">· {post.readingTime} min read</span>
                      )}
                    </div>
                    <h2 className="text-h3 mb-2 group-hover:text-[var(--expert)] transition-colors">{post.title}</h2>
                    <p className="text-[var(--text-secondary)]">{post.excerpt}</p>
                  </Link>
                </li>
              </FadeUp>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
