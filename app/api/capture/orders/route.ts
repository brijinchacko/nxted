import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateCode } from '@/lib/utils';

const schema = z.object({
  skillCategory: z.string(),
  level: z.enum(['L1_FOUNDATION', 'L2_SKILLED_TRADES', 'L3_TECHNICAL', 'L4_PROFESSIONAL', 'L5_SPECIALIST']),
  hoursRequested: z.number().int().min(1),
  environmentType: z.string(),
  taskSpecification: z.string(),
  hardwareNotes: z.string().optional().nullable(),
  outputFormat: z.string(),
  annotationLevel: z.string(),
  needsDepthMap: z.boolean().optional(),
  needsPoseSkeleton: z.boolean().optional(),
  needsActionLabels: z.boolean().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user.id) return new NextResponse('Unauthorized', { status: 401 });
  const client = await prisma.clientProfile.findUnique({ where: { userId: session.user.id } });
  if (!client) return new NextResponse('No client profile', { status: 400 });

  const body = (await req.json()) as unknown;
  const parsed = schema.safeParse(body);
  if (!parsed.success) return new NextResponse(parsed.error.message, { status: 400 });

  const orderCode = generateCode('CAP');
  const order = await prisma.captureOrder.create({
    data: {
      orderCode,
      clientProfileId: client.id,
      ...parsed.data,
      hardwareNotes: parsed.data.hardwareNotes || null,
      status: 'QUOTE_REQUESTED',
    },
  });
  return NextResponse.json({ id: order.id });
}
