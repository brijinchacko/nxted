import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  contactName: z.string().min(1),
  companyName: z.string().min(1),
  email: z.string().email(),
  industry: z.string().optional(),
  productInterest: z.enum(['EXPERT', 'CAPTURE', 'BOTH']).default('BOTH'),
  notes: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(req: Request) {
  const body = (await req.json()) as unknown;
  const parsed = schema.safeParse(body);
  if (!parsed.success) return new NextResponse(parsed.error.message, { status: 400 });
  const lead = await prisma.lead.create({ data: parsed.data });
  return NextResponse.json({ id: lead.id });
}
