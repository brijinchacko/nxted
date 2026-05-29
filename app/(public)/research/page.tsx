import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { FadeUp } from '@/components/motion/FadeUp';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Research - Nxted',
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
    <section className="page-pad">
      <div className="container-narrow">
        <div className="mb-14 max-w-3xl">
          <div className="text-label mb-5">Research</div>
          <h1 className="text-h1">
            Notes from the frontier of <span className="text-[var(--expert)]">human × machine</span>.
          </h1>
        </div>

        {posts.length === 0 ? (
          <p className="text-[var(--text-tertiary)]">No research posts published yet.</p>
        ) : (
          <ul className="divide-y divide-[var(--border-dim)]">
            {posts.map((post, i) => (
              <FadeUp key={post.id} delay={i * 0.04}>
                <li className="py-8">
                  <Link href={`/research/${post.slug}`} className="group block">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <Badge tone="expert">{post.category}</Badge>
                      {post.publishedAt && (
                        <span className="text-xs text-[var(--text-tertiary)]">
                          {new Date(post.publishedAt).toLocaleDateString('en-GB', { dateStyle: 'medium' })}
                        </span>
                      )}
                      {post.readingTime && (
                        <span className="text-xs text-[var(--text-tertiary)]">· {post.readingTime} min read</span>
                      )}
                    </div>
                    <h2 className="text-h3 mb-2 group-hover:text-[var(--expert)] transition-colors">{post.title}</h2>
                    <p className="text-[var(--text-secondary)] mb-3">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm text-[var(--expert)] group-hover:gap-2 transition-all">
                      Read <ArrowRight size={14} />
                    </span>
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
