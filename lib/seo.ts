import type { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://nxted.ai';
export const SITE_NAME = 'nxted.ai';
export const ORG_LEGAL_NAME = 'OFORO LTD';

interface PageMetaInput {
  /** Full, absolute <title> (<= ~60 chars). Bypasses the layout title template. */
  title: string;
  /** Meta description (<= ~155 chars). */
  description: string;
  /** Route path beginning with "/" (used for canonical + og:url). */
  path: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  noindex?: boolean;
  /** Optional explicit OG image path; otherwise the file-based opengraph-image is used. */
  image?: string;
}

/**
 * Build a complete, GEO-friendly Metadata object for a page:
 * absolute title, description, canonical URL, Open Graph + Twitter, robots.
 */
export function pageMeta({
  title,
  description,
  path,
  keywords,
  ogType = 'website',
  noindex,
  image,
}: PageMetaInput): Metadata {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  const images = image ? [{ url: image }] : undefined;
  return {
    title: { absolute: title },
    description,
    ...(keywords && keywords.length ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_GB',
      ...(images ? { images } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(images ? { images } : {}),
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
