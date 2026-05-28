import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await auth();
  const client = session?.user.id
    ? await prisma.clientProfile.findUnique({ where: { userId: session.user.id }, include: { user: true } })
    : null;

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-h2">Settings</h1>
      <Card>
        <CardHeader><CardTitle>Account</CardTitle></CardHeader>
        <CardBody>
          <dl className="grid grid-cols-3 gap-y-3 text-sm">
            <dt className="text-[var(--text-muted)]">Name</dt><dd className="col-span-2">{client?.user.firstName} {client?.user.lastName}</dd>
            <dt className="text-[var(--text-muted)]">Email</dt><dd className="col-span-2">{client?.user.email}</dd>
            <dt className="text-[var(--text-muted)]">Company</dt><dd className="col-span-2">{client?.companyName}</dd>
            <dt className="text-[var(--text-muted)]">Country</dt><dd className="col-span-2">{client?.country}</dd>
            <dt className="text-[var(--text-muted)]">Billing currency</dt><dd className="col-span-2">{client?.currency}</dd>
          </dl>
        </CardBody>
      </Card>
      <Card>
        <CardHeader><CardTitle>Need a change?</CardTitle></CardHeader>
        <CardBody>Email <a className="text-[var(--expert)] underline" href="mailto:hello@nxted.ai">hello@nxted.ai</a> and we'll update your profile within one business day.</CardBody>
      </Card>
    </div>
  );
}
