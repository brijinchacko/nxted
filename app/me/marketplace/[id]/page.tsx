import { notFound } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';
import { formatGBP } from '@/lib/utils';
import { ApplyForm } from './apply-form';

export const dynamic = 'force-dynamic';

const TRACK_LABEL: Record<string, string> = {
  EXPERT_EVAL: 'Expert evaluation',
  RED_TEAM: 'Red-team',
  COMPLIANCE: 'EU AI Act compliance',
  WRITTEN_EVAL: 'Written evaluation',
  CAPTURE: 'Capture',
};

export default async function MarketplaceProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const contributor = session?.user.id
    ? await prisma.contributorProfile.findUnique({ where: { userId: session.user.id } })
    : null;

  const project = await prisma.marketplaceProject.findUnique({
    where: { id },
    include: { applications: { where: { contributorId: contributor?.id || '__none__' } } },
  });
  if (!project) notFound();

  const application = project.applications[0];
  const seatsLeft = Math.max(0, project.seatsAvailable - project.seatsFilled);

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <Badge tone="expert">{TRACK_LABEL[project.track] || project.track}</Badge>
        <h1 className="text-h2 mt-4">{project.title}</h1>
        <div className="mt-3 text-sm text-[var(--text-tertiary)]">{project.projectCode} · {project.domain}</div>
      </div>

      <div className="surface p-8">
        <div className="grid sm:grid-cols-4 gap-6">
          <Stat label="Hourly rate" value={`${formatGBP(project.hourlyRateGBP)}`} />
          <Stat label="Est. hours" value={`${project.estimatedHours}h`} />
          <Stat label="Total budget" value={project.totalBudgetGBP ? formatGBP(project.totalBudgetGBP) : '—'} />
          <Stat label="Seats left" value={`${seatsLeft} / ${project.seatsAvailable}`} />
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-label">Summary</h2>
        <p className="text-[var(--text-primary)] whitespace-pre-line">{project.summary}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-label">Scope</h2>
        <p className="text-[var(--text-secondary)] whitespace-pre-line">{project.scopeDetails}</p>
      </section>

      {project.requirements.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-label">Required skills</h2>
          <div className="flex flex-wrap gap-2">
            {project.requirements.map((r) => (
              <span key={r} className="px-3 py-1.5 rounded-md border border-[var(--border-default)] text-sm text-[var(--text-primary)]">
                {r}
              </span>
            ))}
          </div>
        </section>
      )}

      {project.toolsList.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-label">Tools used</h2>
          <div className="flex flex-wrap gap-2">
            {project.toolsList.map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-md border border-[var(--border-default)] text-xs text-[var(--text-secondary)]">
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      {!contributor ? (
        <div className="surface p-6 text-center text-[var(--text-secondary)]">
          You need a contributor profile to apply. <a className="text-[var(--expert)] underline" href="/apply">Apply here</a>.
        </div>
      ) : application ? (
        <ApplicationStatusBlock status={application.status} note={application.offerNote || undefined} expires={application.offerExpiresAt || undefined} />
      ) : seatsLeft === 0 ? (
        <div className="surface p-6 text-center text-[var(--text-secondary)]">All seats filled. Watch the marketplace for similar projects.</div>
      ) : (
        <ApplyForm projectId={project.id} />
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-wider uppercase text-[var(--text-tertiary)] mb-1">{label}</div>
      <div className="text-xl font-semibold text-[var(--text-primary)]">{value}</div>
    </div>
  );
}

function ApplicationStatusBlock({ status, note, expires }: { status: string; note?: string; expires?: Date }) {
  const tone =
    status === 'OFFER_SENT' ? 'expert'
    : status === 'OFFER_ACCEPTED' ? 'success'
    : status === 'REJECTED' || status === 'OFFER_DECLINED' ? 'danger'
    : 'warning';
  return (
    <div className="surface p-7">
      <div className="flex items-center gap-3 mb-3">
        <Badge tone={tone}>{status.replace(/_/g, ' ')}</Badge>
        {expires && <span className="text-xs text-[var(--text-tertiary)]">Offer expires {new Date(expires).toLocaleString('en-GB')}</span>}
      </div>
      {note && <p className="text-sm text-[var(--text-secondary)]">{note}</p>}
    </div>
  );
}
