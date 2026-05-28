import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { COMPANY } from '@/lib/constants';

const DOCS: Record<string, { title: string; body: string }> = {
  terms: {
    title: 'Terms of Service',
    body: `These terms govern your use of nxted.ai operated by ${COMPANY.name}.

Use of any Nxted Expert or Nxted Capture product constitutes acceptance of these terms, the privacy policy and the data processing addendum referenced therein.

Full terms available on request: hello@nxted.ai`,
  },
  privacy: {
    title: 'Privacy Policy',
    body: `${COMPANY.name} is the data controller for personal data collected via nxted.ai.

We collect: account details (name, email, company), payment metadata (handled by Stripe), and usage analytics where you have consented.

We process personal data on the lawful bases of contract performance and legitimate interests. EU/UK residents may exercise GDPR rights by emailing hello@nxted.ai.

We retain client account data for the duration of the contractual relationship plus 6 years (UK statutory requirement). Contributor evaluation data is retained for 24 months and then anonymised.`,
  },
  gdpr: {
    title: 'GDPR & Data',
    body: `${COMPANY.name} is registered in the UK and complies with the UK GDPR and (for EU clients) the EU GDPR.

Data residency: by default, application data is stored in EU/UK regions. Capture footage is stored in EU regions unless the client elects otherwise in writing.

International transfers: where personal data is transferred to India for processing by our contributor network, we rely on the UK International Data Transfer Agreement.

A Data Processing Addendum (DPA) is available on request and is countersigned for all Capture orders by default.`,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const { doc } = await params;
  const found = DOCS[doc];
  return { title: found?.title || 'Legal' };
}

export default async function LegalPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  const found = DOCS[doc];
  if (!found) notFound();
  return (
    <section className="page-pad">
      <div className="container-site max-w-3xl">
        <div className="text-label text-[var(--text-secondary)] mb-4">Legal</div>
        <h1 className="text-h1 mb-8">{found.title}</h1>
        <div className="whitespace-pre-line text-[var(--text-secondary)] leading-relaxed">{found.body}</div>
        <p className="mt-12 text-sm text-[var(--text-muted)]">
          {COMPANY.name} · {COMPANY.address} · Company No. {COMPANY.number}
        </p>
      </div>
    </section>
  );
}
