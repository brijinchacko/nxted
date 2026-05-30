import { PrismaClient, type CaptureLevel } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { BLOG_POSTS } from './blog-seed';
import { seedTraffic } from './traffic-seed';

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
      credentials: 'B.Tech (mechanical) · 8 yrs in heavy industry & manufacturing',
      location: 'Pune, India',
      bio: 'Industrial AI evaluator with deep manufacturing background.',
    },
    {
      email: 'arjun.menon@example.com',
      firstName: 'Arjun',
      lastName: 'Menon',
      expertise: ['Healthcare', 'Medical AI', 'Cardiology'],
      credentials: 'MBBS · MD Internal Medicine · practising physician',
      location: 'New Delhi, India',
      bio: 'Practising physician focused on medical AI safety.',
    },
    {
      email: 'meera.iyer@example.com',
      firstName: 'Meera',
      lastName: 'Iyer',
      expertise: ['Law', 'Compliance', 'EU AI Act'],
      credentials: 'LLB · LLM in technology law · regulatory specialist',
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
      update: { credentials: spec.credentials, expertise: spec.expertise, bio: spec.bio },
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
    update: {
      expertCredentials: [
        { name: 'Priya R.', credentials: 'B.Tech mechanical · 8 yrs heavy industry' },
        { name: 'Arjun M.', credentials: 'MBBS · MD (cross-domain reviewer)' },
      ],
    },
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
        { name: 'Priya R.', credentials: 'B.Tech mechanical · 8 yrs heavy industry' },
        { name: 'Arjun M.', credentials: 'MBBS · MD (cross-domain reviewer)' },
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
      taskSpecification: 'Complete garment assembly across 60 task variations - hand stitching, machine sewing, finishing.',
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

  // Pipeline leads - one per stage
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

The internet is not a substitute. YouTube footage is third-person. Wikipedia is text. Reddit is opinions. Robot training requires *how* a skilled human moves through a task - joint angles, gaze, contact forces - recorded from the perspective the robot will occupy.

## The maths

NVIDIA's recent Embodied AI study found a **54% improvement** in manipulation accuracy moving from web-scraped to egocentric data. Apple Vision Pro researchers needed 829 hours of shoelace-tying footage to teach a robot a single dexterous task.

If you extrapolate that ratio to the 5,000+ tasks a general-purpose humanoid needs, you arrive at **1.5 million+ hours of egocentric video**. The supply does not exist.

## Why India

India has one of the world's largest skilled workforces, broad English fluency in the working population, and a materially lower cost base than the US. It is one of the few places where this scale of capture is economically rational.`,
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
- 500,000+ registered doctors
- 300,000+ chartered accountants
- 80,000 law graduates per year

## Why this matters for capture

A humanoid robot trained on dish-washing in California cannot generalise to a Mumbai household kitchen, a Tirupur tailoring floor, or a hospital operating theatre. India is not just cheaper - it is also a *broader* training distribution.`,
    },
    {
      slug: 'rlhf-in-2026-quality-concentration-beats-scale',
      title: 'RLHF in 2026: why quality concentration beats scale',
      excerpt: 'High-profile breaches showed that black-box, low-context evaluation cannot scale safely. The alternative is concentrated, transparent expertise.',
      category: 'RLHF',
      tags: ['rlhf', 'evaluation', 'quality'],
      content: `## The wake-up call

The high-profile data breaches that hit AI evaluation platforms in 2026 were not outliers - they were predictable. When you build an AI evaluation platform on a US-housed, opaque, sub-contracted crowd, the failure modes compound.

## The alternative

Quality concentration. Fewer evaluators, deeper expertise, full transparency on credentials and inter-rater agreement. EU/UK clients in particular cannot use platforms that hide who reviewed their AI.

## What good looks like in 2026

- Verified credentials, disclosed per project
- Inter-rater agreement reported per project
- Error taxonomies tied to the AI's deployment risks
- A DPA on day one`,
    },
    {
      slug: 'data-scaling-laws-for-robot-learning',
      title: 'The scaling laws that govern robot learning',
      excerpt: 'A peer-reviewed result from 2025 changed how we think about robot data: diversity beats raw volume, and generalisation follows a power law.',
      category: 'Research',
      tags: ['scaling laws', 'imitation learning', 'robotics'],
      content: `Language models have scaling laws. So, it turns out, does robot learning.

## The power law

The ICLR 2025 paper "Data Scaling Laws in Imitation Learning" collected more than 40,000 demonstrations and ran over 15,000 real-world rollouts. The headline finding: a policy's ability to generalise follows a roughly power-law relationship with the number of distinct environments and objects it has seen.

The surprising part is what does NOT drive generalisation. Adding more demonstrations of the same task in the same kitchen helps far less than adding the same task across many kitchens. Diversity of scene and object beats sheer volume.

## Why this matters for sourcing

If diversity is the dominant variable, then the cheapest path to a capable policy is broad coverage: many workers, many workshops, many tools, many lighting conditions. That is exactly the structure a country-scale skilled workforce provides, and exactly what Western, lab-bound datasets lack.

## The practical takeaway

- Optimise your capture budget for breadth, not repetition.
- Track environment and object counts as first-class metrics, not just hours.
- A diverse 200-hour dataset can outperform a narrow 1,000-hour one.

This is the research foundation under the Nxted Capture model.`,
    },
    {
      slug: 'inside-an-egocentric-capture-rig',
      title: 'Inside an egocentric capture rig',
      excerpt: 'What actually goes into a research-grade first-person capture: Aria glasses, depth sensors, hand pose, and the formats your training stack expects.',
      category: 'Physical AI',
      tags: ['egocentric', 'hardware', 'data formats'],
      content: `A useful capture rig is more than a camera on someone's head. Here is what a robotics-ready setup records, and why each signal matters.

## The sensor stack

- RGB, first-person, up to 1408 by 1408 at 30fps. The core observation stream.
- SLAM cameras for a 6DoF trajectory of the head and hands through space.
- Eye gaze. Where the worker looks is a strong prior for where the action is.
- Inertial measurement (accelerometer plus gyroscope) for motion.
- Depth (RealSense or ZED) and hand pose (mocap gloves or a handheld gripper) for the robotics-ready tier.

Much of this mirrors Meta Project Aria and the Ego-Exo4D methodology, which is why policies trained on it transfer.

## The formats that matter

Your training stack does not want raw video. It wants structured episodes:

- LeRobot: the Hugging Face standard, Parquet plus MP4 plus JSON.
- RLDS and TFDS: the format behind Open X-Embodiment.
- HDF5: the ALOHA and robomimic convention.

## Annotation

Every clip ships with action segmentation, first-person narration, hand-pose tracks, and skill-level metadata. The annotation is the difference between footage and training data.`,
    },
    {
      slug: 'what-ai-data-breaches-taught-the-industry',
      title: 'What the 2026 data breaches taught the AI data industry',
      excerpt: 'A major leak of contractor data in 2026 was not bad luck. It was an architecture problem, and it is avoidable.',
      category: 'Research',
      tags: ['security', 'data protection', 'rlhf'],
      content: `In early 2026 a leading AI talent marketplace disclosed a breach that exposed a large volume of data, including contractor identity documents, banking details, and biometric interview video. It reset the industry's assumptions about how to run a data platform.

## The lessons

- Do not store raw biometric video forever. A retention policy with hard deletion on rejection, and a fixed window after engagement, limits the blast radius.
- Never put a single LLM gateway inside the trust boundary without pinning dependencies by hash and isolating network egress. The initial compromise rode in through a poisoned open-source package.
- Encrypt personal data at rest with per-tenant keys, and encrypt biometrics in a separate key realm.
- Make MFA mandatory for every account, including contributors with tool access.
- Segregate the candidate database from the video evidence store. Different networks, different keys.

## How we build differently

Nxted treats capture footage as special-category data from the moment of capture, with envelope encryption, a separate biometric key realm, pinned dependencies, and retention windows written into the contract. Security is in the architecture, not the press release. See our Security Whitepaper for detail.`,
    },
    {
      slug: 'eu-ai-act-what-high-risk-providers-need',
      title: 'EU AI Act readiness: what to demand from your data vendor',
      excerpt: 'If you build a high-risk AI system, your training-data supplier is part of your compliance story. Here is the checklist.',
      category: 'RLHF',
      tags: ['eu ai act', 'compliance', 'governance'],
      content: `The EU AI Act (Regulation 2024/1689) places real obligations on providers of high-risk AI systems. Your data vendor cannot make you compliant, but the wrong vendor can make compliance much harder.

## What to require

- Article 10 (data governance): documented provenance, consent records, and quality controls for every batch of training or evaluation data.
- Annex IV (technical documentation): evaluation methodology, evaluator credentials, inter-rater agreement, and an error taxonomy, in a form you can drop into your technical file.
- Article 14 (human oversight): evidence that real domain experts, not just automated scoring, were the source of ground truth.
- A signed Data Processing Agreement and a clear position on international transfers (UK IDTA, EU SCCs).

## What to avoid

- Black-box evaluation where you never learn who reviewed your model or how qualified they were.
- US-only data residency when your training data contains EU personal data.
- Vendors that cannot articulate their position on prohibited practices under Article 5.

Nxted publishes an EU AI Act position statement and ships every Expert report with the credentials and metrics Annex IV expects.`,
    },
    {
      slug: 'the-economics-of-capture-in-india',
      title: 'From Tirupur to Tesla: the economics of capture in India',
      excerpt: 'Tesla paid up to 48 dollars an hour for motion-capture data in the US. India can deliver the same skilled capture for a fraction of that.',
      category: 'India Tech',
      tags: ['economics', 'india', 'capture'],
      content: `The West has already shown what this data is worth. The question is who can supply it at scale.

## The price signal

Public reporting put Tesla's pay for Optimus data-collection operators at up to 48 dollars an hour. DoorDash mobilised millions of couriers to film household chores for robotics partners. Robotics firms collectively spend over 100 million dollars a year buying real-world data.

## The India advantage

Industry estimates place skilled data-collection labour in the US at roughly 20 to 48 dollars an hour, versus a small fraction of that in India. The differential is commonly cited as 70 to 90 percent. But cost is only half the story.

India also offers:

- Volume: 45 million garment workers, 15 million carpenters, 12 million construction workers.
- Diversity: the breadth of trades that the scaling laws reward.
- English fluency for instruction and annotation.

## Ethical floor

Lower cost does not mean exploitation. Workers are paid above the local market rate, fully consented, and covered by a GDPR-aligned agreement. That is a precondition, not a marketing line.`,
    },
    {
      slug: 'red-teaming-domain-ai-needs-experts',
      title: 'Red-teaming domain AI: why generalist crowds miss expert failures',
      excerpt: 'The most dangerous AI failures are the ones only a domain expert can spot. A generalist crowd will rate them as fine.',
      category: 'RLHF',
      tags: ['red-team', 'evaluation', 'safety'],
      content: `Most evaluation crowds are generalists. That is fine for "is this answer polite and on topic." It is dangerous for "is this answer clinically, legally, or structurally correct."

## The blind spot

A confident, fluent, and completely wrong answer about bearing failure modes, drug interactions, or contract law will sail through a generalist review. The error is invisible unless the reviewer has the domain training to recognise it. This is where black-box, generalist marketplaces quietly fail their clients.

## What expert red-teaming looks like

- Reviewers matched to the exact sub-domain: not "engineering" but "vibration analysis."
- Adversarial prompts crafted by people who know how the system breaks in the real world.
- Severity scoring that reflects deployment risk, not surface plausibility.
- Inter-rater agreement so you can tell signal from noise.

## The bar

If your AI makes decisions a professional would be liable for, your evaluators should have the credentials that professional has. That is the standard Nxted Expert is built to.`,
    },
  ];

  const allPosts = [
    ...posts.map((p) => ({ ...p, metaTitle: null as string | null, metaDesc: null as string | null })),
    ...BLOG_POSTS.map((p) => ({
      ...p,
      metaTitle: p.metaTitle as string | null,
      metaDesc: p.metaDesc as string | null,
    })),
  ];

  for (const p of allPosts) {
    const readingTime = Math.max(2, Math.round(p.content.split(/\s+/).length / 220));
    await prisma.researchPost.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        tags: p.tags,
        content: p.content,
        readingTime,
        metaTitle: p.metaTitle,
        metaDesc: p.metaDesc,
      },
      create: {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        tags: p.tags,
        content: p.content,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        readingTime,
        metaTitle: p.metaTitle,
        metaDesc: p.metaDesc,
      },
    });
  }

  const pageViews = await seedTraffic(prisma);
  console.log('Seeded demo page views:', pageViews);

  console.log('Seed complete.');
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
