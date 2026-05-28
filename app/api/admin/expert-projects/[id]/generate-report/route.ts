import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateReportNarrative } from '@/lib/openrouter';
import { generateCode } from '@/lib/utils';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return new NextResponse('Forbidden', { status: 403 });

  const project = await prisma.expertProject.findUnique({
    where: { id },
    include: {
      outputs: { include: { evaluations: true } },
      tasks: { include: { contributor: { include: { user: true } } } },
    },
  });
  if (!project) return new NextResponse('Not found', { status: 404 });

  const allEvals = project.outputs.flatMap((o) => o.evaluations);
  const total = allEvals.length;
  if (total === 0) return new NextResponse('No evaluations', { status: 400 });

  const correct = allEvals.filter((e) => e.result === 'CORRECT').length;
  const partial = allEvals.filter((e) => e.result === 'PARTIALLY_CORRECT').length;
  const accuracyRate = (correct + partial * 0.5) / total * 100;

  const errorBreakdown: Record<string, number> = {};
  allEvals.forEach((e) => {
    e.errorCategories.forEach((c) => {
      errorBreakdown[c] = (errorBreakdown[c] || 0) + 1;
    });
  });

  const agreements: number[] = [];
  for (const o of project.outputs) {
    if (o.evaluations.length < 2) continue;
    const results = o.evaluations.map((e) => e.result);
    const matches = results.slice(1).filter((r) => r === results[0]).length;
    agreements.push((matches + 1) / results.length);
  }
  const interRaterAgreement = agreements.length ? (agreements.reduce((a, b) => a + b, 0) / agreements.length) * 100 : 100;

  const criticalFailureCount = allEvals.filter((e) => e.severityScore >= 4).length;
  const overallScore = Math.round((accuracyRate * 0.7) + (interRaterAgreement * 0.3));

  let narrative = {
    executiveSummary: 'Narrative not generated (OpenRouter key missing).',
    keyFindings: [] as { title: string; detail: string; severity: 'high' | 'medium' | 'low' }[],
    recommendations: [] as { title: string; detail: string; priority: 'immediate' | 'short-term' | 'long-term' }[],
  };

  if (process.env.OPENROUTER_API_KEY) {
    try {
      narrative = await generateReportNarrative({
        domain: project.aiDomain,
        qualityScore: overallScore,
        accuracyRate,
        interRaterAgreement,
        errorBreakdown,
        sampleFindings: allEvals.slice(0, 5).map((e) => ({ result: e.result, errorDesc: e.errorDescription || undefined })),
      });
    } catch (err) {
      console.error('OpenRouter generation failed:', err);
    }
  }

  const expertCredentials = project.tasks.map((t) => ({
    name: `${t.contributor.user.firstName} ${t.contributor.user.lastName.charAt(0)}.`,
    credentials: t.contributor.credentials || 'Verified contributor',
  }));

  const reportCode = generateCode('RPT');
  const report = await prisma.qualityReport.upsert({
    where: { projectId: id },
    create: {
      reportCode,
      projectId: id,
      overallScore,
      accuracyRate,
      interRaterAgreement,
      criticalFailureCount,
      errorBreakdown,
      executiveSummary: narrative.executiveSummary,
      keyFindings: narrative.keyFindings,
      recommendations: narrative.recommendations,
      expertCredentials,
      generatedAt: new Date(),
    },
    update: {
      overallScore,
      accuracyRate,
      interRaterAgreement,
      criticalFailureCount,
      errorBreakdown,
      executiveSummary: narrative.executiveSummary,
      keyFindings: narrative.keyFindings,
      recommendations: narrative.recommendations,
      expertCredentials,
      generatedAt: new Date(),
    },
  });

  await prisma.expertProject.update({ where: { id }, data: { status: 'COMPLETED' } });

  return NextResponse.redirect(new URL(`/admin/expert-projects/${id}`, req.url));
}
