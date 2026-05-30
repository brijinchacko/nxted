import type { MetadataRoute } from 'next';

// AI answer-engine + search retrieval crawlers we explicitly welcome.
// Allowing these is what makes nxted eligible to be cited in AI answers.
const AI_BOTS = [
  'OAI-SearchBot', // ChatGPT search
  'ChatGPT-User', // ChatGPT browse-on-demand
  'GPTBot', // OpenAI
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended', // Gemini grounding
  'GoogleOther',
  'Bingbot', // ChatGPT search uses the Bing index
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'Amazonbot',
  'cohere-ai',
  'Applebot',
  'Applebot-Extended',
];

const DISALLOW = ['/portal', '/me', '/admin', '/api', '/auth'];

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://nxted.ai';
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
