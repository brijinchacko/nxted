import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/utils';

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  expertise: z.string(),
  credentials: z.string(),
  bio: z.string().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
});

export async function POST(req: Request) {
  const body = (await req.json()) as unknown;
  const parsed = schema.safeParse(body);
  if (!parsed.success) return new NextResponse(parsed.error.message, { status: 400 });
  const { firstName, lastName, email, password, expertise, credentials, bio, linkedinUrl } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return new NextResponse('Email already registered', { status: 409 });

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: 'CONTRIBUTOR',
      firstName,
      lastName,
      contributorProfile: {
        create: {
          expertise: expertise.split(',').map((e) => e.trim()).filter(Boolean),
          credentials,
          bio,
          linkedinUrl: linkedinUrl || null,
          isVerified: false,
        },
      },
    },
  });

  return NextResponse.json({ id: user.id });
}
