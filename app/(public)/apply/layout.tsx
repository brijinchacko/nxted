import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Apply as a Contributor | nxted.ai',
  description:
    'Join nxted as a verified domain expert or skilled contributor - paid AI evaluation and physical-skill capture work, consent-first and fairly paid.',
  path: '/apply',
  keywords: ['AI evaluation jobs', 'data collection contributor', 'egocentric capture work'],
});

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
