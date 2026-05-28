import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardBody } from '@/components/ui/Card';

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  const session = await auth();
  const notifications = session?.user.id
    ? await prisma.notification.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: 'desc' } }).catch(() => [])
    : [];
  return (
    <div className="max-w-3xl">
      <h1 className="text-h2 mb-8">Messages</h1>
      {notifications.length === 0 ? (
        <p className="text-[var(--text-muted)]">No messages yet.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li key={n.id}>
              <Card>
                <CardBody>
                  <div className="flex justify-between gap-4">
                    <div>
                      <div className="font-medium text-[var(--text-primary)]">{n.title}</div>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">{n.body}</p>
                    </div>
                    <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">{new Date(n.createdAt).toLocaleDateString('en-GB')}</span>
                  </div>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
