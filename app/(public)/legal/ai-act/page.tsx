import type { Metadata } from 'next';
import { LegalShell, Section } from '@/components/legal/LegalShell';

export const metadata: Metadata = { title: 'EU AI Act Position Statement', description: "The nxted EU AI Act position: how expert evaluation and capture data support Article 10 data governance and Annex IV documentation for high-risk AI.", alternates: { canonical: "/legal/ai-act" } };

export default function AiActPage() {
  return (
    <LegalShell
      title="EU AI Act Position Statement"
      intro="Our role under Regulation (EU) 2024/1689 (the EU AI Act), and how we help clients meet their obligations."
      effectiveDate="28 May 2026"
      currentSlug="ai-act"
    >
      <Section title="1. Our role">
        <p>OFORO LTD is <strong>not a provider of an AI system</strong> within the meaning of Article 3(3) of Regulation (EU) 2024/1689. We provide evaluation services (Nxted Expert) and training data licensing (Nxted Capture). Clients remain the providers of their own AI systems and retain the regulatory responsibilities that come with that role.</p>
      </Section>

      <Section title="2. How we support client compliance">
        <ul>
          <li><strong>Article 10 - Data and data governance.</strong> Capture footage is delivered with documented data provenance, consent records, balanced demographic sampling where the client specifies it, and quality controls (review of every batch before delivery).</li>
          <li><strong>Annex IV - Technical documentation.</strong> Our quality reports include evaluation methodology, expert credentials (degree, institution, years of experience), inter-rater agreement metrics, and error taxonomy - designed to drop into Annex IV documentation packs.</li>
          <li><strong>Article 14 - Human oversight.</strong> Our evaluation interface preserves the role of human experts as the source of ground truth; we do not substitute fully automated scoring.</li>
          <li><strong>Article 15 - Accuracy, robustness, cybersecurity.</strong> Our red-team engagements directly test these properties.</li>
          <li><strong>Articles 53, 55 - General-purpose AI models.</strong> For clients training GPAI models (including those crossing the systemic-risk threshold), our evaluations and capture data can feed the transparency, technical documentation, and post-market monitoring obligations effective 2 August 2025.</li>
        </ul>
      </Section>

      <Section title="3. Prohibited practices (Article 5)">
        <p>We will not provide services that support practices prohibited under Article 5 - see the <a href="/legal/aup">Acceptable Use Policy</a> for the full list.</p>
      </Section>

      <Section title="4. Authorised representative">
        <p>Where Article 22 requires a Client to appoint an authorised representative in the Union, we do not act as that representative. We can introduce Clients to specialist firms providing this service.</p>
      </Section>

      <Section title="5. Updates">
        <p>We will update this statement as the European Commission publishes implementing acts, harmonised standards (CEN-CENELEC JTC 21), and the AI Office issues guidance. This page is informational and is not legal advice; engage qualified counsel for your specific compliance posture.</p>
      </Section>
    </LegalShell>
  );
}
