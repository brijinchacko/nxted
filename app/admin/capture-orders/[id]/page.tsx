import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export default async function AdminCaptureDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.captureOrder.findUnique({
    where: { id },
    include: { clientProfile: { include: { user: true } } },
  });
  if (!order) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">{order.orderCode}</div>
        <h1 className="text-h2">{order.clientProfile.companyName}</h1>
        <Badge tone="capture" className="mt-3">{order.status.replace(/_/g, ' ')}</Badge>
      </div>

      <Card>
        <CardHeader><CardTitle>Specification</CardTitle></CardHeader>
        <CardBody>
          <dl className="grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-[var(--text-muted)]">Skill</dt><dd>{order.skillCategory}</dd>
            <dt className="text-[var(--text-muted)]">Level</dt><dd>L{order.level.replace('L', '').split('_')[0]}</dd>
            <dt className="text-[var(--text-muted)]">Hours</dt><dd>{order.hoursRequested}</dd>
            <dt className="text-[var(--text-muted)]">Format</dt><dd>{order.outputFormat}</dd>
            <dt className="text-[var(--text-muted)]">Annotation</dt><dd>{order.annotationLevel}</dd>
            <dt className="text-[var(--text-muted)]">Environment</dt><dd>{order.environmentType}</dd>
          </dl>
          <div className="mt-6 pt-6 border-t border-[var(--border-dim)]">
            <div className="text-label text-[var(--text-muted)] mb-2">Tasks</div>
            <p className="whitespace-pre-line">{order.taskSpecification}</p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><CardTitle>Send quote</CardTitle></CardHeader>
        <CardBody>
          <form action={`/api/admin/capture-orders/${order.id}/quote`} method="POST" className="flex gap-3 items-center">
            <input name="quotedPriceGBP" type="number" step="0.01" placeholder="£ amount" required defaultValue={order.quotedPriceGBP || ''} className="flex-1 h-11 px-4 rounded-md bg-[var(--bg-input)] border border-[var(--border-default)]" />
            <Button type="submit" variant="capture">Send quote email</Button>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><CardTitle>Coordinator notes</CardTitle></CardHeader>
        <CardBody>
          <form action={`/api/admin/capture-orders/${order.id}/notes`} method="POST" className="space-y-3">
            <textarea name="coordinatorNotes" rows={4} defaultValue={order.coordinatorNotes || ''} className="w-full p-4 rounded-md bg-[var(--bg-input)] border border-[var(--border-default)]" />
            <Button type="submit" size="sm">Save notes</Button>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><CardTitle>Delivery</CardTitle></CardHeader>
        <CardBody>
          <form action={`/api/admin/capture-orders/${order.id}/deliver`} method="POST" className="flex gap-3 items-center">
            <input name="deliveryUrl" type="url" placeholder="https://…" required defaultValue={order.deliveryUrl || ''} className="flex-1 h-11 px-4 rounded-md bg-[var(--bg-input)] border border-[var(--border-default)]" />
            <Button type="submit" variant="expert">Mark delivered</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
