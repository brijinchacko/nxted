import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'How nxted Works: Evaluation & Capture | nxted.ai',
  description:
    'How nxted delivers expert AI evaluation and physical-AI capture - from brief to quality report or robotics-ready dataset, step by step.',
  path: '/how-it-works',
  keywords: ['how nxted works', 'AI evaluation process', 'data capture process'],
});

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
