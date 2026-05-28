import Link from 'next/link';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatGBP } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function CaptureOrdersPage() {
  const session = await auth();
  const client = session?.user.id
    ? await prisma.clientProfile.findUnique({
        where: { userId: session.user.id },
        include: { captureOrders: { orderBy: { createdAt: 'desc' } } },
      })
    : null;

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-h2">Capture orders</h1>
        <Button href="/portal/capture/new" variant="capture">+ Request capture</Button>
      </div>

      <div className="border border-[var(--border-default)] rounded-[12px] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-card)] border-b border-[var(--border-default)]">
            <tr className="text-left">
              <th className="p-4 font-medium text-[var(--text-secondary)]">Order</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Skill</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Level</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Hours</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Status</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Quote</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {client?.captureOrders.length ? (
              client.captureOrders.map((o) => (
                <tr key={o.id} className="border-b border-[var(--border-dim)] last:border-0">
                  <td className="p-4 text-[var(--text-primary)] font-medium">{o.orderCode}</td>
                  <td className="p-4 text-[var(--text-secondary)]">{o.skillCategory}</td>
                  <td className="p-4 text-[var(--text-secondary)]">{o.level.replace('L', '').split('_')[0]}</td>
                  <td className="p-4 text-[var(--text-secondary)]">{o.hoursRequested}</td>
                  <td className="p-4"><Badge tone="capture">{o.status.replace(/_/g, ' ')}</Badge></td>
                  <td className="p-4 text-[var(--text-secondary)]">{o.quotedPriceGBP ? formatGBP(o.quotedPriceGBP) : '—'}</td>
                  <td className="p-4 text-right">
                    <Link href={`/portal/capture/orders/${o.id}`} className="text-[var(--capture)] hover:underline text-sm">Open →</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={7} className="p-8 text-center text-[var(--text-muted)]">No capture orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
