import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateCode } from '@/lib/utils';

const schema = z.object({
  title: z.string().min(1),
  track: z.enum(['EXPERT_EVAL', 'RED_TEAM', 'COMPLIANCE', 'WRITTEN_EVAL', 'CAPTURE']),
  domain: z.string().min(1),
  summary: z.string().min(1),
  scopeDetails: z.string().min(1),
  requirements: z.string().optional(),
  toolsList: z.string().optional(),
  estimatedHours: z.number().int().min(1),
  hourlyRateGBP: z.number().min(1),
  totalBudgetGBP: z.number().min(0).nullable().optional(),
  seatsAvailable: z.number().int().min(1).default(1),
});

function csvToList(s?: string): string[] {
  if (!s) return [];
  return s.split(',').map((x) => x.trim()).filter(Boolean);
}

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return new NextResponse('Forbidden', { status: 403 });

  const body = (await req.json()) as unknown;
  const parsed = schema.safeParse(body);
  if (!parsed.success) return new NextResponse(parsed.error.message, { status: 400 });
  const d = parsed.data;

  const project = await prisma.marketplaceProject.create({
    data: {
      projectCode: generateCode('MKT'),
      title: d.title,
      track: d.track,
      domain: d.domain,
      summary: d.summary,
      scopeDetails: d.scopeDetails,
      requirements: csvToList(d.requirements),
      toolsList: csvToList(d.toolsList),
      estimatedHours: d.estimatedHours,
      hourlyRateGBP: d.hourlyRateGBP,
      totalBudgetGBP: d.totalBudgetGBP ?? null,
      seatsAvailable: d.seatsAvailable,
      status: 'OPEN',
      postedById: session.user.id,
    },
  });

  return NextResponse.json({ id: project.id });
}
