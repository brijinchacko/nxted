import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export default async function ContributorsPage() {
  const contributors = await prisma.contributorProfile.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);

  return (
    <div className="max-w-6xl">
      <h1 className="text-h2 mb-8">Contributors</h1>
      <div className="border border-[var(--border-default)] rounded-[12px] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-card)] border-b border-[var(--border-default)] text-left">
            <tr>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Name</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Expertise</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Tasks</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Score</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {contributors.length ? contributors.map((c) => (
              <tr key={c.id} className="border-b border-[var(--border-dim)] last:border-0">
                <td className="p-4">
                  <div className="text-[var(--text-primary)] font-medium">{c.user.firstName} {c.user.lastName}</div>
                  <div className="text-xs text-[var(--text-muted)]">{c.user.email}</div>
                </td>
                <td className="p-4 text-[var(--text-secondary)]">{c.expertise.slice(0, 2).join(' · ')}</td>
                <td className="p-4 text-[var(--text-secondary)]">{c.totalTasks}</td>
                <td className="p-4 text-[var(--text-secondary)]">{c.averageScore.toFixed(1)}</td>
                <td className="p-4">
                  <Badge tone={c.isVerified ? 'success' : 'warning'}>{c.isVerified ? 'Verified' : 'Pending'}</Badge>
                </td>
                <td className="p-4 text-right">
                  <form action={`/api/admin/contributors/${c.id}/verify`} method="POST">
                    <Button type="submit" size="sm" variant={c.isVerified ? 'outline' : 'expert'}>
                      {c.isVerified ? 'Unverify' : 'Verify'}
                    </Button>
                  </form>
                </td>
              </tr>
            )) : (<tr><td colSpan={6} className="p-8 text-center text-[var(--text-muted)]">No contributors yet.</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
