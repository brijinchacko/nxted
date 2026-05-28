import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { hashPassword, slugify } from '@/lib/utils';

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
  city: z.string(),
  country: z.string(),
  headline: z.string().optional(),
  bio: z.string().optional(),
  credentials: z.string(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  expertise: z.string(),
  coreSkills: z.string(),
  toolSkills: z.string().optional(),
  languages: z.string(),
  weeklyCapacityHours: z.number().int().min(1).max(80),
  hourlyRateGBP: z.number().min(0).max(1000),
  preferredTrack: z.string().optional(),
});

function csvToList(s?: string): string[] {
  if (!s) return [];
  return s
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

export async function POST(req: Request) {
  const body = (await req.json()) as unknown;
  const parsed = schema.safeParse(body);
  if (!parsed.success) return new NextResponse(parsed.error.message, { status: 400 });
  const d = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email: d.email } });
  if (existing) return new NextResponse('Email already registered', { status: 409 });

  const passwordHash = await hashPassword(d.password);
  const baseSlug = slugify(`${d.firstName}-${d.lastName}`) || 'contributor';
  let publicSlug = baseSlug;
  let i = 1;
  while (await prisma.contributorProfile.findUnique({ where: { publicSlug } })) {
    publicSlug = `${baseSlug}-${++i}`;
  }

  const user = await prisma.user.create({
    data: {
      email: d.email,
      passwordHash,
      role: 'CONTRIBUTOR',
      firstName: d.firstName,
      lastName: d.lastName,
      phone: d.phone || null,
      isVerified: false,
      contributorProfile: {
        create: {
          publicSlug,
          headline: d.headline || null,
          bio: d.bio || null,
          credentials: d.credentials,
          linkedinUrl: d.linkedinUrl || null,
          location: `${d.city}, ${d.country}`,
          expertise: csvToList(d.expertise),
          coreSkills: csvToList(d.coreSkills),
          toolSkills: csvToList(d.toolSkills),
          languages: csvToList(d.languages),
          weeklyCapacityHours: d.weeklyCapacityHours,
          hourlyRateGBP: d.hourlyRateGBP,
          availableForWork: true,
          isVerified: false,
          isActive: true,
          applicationStatus: 'SUBMITTED',
        },
      },
    },
  });

  return NextResponse.json({ id: user.id, publicSlug });
}
