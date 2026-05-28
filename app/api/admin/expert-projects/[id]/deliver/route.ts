import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendMail } from '@/lib/resend';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return new NextResponse('Forbidden', { status: 403 });

  const project = await prisma.expertProject.update({
    where: { id },
    data: { status: 'DELIVERED', deliveredAt: new Date() },
    include: { clientProfile: { include: { user: true } }, qualityReport: true },
  });

  await prisma.qualityReport.update({
    where: { projectId: id },
    data: { sentToClientAt: new Date() },
  });

  await prisma.notification.create({
    data: {
      userId: project.clientProfile.user.id,
      title: 'Quality report ready',
      body: `Your report for "${project.title}" is ready in the portal.`,
      link: `/portal/expert/${project.id}`,
    },
  });

  await sendMail({
    to: project.clientProfile.user.email,
    subject: `Your Nxted quality report is ready — ${project.title}`,
    html: `<p>Hi ${project.clientProfile.user.firstName},</p>
<p>Your quality report for <strong>${project.title}</strong> is ready in the Nxted portal.</p>
<p>Overall score: <strong>${project.qualityReport?.overallScore.toFixed(0)}/100</strong></p>
<p><a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/expert/${project.id}">View report →</a></p>`,
  }).catch(() => null);

  return NextResponse.redirect(new URL(`/admin/expert-projects/${id}`, req.url));
}
