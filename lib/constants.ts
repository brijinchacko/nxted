export const COMPANY = {
  name: process.env.COMPANY_NAME || 'OFORO LTD',
  number: process.env.COMPANY_NUMBER || '16787568',
  address:
    process.env.COMPANY_ADDRESS || 'Unit 8 Lyon Road, Milton Keynes, England, MK1 1EX',
} as const;

export const APP = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'nxted.ai',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://nxted.ai',
  brandParent: process.env.NEXT_PUBLIC_BRAND_PARENT || 'OFORO LTD',
} as const;

export const NAV_LINKS = [
  { href: '/expert', label: 'Expert' },
  { href: '/capture', label: 'Capture' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
] as const;

export const TICKER_ITEMS = [
  'HUMANOID ROBOT MARKET: $165B BY 2034',
  '54% ROBOT IMPROVEMENT WITH EGOCENTRIC DATA',
  '1M HOURS OF PHYSICAL AI DATA COLLECTED IN 2026',
  '500M+ INDIA SKILLED WORKERS AVAILABLE',
  'ZERO COMPETITORS DOING BOTH TEXT + PHYSICAL AI FROM INDIA',
];

export const CAPTURE_LEVELS = [
  {
    id: 'L1_FOUNDATION',
    number: '01',
    title: 'Foundation',
    skills: 'Sorting, stacking, packing, basic assembly, labeling',
    complexity: 1,
    price: 'from $35/hr',
    example: 'Pack 50 items per minute across 5 product types',
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=600&fit=crop',
    accent: 'expert' as const,
  },
  {
    id: 'L2_SKILLED_TRADES',
    number: '02',
    title: 'Skilled Trades',
    skills: 'Tailoring, carpentry, cooking, cleaning, gardening',
    complexity: 2,
    price: 'from $55/hr',
    example: 'Complete garment assembly with hand and machine techniques',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=600&fit=crop',
    accent: 'capture' as const,
  },
  {
    id: 'L3_TECHNICAL',
    number: '03',
    title: 'Technical / Industrial',
    skills: 'CNC operation, welding, electrical work, plumbing, electronics assembly',
    complexity: 3,
    price: 'from $80/hr',
    example: 'Set up and operate a CNC lathe for precision part manufacture',
    image: 'https://images.unsplash.com/photo-1565514020179-026b92b2d70b?w=800&h=600&fit=crop',
    accent: 'expert' as const,
  },
  {
    id: 'L4_PROFESSIONAL',
    number: '04',
    title: 'Professional / Medical',
    skills: 'Surgical assistance, patient care, pharmacy, dental, lab work',
    complexity: 4,
    price: 'from $120/hr',
    example: 'Prep and assist in laparoscopic procedure, instrument handling',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&h=600&fit=crop',
    accent: 'capture' as const,
  },
  {
    id: 'L5_SPECIALIST',
    number: '05',
    title: 'Rare / Specialist',
    skills: 'Heritage crafts, traditional medicine, precision jewellery, instrument making',
    complexity: 5,
    price: 'Custom quote',
    example: 'Traditional Kanjivaram silk weaving — 40-step process',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop',
    accent: 'expert' as const,
  },
] as const;

export const SKILL_CATEGORIES = [
  'Tailoring',
  'Carpentry',
  'Cooking',
  'Cleaning',
  'Medical',
  'Engineering',
  'CNC / Machining',
  'Electrical',
  'Construction',
  'Agriculture',
  'Heritage Crafts',
  'Other',
] as const;

export const AI_DOMAINS = [
  'Industrial Equipment & Predictive Maintenance',
  'Healthcare & Medical Decision Support',
  'Legal & Compliance',
  'Financial Analysis',
  'Coding & Software Engineering',
  'Customer Support',
  'Manufacturing & Process Control',
  'Education & Tutoring',
  'Research Assistance',
  'Other',
] as const;

export const EXPERT_PRODUCTS = [
  {
    key: 'QUICK_SPRINT',
    label: 'Quick Sprint',
    price: '£249',
    priceEnv: 'STRIPE_EXPERT_QUICK_PRICE',
    outputs: '50 outputs',
    turnaround: '48-hour delivery',
    description: 'One-off batch — full quality report.',
    mode: 'payment' as const,
  },
  {
    key: 'RETAINER_STARTER',
    label: 'Starter Retainer',
    price: '£1,500/mo',
    priceEnv: 'STRIPE_EXPERT_STARTER_PRICE',
    outputs: '50–200 outputs/month',
    turnaround: 'Rolling delivery',
    description: 'Ongoing evaluation, dashboard access.',
    mode: 'subscription' as const,
  },
  {
    key: 'RETAINER_GROWTH',
    label: 'Growth Retainer',
    price: '£3,500/mo',
    priceEnv: 'STRIPE_EXPERT_GROWTH_PRICE',
    outputs: '200–500 outputs/month',
    turnaround: 'Priority review',
    description: 'Higher throughput, weekly trend reports.',
    mode: 'subscription' as const,
  },
  {
    key: 'RETAINER_SCALE',
    label: 'Scale Retainer',
    price: '£5,000/mo',
    priceEnv: 'STRIPE_EXPERT_SCALE_PRICE',
    outputs: '500+ outputs/month',
    turnaround: 'Dedicated coordinator',
    description: 'Custom rubric design, EU AI Act docs.',
    mode: 'subscription' as const,
  },
] as const;

export const COMPETITORS = [
  {
    name: 'Mercor',
    sub: '$10B valuation · 4TB breach March 2026',
    body: 'Black box evaluation with zero quality transparency. US servers = GDPR violation for EU clients. No physical AI capability whatsoever.',
  },
  {
    name: 'Scale AI / Outlier',
    sub: '$29B · 49% owned by Meta',
    body: 'Direct conflict for any lab competing with Meta. OpenAI and Google already left. $500K+ minimum engagement.',
  },
  {
    name: 'Claru',
    sub: 'US-based · Physical AI only',
    body: '$340/hr for recording in California. Zero India operations. Missing the world\'s richest skill base.',
  },
  {
    name: 'Surge AI',
    sub: '$1.2B revenue · referral-only',
    body: 'You can\'t get in. Referral-only access. No India concentration. Zero physical AI capability.',
  },
] as const;

export const INDIA_NUMBERS = [
  { number: '45M', label: 'garment workers — precision hand skills' },
  { number: '15M+', label: 'carpenters — complex 3D assembly' },
  { number: '12M+', label: 'construction workers — heavy physical tasks' },
  { number: '1.5M', label: 'STEM graduates annually — technical evaluation' },
  { number: '500K', label: 'doctors — medical AI evaluation' },
  { number: '80K', label: 'law graduates — legal domain expertise' },
  { number: '300K+', label: 'CAs (ICAI) — financial AI evaluation' },
] as const;
