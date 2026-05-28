import { PrismaClient, type CaptureLevel } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function ensureUser(opts: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'CLIENT' | 'CONTRIBUTOR';
}) {
  const passwordHash = await bcrypt.hash(opts.password, 10);
  return prisma.user.upsert({
    where: { email: opts.email },
    update: {},
    create: {
      email: opts.email,
      passwordHash,
      role: opts.role,
      firstName: opts.firstName,
      lastName: opts.lastName,
      isVerified: true,
      isActive: true,
    },
  });
}

async function main() {
  console.log('Seeding...');

  // Admin
  await ensureUser({
    email: 'admin@nxted.ai',
    password: 'Admin@NXTED2026!',
    firstName: 'Nxted',
    lastName: 'Admin',
    role: 'ADMIN',
  });

  // Contributors
  const contributorSpecs = [
    {
      email: 'priya.rao@example.com',
      firstName: 'Priya',
      lastName: 'Rao',
      expertise: ['Industrial Engineering', 'PLC/SCADA', 'Manufacturing'],
      credentials: 'B.Tech, IIT Bombay · 8 yrs at L&T heavy industries',
      location: 'Pune, India',
      bio: 'Industrial AI evaluator with deep manufacturing background.',
    },
    {
      email: 'arjun.menon@example.com',
      firstName: 'Arjun',
      lastName: 'Menon',
      expertise: ['Healthcare', 'Medical AI', 'Cardiology'],
      credentials: 'MBBS, AIIMS Delhi · MD Internal Medicine',
      location: 'New Delhi, India',
      bio: 'Practising physician focused on medical AI safety.',
    },
    {
      email: 'meera.iyer@example.com',
      firstName: 'Meera',
      lastName: 'Iyer',
      expertise: ['Law', 'Compliance', 'EU AI Act'],
      credentials: 'LLB, NLU Bangalore · LLM, LSE',
      location: 'Bengaluru, India',
      bio: 'Tech regulation specialist with EU AI Act expertise.',
    },
  ];

  for (const spec of contributorSpecs) {
    const u = await ensureUser({
      email: spec.email,
      password: 'Contributor@2026!',
      firstName: spec.firstName,
      lastName: spec.lastName,
      role: 'CONTRIBUTOR',
    });
    await prisma.contributorProfile.upsert({
      where: { userId: u.id },
      update: {},
      create: {
        userId: u.id,
        expertise: spec.expertise,
        credentials: spec.credentials,
        location: spec.location,
        bio: spec.bio,
        isVerified: true,
        isActive: true,
        averageScore: 4.7,
        totalTasks: 18,
        totalEarned: 740,
      },
    });
  }

  // Client
  const clientUser = await ensureUser({
    email: 'client@example.co.uk',
    password: 'Client@2026!',
    firstName: 'Sam',
    lastName: 'Patel',
    role: 'CLIENT',
  });
  const client = await prisma.clientProfile.upsert({
    where: { userId: clientUser.id },
    update: {},
    create: {
      userId: clientUser.id,
      companyName: 'Northbridge Industrial AI',
      industry: 'Industrial automation',
      country: 'United Kingdom',
      currency: 'GBP',
    },
  });

  // Sample Expert project (delivered with report)
  const expertProject = await prisma.expertProject.upsert({
    where: { projectCode: 'EXP-2026-0001' },
    update: {},
    create: {
      projectCode: 'EXP-2026-0001',
      clientProfileId: client.id,
      title: 'Predictive maintenance reasoning audit',
      aiDomain: 'Industrial Equipment & Predictive Maintenance',
      aiUseCase: 'A model that predicts bearing failures from vibration sensor data.',
      whatCorrectMeans: 'Failure mode named correctly + remaining useful life within ±20%.',
      projectType: 'QUICK_SPRINT',
      status: 'DELIVERED',
      totalOutputs: 3,
      amountGBP: 249,
      paidAt: new Date(),
      deliveredAt: new Date(),
    },
  });

  await prisma.qualityReport.upsert({
    where: { projectId: expertProject.id },
    update: {},
    create: {
      reportCode: 'RPT-2026-0001',
      projectId: expertProject.id,
      overallScore: 73,
      accuracyRate: 71,
      interRaterAgreement: 94,
      criticalFailureCount: 2,
      errorBreakdown: { FACTUAL_ERROR: 12, DOMAIN_ERROR: 8, REASONING_ERROR: 5, HALLUCINATION: 3 },
      executiveSummary:
        'The model achieves baseline accuracy on common failure modes but struggles with mixed-mode degradation. Inter-rater agreement is high (94%), suggesting the issues are real rather than annotator noise. Recommend retraining on a balanced corpus that includes co-occurring failure modes.',
      keyFindings: [
        { title: 'Mixed-mode failures under-represented', detail: 'Outputs combining 2+ failure types were correctly diagnosed in only 34% of cases.', severity: 'high' },
        { title: 'Strong on single-cause cases', detail: 'Single-mode predictions reached 84% accuracy.', severity: 'low' },
        { title: 'Confidence calibration is inverted', detail: 'High-confidence outputs were wrong more often than medium-confidence ones.', severity: 'medium' },
      ],
      recommendations: [
        { title: 'Add mixed-mode training data', detail: 'Source 1,000 examples of co-occurring failure modes.', priority: 'immediate' },
        { title: 'Recalibrate confidence', detail: 'Apply temperature scaling on a held-out validation set.', priority: 'short-term' },
        { title: 'Add domain rubric to system prompt', detail: 'Embed the engineering rubric used here directly into the model\'s system instructions.', priority: 'short-term' },
      ],
      expertCredentials: [
        { name: 'Priya R.', credentials: 'B.Tech IIT Bombay · 8 yrs L&T' },
        { name: 'Arjun M.', credentials: 'MBBS AIIMS Delhi (cross-domain reviewer)' },
      ],
      generatedAt: new Date(),
      sentToClientAt: new Date(),
    },
  });

  // Sample Capture order (delivered)
  const captureLevel: CaptureLevel = 'L2_SKILLED_TRADES';
  await prisma.captureOrder.upsert({
    where: { orderCode: 'CAP-2026-0001' },
    update: {},
    create: {
      orderCode: 'CAP-2026-0001',
      clientProfileId: client.id,
      skillCategory: 'Tailoring',
      level: captureLevel,
      hoursRequested: 1000,
      environmentType: 'Indoor factory (Tirupur)',
      taskSpecification: 'Complete garment assembly across 60 task variations — hand stitching, machine sewing, finishing.',
      outputFormat: 'RLDS',
      annotationLevel: 'ROBOTICS_READY',
      needsDepthMap: true,
      needsPoseSkeleton: true,
      needsActionLabels: true,
      status: 'DELIVERED',
      quotedPriceGBP: 38000,
      finalPriceGBP: 38000,
      hoursDelivered: 1000,
      deliveredAt: new Date(),
      deliveryUrl: 'https://example.com/secure-download',
    },
  });

  // Pipeline leads — one per stage
  const stages = ['LEAD', 'CONTACTED', 'CALL_BOOKED', 'PROPOSAL', 'PILOT', 'ACTIVE', 'CHURNED'] as const;
  for (const stage of stages) {
    await prisma.lead.upsert({
      where: { id: `seed-${stage}` },
      update: {},
      create: {
        id: `seed-${stage}`,
        contactName: `Lead ${stage}`,
        companyName: `${stage} Robotics Co.`,
        email: `${stage.toLowerCase()}@example.com`,
        productInterest: stage === 'PILOT' ? 'BOTH' : stage === 'CHURNED' ? 'EXPERT' : 'CAPTURE',
        stage,
        estimatedValue: stage === 'ACTIVE' ? 120000 : 25000,
        source: 'seed',
      },
    });
  }

  // Research posts
  const posts = [
    {
      slug: 'why-egocentric-data-is-the-bottleneck-for-humanoid-robots',
      title: 'Why egocentric data is the bottleneck for humanoid robots',
      excerpt: 'The internet is not a substitute for first-person human demonstration. Here\'s the maths.',
      category: 'Physical AI',
      tags: ['humanoids', 'egocentric', 'data'],
      content: `## The bottleneck

Every humanoid robot today is gated on one thing: the supply of first-person human demonstration data.

The internet is not a substitute. YouTube footage is third-person. Wikipedia is text. Reddit is opinions. Robot training requires *how* a skilled human moves through a task — joint angles, gaze, contact forces — recorded from the perspective the robot will occupy.

## The maths

NVIDIA's recent Embodied AI study found a **54% improvement** in manipulation accuracy moving from web-scraped to egocentric data. Apple Vision Pro researchers needed 829 hours of shoelace-tying footage to teach a robot a single dexterous task.

If you extrapolate that ratio to the 5,000+ tasks a general-purpose humanoid needs, you arrive at **1.5 million+ hours of egocentric video**. The supply does not exist.

## Why India

India has 500 million skilled workers, English fluency in the working population, and a cost base 10× cheaper than the US. It is the only country where this scale of capture is economically rational.`,
    },
    {
      slug: 'india-and-physical-ai-the-numbers',
      title: 'India and physical AI: the numbers behind the opportunity',
      excerpt: '45M garment workers. 15M carpenters. 1.5M STEM graduates. Why India wins the physical AI supply race.',
      category: 'India Tech',
      tags: ['india', 'physical-ai'],
      content: `India is structurally different from every other Tier-1 AI training data market.

## The numbers

- 45 million garment workers (Tirupur, Surat, Bengaluru, Coimbatore)
- 15 million+ carpenters
- 12 million+ construction workers
- 1.5 million STEM graduates *annually*
- 500,000 doctors registered with the MCI
- 300,000+ chartered accountants (ICAI)
- 80,000 law graduates per year

## Why this matters for capture

A humanoid robot trained on dish-washing in California cannot generalise to a Mumbai household kitchen, a Tirupur tailoring floor, or an AIIMS operating theatre. India is not just cheaper — it is also a *broader* training distribution.`,
    },
    {
      slug: 'rlhf-in-2026-quality-concentration-beats-scale',
      title: 'RLHF in 2026: why quality concentration beats scale',
      excerpt: 'The Mercor breach was inevitable. Black-box, low-context evaluation cannot scale safely. The alternative is concentrated, transparent expertise.',
      category: 'RLHF',
      tags: ['rlhf', 'evaluation', 'quality'],
      content: `## The Mercor moment

The 4TB Mercor breach in March 2026 was not an outlier — it was an inevitability. When you build an AI evaluation platform on a US-housed, opaque, sub-contracted crowd, the failure modes compound.

## The alternative

Quality concentration. Fewer evaluators, deeper expertise, full transparency on credentials and inter-rater agreement. EU/UK clients in particular cannot use platforms that hide who reviewed their AI.

## What good looks like in 2026

- Verified credentials (IIT, AIIMS, ICAI, NLU)
- Inter-rater agreement reported per project
- Error taxonomies tied to the AI's deployment risks
- A DPA on day one`,
    },
  ];

  for (const p of posts) {
    await prisma.researchPost.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        tags: p.tags,
        content: p.content,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        readingTime: Math.max(2, Math.round(p.content.split(/\s+/).length / 220)),
      },
    });
  }

  console.log('Seed complete.');
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
