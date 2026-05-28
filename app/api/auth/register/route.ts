import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/utils';

const schema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  companyName: z.string().min(1).max(120),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new NextResponse('Invalid JSON', { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return new NextResponse(parsed.error.message, { status: 400 });
  const { firstName, lastName, email, password, companyName } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return new NextResponse('Email already registered', { status: 409 });

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: 'CLIENT',
      firstName,
      lastName,
      isVerified: false,
      clientProfile: { create: { companyName } },
    },
  });

  return NextResponse.json({ id: user.id });
}
