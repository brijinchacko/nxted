import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';
import { formatGBP } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function InvoicesPage() {
  const session = await auth();
  const client = session?.user.id
    ? await prisma.clientProfile.findUnique({ where: { userId: session.user.id }, include: { invoices: { orderBy: { createdAt: 'desc' } } } })
    : null;
  return (
    <div className="max-w-4xl">
      <h1 className="text-h2 mb-8">Invoices</h1>
      <div className="border border-[var(--border-default)] rounded-[12px] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-card)] border-b border-[var(--border-default)] text-left">
            <tr>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Invoice</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Due</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Total</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Status</th>
            </tr>
          </thead>
          <tbody>
            {client?.invoices.length ? (
              client.invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-[var(--border-dim)] last:border-0">
                  <td className="p-4 text-[var(--text-primary)] font-medium">{inv.invoiceNumber}</td>
                  <td className="p-4 text-[var(--text-secondary)]">{new Date(inv.dueDate).toLocaleDateString('en-GB')}</td>
                  <td className="p-4 text-[var(--text-primary)]">{formatGBP(inv.total)}</td>
                  <td className="p-4"><Badge tone={inv.status === 'PAID' ? 'success' : inv.status === 'OVERDUE' ? 'danger' : 'warning'}>{inv.status}</Badge></td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="p-8 text-center text-[var(--text-muted)]">No invoices yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
