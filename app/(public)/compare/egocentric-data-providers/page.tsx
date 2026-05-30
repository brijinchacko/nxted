import { EntityPageView, type EntityPage } from '@/components/seo/EntityPageView';
import { pageMeta } from '@/lib/seo';

const PAGE: EntityPage = {
  slug: 'egocentric-data-providers',
  eyebrow: 'Comparison',
  accent: 'expert',
  title: 'Egocentric Data Providers for Robotics, Compared',
  metaTitle: 'Egocentric Data Providers for Robotics, Compared | nxted',
  metaDesc:
    'A neutral comparison of the four kinds of egocentric data provider for robotics - annotation vendors, expert-evaluation networks, gig-scale collectors and specialist capture - and how to choose.',
  keywords: ['egocentric data providers for robotics', 'compare robotics data vendors', 'physical AI data provider'],
  question: 'How do egocentric data providers for robotics compare?',
  directAnswer:
    'Egocentric data providers fall into four groups: broad annotation vendors, expert-evaluation networks, gig-scale egocentric collectors, and specialist physical-skill capture companies. The best fit depends on whether you need labelling volume, expert review, everyday-task breadth, or expert-reviewed demonstrations of skilled work delivered robotics-ready with provenance.',
  sections: [
    {
      heading: 'The four categories',
      body: 'Each trades volume against skill depth, annotation and compliance.',
      bullets: [
        'Broad annotation vendors - strong on volume and labelling; weaker on first-person capture of skilled work. Best when you already have footage to label.',
        'Expert-evaluation networks - credentialed reviewers built for text/code RLHF; not designed for physical capture. Best for model evaluation.',
        'Gig-scale egocentric collectors - large crowds filming everyday tasks; limited reach into skilled or industrial work. Best for generic home tasks.',
        'Specialist physical-skill capture (e.g. nxted) - expert-reviewed industrial/technical demonstrations with provenance, delivered robotics-ready. Best for skilled manipulation and regulated buyers.',
      ],
    },
    {
      heading: 'How to evaluate any provider',
      body: 'Compare on the things that actually determine whether the data is usable.',
      bullets: [
        'Output formats: LeRobot, RLDS, HDF5 - or just raw video?',
        'Provenance and consent: dataset card, provenance log, signed DPA, redaction.',
        'Skill verification: can they prove the contributor is qualified?',
        'Annotation depth: action segmentation, hand pose, 6-DoF, success labels.',
        'Compliance: EU AI Act and DPDP position for UK/EU deployment.',
      ],
    },
    {
      heading: 'Why diversity beats raw volume',
      body: 'Peer-reviewed imitation-learning scaling laws (ICLR 2025) show policy generalisation tracks the number of distinct environments and objects, not simply demonstration count. A diverse, skilled dataset can outperform a larger, narrower one - which is why breadth of workers, tools and settings is worth paying for.',
    },
  ],
  faq: [
    { q: 'Who are the egocentric data providers for robotics?', a: 'They span broad annotation vendors, expert-evaluation networks, gig-scale egocentric collectors, and specialist physical-skill capture companies such as nxted. Each category trades volume against skill depth, annotation and compliance.' },
    { q: 'What should I ask an egocentric data vendor?', a: 'Ask about output formats (LeRobot/RLDS/HDF5), consent and provenance, skill verification, annotation depth, and a signed DPA with redaction and EU AI Act / DPDP alignment.' },
    { q: 'Is more data always better?', a: 'No. Generalisation tracks the number of environments and objects more than raw demonstration count, so diversity often beats sheer volume.' },
  ],
  ctaHref: '/capture',
  ctaLabel: 'See how nxted compares',
  related: [
    { label: 'Best egocentric data providers (guide)', href: '/research/best-egocentric-data-providers-for-robotics' },
    { label: 'Scale AI alternative', href: '/alternatives/scale-ai' },
    { label: 'Appen alternative', href: '/alternatives/appen' },
  ],
};

export const metadata = pageMeta({
  title: PAGE.metaTitle,
  description: PAGE.metaDesc,
  path: '/compare/egocentric-data-providers',
  keywords: PAGE.keywords,
});

export default function ComparePage() {
  return <EntityPageView page={PAGE} basePath="/compare" baseLabel="Compare" />;
}
