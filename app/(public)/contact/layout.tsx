import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Contact nxted | Talk to the Team',
  description:
    'Talk to nxted about expert AI evaluation or physical-AI data capture - request a Test Kit, a custom dataset quote or compliance documentation.',
  path: '/contact',
  keywords: ['contact nxted', 'request robotics dataset', 'AI training data quote'],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
