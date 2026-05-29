import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';
import { formatGBP } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function EarningsPage() {
  const session = await auth();
  const contributor = session?.user.id
    ? await prisma.contributorProfile.findUnique({
        where: { userId: session.user.id },
        include: { payouts: { orderBy: { createdAt: 'desc' } } },
      })
    : null;

  return (
    <div className="max-w-4xl">
      <h1 className="text-h2 mb-8">Earnings</h1>
      <div className="border border-[var(--border-default)] rounded-[12px] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-card)] border-b border-[var(--border-default)] text-left">
            <tr>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Period</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Amount</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Status</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Reference</th>
            </tr>
          </thead>
          <tbody>
            {contributor?.payouts.length ? (
              contributor.payouts.map((p) => (
                <tr key={p.id} className="border-b border-[var(--border-dim)] last:border-0">
                  <td className="p-4 text-[var(--text-primary)]">{p.period}</td>
                  <td className="p-4">{formatGBP(p.amount)}</td>
                  <td className="p-4"><Badge tone={p.status === 'PAID' ? 'success' : 'warning'}>{p.status}</Badge></td>
                  <td className="p-4 text-[var(--text-muted)] text-xs">{p.paymentRef || '-'}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="p-8 text-center text-[var(--text-muted)]">No payouts recorded yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
