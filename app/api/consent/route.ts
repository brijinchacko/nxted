import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { consentGiven?: boolean; consentTypes?: string[] };
  const session = await auth();
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
  const ipHash = ip ? createHash('sha256').update(ip).digest('hex').slice(0, 32) : null;
  await prisma.consentRecord.create({
    data: {
      userId: session?.user.id || null,
      ipHash,
      consentGiven: !!body.consentGiven,
      consentTypes: body.consentTypes || [],
    },
  });
  return NextResponse.json({ ok: true });
}
