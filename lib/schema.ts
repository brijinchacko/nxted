import { SITE_URL, SITE_NAME, ORG_LEGAL_NAME } from './seo';

const ORG_ID = `${SITE_URL}/#organization`;
const OG = `${SITE_URL}/opengraph-image`;

/** Sitewide Organization. Use one canonical @id everywhere else references. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    legalName: ORG_LEGAL_NAME,
    url: SITE_URL,
    logo: OG,
    image: OG,
    description:
      'Physical AI training data and expert RLHF evaluation from India - consented, robotics-ready and UK/EU-contracted.',
    parentOrganization: { '@type': 'Organization', name: ORG_LEGAL_NAME },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit 8 Lyon Road',
      addressLocality: 'Milton Keynes',
      postalCode: 'MK1 1EX',
      addressCountry: 'GB',
    },
    areaServed: ['GB', 'EU', 'US', 'IN'],
    knowsAbout: [
      'Physical AI',
      'Egocentric data',
      'Robot manipulation datasets',
      'Vision-language-action models',
      'RLHF',
      'Human evaluation for AI',
      'Embodied AI',
      'Data provenance',
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-GB',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  serviceType: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    provider: { '@id': ORG_ID },
    areaServed: ['GB', 'EU', 'US'],
    url: `${SITE_URL}${opts.path}`,
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    author: { '@type': 'Organization', name: opts.authorName || 'nxted Research Team', url: SITE_URL },
    publisher: { '@id': ORG_ID },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    image: opts.image || OG,
    mainEntityOfPage: `${SITE_URL}${opts.path}`,
    inLanguage: 'en-GB',
  };
}

/**
 * schema.org/Dataset for an illustrative example delivery. Marked clearly as
 * an example structure - we do not claim a downloadable public dataset.
 */
export function datasetSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'nxted Capture industrial egocentric dataset (example structure)',
    description:
      'Illustrative structure of an nxted Capture industrial delivery: raw and processed egocentric video, third-person reference, task cards, action labels, full metadata (calibration, 6-DoF poses), a dataset card, consent manifest and QA report, exported in LeRobot, RLDS and HDF5.',
    creator: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    license: `${SITE_URL}/trust`,
    isAccessibleForFree: false,
    keywords: [
      'egocentric data',
      'robot manipulation',
      'industrial manipulation',
      'LeRobot',
      'RLDS',
      'HDF5',
      'physical AI',
    ],
    measurementTechnique: 'Egocentric (first-person) human demonstration capture',
    variableMeasured: ['RGB video', 'Depth', 'Hand pose', '6-DoF trajectory', 'Action labels'],
    distribution: [
      { '@type': 'DataDownload', encodingFormat: 'LeRobot' },
      { '@type': 'DataDownload', encodingFormat: 'RLDS' },
      { '@type': 'DataDownload', encodingFormat: 'HDF5' },
    ],
    url: `${SITE_URL}/capture`,
  };
}
