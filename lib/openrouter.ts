import OpenAI from 'openai';

export const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || '',
  baseURL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'https://nxted.ai',
    'X-Title': 'nxted.ai',
  },
});

export const MODELS = {
  smart: process.env.OPENROUTER_MODEL || 'anthropic/claude-sonnet-4-5',
  fast: process.env.OPENROUTER_FALLBACK_MODEL || 'anthropic/claude-haiku-4-5-20251001',
} as const;

export interface ReportInput {
  domain: string;
  qualityScore: number;
  accuracyRate: number;
  interRaterAgreement: number;
  errorBreakdown: Record<string, number>;
  sampleFindings: Array<{ result: string; errorDesc?: string }>;
}

export interface ReportNarrative {
  executiveSummary: string;
  keyFindings: Array<{ title: string; detail: string; severity: 'high' | 'medium' | 'low' }>;
  recommendations: Array<{
    title: string;
    detail: string;
    priority: 'immediate' | 'short-term' | 'long-term';
  }>;
}

export async function generateReportNarrative(data: ReportInput): Promise<ReportNarrative> {
  const response = await openrouter.chat.completions.create({
    model: MODELS.smart,
    messages: [
      {
        role: 'user',
        content: `You are a senior AI quality assessor at Nxted. Write a professional quality report for a client.

Domain: ${data.domain}
Quality Score: ${data.qualityScore}/100
Accuracy Rate: ${data.accuracyRate}%
Inter-Rater Agreement: ${data.interRaterAgreement}%
Error Breakdown: ${JSON.stringify(data.errorBreakdown)}
Sample findings: ${JSON.stringify(data.sampleFindings.slice(0, 5))}

Write: 1) 3-paragraph executive summary, 2) 3-5 key findings, 3) 3-5 recommendations.

Return ONLY valid JSON: {"executiveSummary":"...","keyFindings":[{"title":"...","detail":"...","severity":"high|medium|low"}],"recommendations":[{"title":"...","detail":"...","priority":"immediate|short-term|long-term"}]}`,
      },
    ],
    max_tokens: 1500,
    response_format: { type: 'json_object' },
  });
  const content = response.choices[0]?.message?.content || '{}';
  return JSON.parse(content) as ReportNarrative;
}
