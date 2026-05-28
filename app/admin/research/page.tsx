import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';

export default async function ResearchCmsPage() {
  const posts = await prisma.researchPost.findMany({ orderBy: { updatedAt: 'desc' } }).catch(() => []);
  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-h2">Research CMS</h1>
        <Button href="/admin/research/new" variant="expert">+ New post</Button>
      </div>
      <div className="border border-[var(--border-default)] rounded-[12px] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-card)] border-b border-[var(--border-default)] text-left">
            <tr>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Title</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Category</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Status</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Updated</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {posts.length ? posts.map((p) => (
              <tr key={p.id} className="border-b border-[var(--border-dim)] last:border-0">
                <td className="p-4 text-[var(--text-primary)] font-medium">{p.title}</td>
                <td className="p-4 text-[var(--text-secondary)]">{p.category}</td>
                <td className="p-4"><Badge tone={p.status === 'PUBLISHED' ? 'success' : 'warning'}>{p.status}</Badge></td>
                <td className="p-4 text-xs text-[var(--text-muted)]">{new Date(p.updatedAt).toLocaleDateString('en-GB')}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/research/${p.id}/edit`} className="text-[var(--expert)] hover:underline text-sm">Edit →</Link>
                </td>
              </tr>
            )) : (<tr><td colSpan={5} className="p-8 text-center text-[var(--text-muted)]">No posts yet.</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
