import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.researchPost.findUnique({ where: { slug } }).catch(() => null);
  if (!post) return { title: 'Research' };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt,
  };
}

export default async function ResearchPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.researchPost.findUnique({ where: { slug } }).catch(() => null);
  if (!post || post.status !== 'PUBLISHED') notFound();

  return (
    <article className="pt-[140px] pb-[120px]">
      <div className="container-site max-w-3xl">
        <Link href="/research" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          ← Back to research
        </Link>
        <div className="mt-6 mb-8 flex items-center gap-3">
          <Badge tone="expert">{post.category}</Badge>
          {post.publishedAt && (
            <span className="text-xs text-[var(--text-muted)]">
              {new Date(post.publishedAt).toLocaleDateString('en-GB', { dateStyle: 'long' })}
            </span>
          )}
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
                <a href={href} className="text-[var(--expert)] underline">{children}</a>
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
      </div>
    </article>
  );
}
