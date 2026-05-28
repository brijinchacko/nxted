import type { Metadata } from 'next';
import { LegalShell, Section } from '@/components/legal/LegalShell';

export const metadata: Metadata = { title: 'Modern Slavery Statement' };

export default function ModernSlaveryPage() {
  return (
    <LegalShell
      title="Modern Slavery Statement"
      intro="Voluntary statement under section 54 of the UK Modern Slavery Act 2015. We are below the £36m turnover threshold for mandatory publication, but operate in India and consider the disclosure appropriate."
      effectiveDate="28 May 2026"
      currentSlug="modern-slavery"
    >
      <Section title="1. Organisation structure and supply chain">
        <p>OFORO LTD is a UK-registered company providing AI evaluation and physical-AI training data services through a network of contributors based primarily in India. Our supply chain comprises:</p>
        <ul>
          <li>Individual contributors who provide evaluation work remotely.</li>
          <li>Filming sites (Indian workshops, studios, and approved client sites) for Nxted Capture engagements.</li>
          <li>Cloud, payment, and SaaS sub-processors as listed in our <a href="/legal/dpa">Data Processing Agreement</a>.</li>
        </ul>
      </Section>

      <Section title="2. Policies">
        <p>We maintain the following policies relevant to modern slavery and human trafficking:</p>
        <ul>
          <li><a href="/legal/contributor-agreement">Contributor Agreement</a> — sets out fair pay, lawful working conditions, and the right to withdraw at any time.</li>
          <li><a href="/legal/aup">Acceptable Use Policy</a> — prohibits work that could expose contributors to coercion or harm.</li>
          <li><a href="/legal/bribery">Anti-Bribery Policy</a> — extends to recruitment and engagement of contributors.</li>
          <li><a href="/legal/whistleblowing">Whistleblowing Policy</a> — independent channel for raising concerns.</li>
        </ul>
      </Section>

      <Section title="3. Due diligence">
        <p>For Capture filming sites we conduct on-site verification before the first engagement at any new location. We require: workers are paid above the relevant local market rate; workers retain control over their identification documents at all times; participation is genuinely voluntary with no penalty for withdrawal; minors are excluded; the site complies with applicable Indian labour law.</p>
      </Section>

      <Section title="4. Risk assessment">
        <p>The highest-risk area is informal labour at Capture filming sites. We mitigate this by working only with sites that have an identifiable owner of record, a payroll system, and a willingness to allow independent verification.</p>
      </Section>

      <Section title="5. Training and KPIs">
        <p>All staff receive onboarding training on modern slavery red flags. We track: number of new filming sites audited; number of contributor reports of coercion or unfair conditions (target: zero); time to investigate any such report (target: 5 business days).</p>
      </Section>

      <Section title="6. Approval">
        <p>This statement was approved by the Board of OFORO LTD on 28 May 2026 and will be refreshed annually within 6 months of the financial year end.</p>
      </Section>
    </LegalShell>
  );
}
