import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/seo';

const fmt = (d: Date) =>
  new Date(d).toLocaleDateString('en-GB', { dateStyle: 'long' });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.researchPost.findUnique({ where: { slug } }).catch(() => null);
  if (!post) return { title: 'Research' };
  const title = post.metaTitle || post.title;
  const description = post.metaDesc || post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/research/${post.slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `${SITE_URL}/research/${post.slug}`,
      publishedTime: (post.publishedAt || post.createdAt).toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: ['nxted Research Team'],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function ResearchPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.researchPost.findUnique({ where: { slug } }).catch(() => null);
  if (!post || post.status !== 'PUBLISHED') notFound();

  const path = `/research/${post.slug}`;
  const datePublished = (post.publishedAt || post.createdAt).toISOString();
  const dateModified = post.updatedAt.toISOString();

  return (
    <article className="page-pad">
      <div className="container-site max-w-3xl">
        <Link href="/research" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          ← Back to research
        </Link>
        <div className="mt-6 mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[var(--text-tertiary)]">
          <Badge tone="expert">{post.category}</Badge>
          <span>By nxted Research Team</span>
          {post.publishedAt && <span>· Published {fmt(post.publishedAt)}</span>}
          <span>· Updated {fmt(post.updatedAt)}</span>
          {post.readingTime ? <span>· {post.readingTime} min read</span> : null}
        </div>
        <h1 className="text-h1 mb-6">{post.title}</h1>
        <p className="text-body text-[var(--text-secondary)] mb-12">{post.excerpt}</p>
        <div className="prose-content text-[var(--text-primary)] leading-relaxed">
          <ReactMarkdown
            components={{
              h2: ({ children }) => <h2 className="text-h3 mt-12 mb-4">{children}</h2>,
              h3: ({ children }) => <h3 className="text-h4 mt-8 mb-3">{children}</h3>,
              p: ({ children }) => <p className="mb-5 text-[var(--text-secondary)]">{children}</p>,
              li: ({ children }) => <li className="mb-2 text-[var(--text-secondary)]">{children}</li>,
              ul: ({ children }) => <ul className="list-disc pl-6 mb-5">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-6 mb-5">{children}</ol>,
              a: ({ children, href }) => (
                <a href={href} className="text-[var(--expert)] underline" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-[var(--expert)] pl-6 my-6 italic text-[var(--text-primary)]">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="px-1.5 py-0.5 bg-[var(--bg-card)] rounded text-sm text-[var(--expert)]">{children}</code>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Author / E-E-A-T box */}
        <div className="surface p-6 mt-14 flex items-start gap-4">
          <div className="w-11 h-11 rounded-lg bg-[var(--expert-dim)] flex items-center justify-center shrink-0">
            <span style={{ color: 'var(--expert)' }} className="font-heading font-extrabold text-lg">n</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">nxted Research Team</div>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Physical-AI data specialists at OFORO LTD (UK). We write about egocentric data, robotics
              dataset formats, RLHF and data governance.{' '}
              <Link href="/capture" className="text-[var(--expert)] underline">
                See what we build
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.metaDesc || post.excerpt,
            path,
            datePublished,
            dateModified,
            image: post.featuredImage || undefined,
          }),
          breadcrumbSchema([
            { name: 'Research', path: '/research' },
            { name: post.title, path },
          ]),
        ]}
      />
    </article>
  );
}
