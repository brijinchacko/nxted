import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await auth();
  const contributor = session?.user.id
    ? await prisma.contributorProfile.findUnique({ where: { userId: session.user.id }, include: { user: true } })
    : null;
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-h2">Profile</h1>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{contributor?.user.firstName} {contributor?.user.lastName}</CardTitle>
            <Badge tone={contributor?.isVerified ? 'success' : 'warning'}>
              {contributor?.isVerified ? 'Verified' : 'Pending verification'}
            </Badge>
          </div>
        </CardHeader>
        <CardBody>
          <dl className="grid grid-cols-3 gap-y-3 text-sm">
            <dt className="text-[var(--text-muted)]">Email</dt><dd className="col-span-2">{contributor?.user.email}</dd>
            <dt className="text-[var(--text-muted)]">Location</dt><dd className="col-span-2">{contributor?.location}</dd>
            <dt className="text-[var(--text-muted)]">Timezone</dt><dd className="col-span-2">{contributor?.timezone}</dd>
            <dt className="text-[var(--text-muted)]">Expertise</dt><dd className="col-span-2">{contributor?.expertise.join(' · ')}</dd>
            <dt className="text-[var(--text-muted)]">Credentials</dt><dd className="col-span-2">{contributor?.credentials}</dd>
            <dt className="text-[var(--text-muted)]">LinkedIn</dt>
            <dd className="col-span-2">
              {contributor?.linkedinUrl ? <a className="text-[var(--expert)] underline" href={contributor.linkedinUrl} target="_blank" rel="noopener noreferrer">{contributor.linkedinUrl}</a> : '-'}
            </dd>
          </dl>
          {contributor?.bio && (
            <div className="mt-6 pt-6 border-t border-[var(--border-dim)]">
              <div className="text-label text-[var(--text-muted)] mb-2">Bio</div>
              <p className="text-[var(--text-primary)] whitespace-pre-line">{contributor.bio}</p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
