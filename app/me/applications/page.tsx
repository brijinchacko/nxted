import Link from 'next/link';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';

export default async function ApplicationsPage() {
  const session = await auth();
  const contributor = session?.user.id
    ? await prisma.contributorProfile.findUnique({
        where: { userId: session.user.id },
        include: { applications: { include: { project: true }, orderBy: { appliedAt: 'desc' } } },
      })
    : null;

  return (
    <div className="max-w-5xl">
      <h1 className="text-h2 mb-8">My applications</h1>
      <div className="surface overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-card-hover)] border-b border-[var(--border-default)]">
            <tr className="text-left">
              <th className="px-6 py-4 text-[var(--text-tertiary)] text-xs uppercase tracking-wider">Project</th>
              <th className="px-6 py-4 text-[var(--text-tertiary)] text-xs uppercase tracking-wider">Applied</th>
              <th className="px-6 py-4 text-[var(--text-tertiary)] text-xs uppercase tracking-wider">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {contributor?.applications.length ? (
              contributor.applications.map((a) => (
                <tr key={a.id} className="border-b border-[var(--border-dim)] last:border-0">
                  <td className="px-6 py-4">
                    <div className="text-[var(--text-primary)] font-medium">{a.project.title}</div>
                    <div className="text-xs text-[var(--text-tertiary)] mt-0.5">{a.project.projectCode}</div>
                  </td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{new Date(a.appliedAt).toLocaleDateString('en-GB')}</td>
                  <td className="px-6 py-4">
                    <Badge tone={
                      a.status === 'OFFER_SENT' ? 'expert'
                      : a.status === 'OFFER_ACCEPTED' ? 'success'
                      : a.status === 'REJECTED' || a.status === 'OFFER_DECLINED' ? 'danger'
                      : 'warning'
                    }>{a.status.replace(/_/g, ' ')}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/me/marketplace/${a.project.id}`} className="text-[var(--expert)] hover:underline text-sm">Open →</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="p-10 text-center text-[var(--text-tertiary)]">No applications yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
