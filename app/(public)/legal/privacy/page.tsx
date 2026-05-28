import type { Metadata } from 'next';
import { LegalShell, Section, Sub } from '@/components/legal/LegalShell';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      intro="OFORO LTD is the data controller for personal data you provide to nxted.ai. This policy explains what we collect, how we use it, and your rights under the UK GDPR, EU GDPR, and India's Digital Personal Data Protection Act 2023."
      effectiveDate="28 May 2026"
      currentSlug="privacy"
    >
      <Section title="1. Controller identity and contacts">
        <p>
          <strong>Data Controller:</strong> OFORO LTD, Company No. 16787568, registered office at Unit 8 Lyon Road, Milton Keynes, England, MK1 1EX. ICO registration: pending.
        </p>
        <p>
          <strong>Data Protection Officer (DPO):</strong> <a href="mailto:dpo@nxted.ai">dpo@nxted.ai</a>. Appointed under Article 37 UK GDPR because our core processing includes large-scale processing of Article 9 special category data (biometric data via Nxted Capture).
        </p>
        <p>
          <strong>EU Representative (Article 27 EU GDPR):</strong> contact details published on this page once appointed; in the meantime EU data subjects may contact our DPO.
        </p>
      </Section>

      <Section title="2. Controller / Processor split">
        <p>Our role depends on the data set:</p>
        <ul>
          <li><strong>Controller</strong> for: contributor and contributor-applicant data; capture-subject footage; Client account holders' contact data; website visitor analytics.</li>
          <li><strong>Processor</strong> for: personal data embedded in Client uploads to Expert evaluation (e.g. names or identifiers contained in the AI outputs the Client asks us to evaluate). The terms in the <a href="/legal/dpa">Data Processing Agreement</a> govern that processing.</li>
        </ul>
      </Section>

      <Section title="3. Categories of personal data we process">
        <table>
          <thead><tr><th>Category</th><th>Examples</th><th>Source</th></tr></thead>
          <tbody>
            <tr><td>Account data</td><td>Name, email, password hash, role, company</td><td>You</td></tr>
            <tr><td>Contributor profile</td><td>CV, expertise, languages, hourly rate, capacity</td><td>Contributor</td></tr>
            <tr><td>KYC / payments</td><td>Bank or UPI account details, tax ID, ID verification</td><td>Contributor / payments provider</td></tr>
            <tr><td>Capture footage</td><td>Egocentric video, audio, hand-pose, biometric data</td><td>Capture subject (consent)</td></tr>
            <tr><td>Client-uploaded data</td><td>AI outputs, prompts; may contain personal data</td><td>Client (we are processor)</td></tr>
            <tr><td>Usage and security</td><td>Logs, IP, device, cookie identifiers</td><td>Automated</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="4. Lawful bases">
        <p>We rely on the following lawful bases under Article 6 UK GDPR:</p>
        <ul>
          <li><strong>Contract (Art 6(1)(b))</strong> — to deliver the Services to Clients and engage Contributors.</li>
          <li><strong>Legitimate interests (Art 6(1)(f))</strong> — for service improvement, fraud prevention, security, and limited analytics. Our balancing assessment is available on request.</li>
          <li><strong>Legal obligation (Art 6(1)(c))</strong> — to comply with tax, accounting, anti-money-laundering and other statutory duties.</li>
          <li><strong>Consent (Art 6(1)(a) + Art 9(2)(a))</strong> — for biometric footage collected via Nxted Capture, and for non-essential cookies.</li>
        </ul>
      </Section>

      <Section title="5. Special category data — Capture footage">
        <p>
          Egocentric video collected through Nxted Capture is treated as Article 9 UK GDPR <strong>special category data</strong> from the moment of capture. Our lawful basis is the data subject's <strong>explicit consent</strong> (Article 9(2)(a) UK GDPR and section 6 of India's DPDP Act 2023).
        </p>
        <Sub title="Capture consent process">
          <ul>
            <li>Each subject signs a written consent notice in English and their regional language before any filming begins.</li>
            <li>The notice explains the purpose, recipients, retention period, and the right to withdraw consent at any time for future processing.</li>
            <li>A signed Data Protection Impact Assessment (DPIA) under Article 35 UK GDPR is required for every Capture programme.</li>
            <li>Withdrawal of consent halts further processing of the subject's data and triggers deletion within 90 days, except where the data has been irreversibly anonymised or licensed to a Client before withdrawal.</li>
          </ul>
        </Sub>
      </Section>

      <Section title="6. How we use personal data">
        <ul>
          <li>To deliver the Services and onboard you to projects.</li>
          <li>To match Contributors with suitable projects.</li>
          <li>To process payments and meet our tax obligations.</li>
          <li>To detect, investigate and prevent fraud, abuse, and security incidents.</li>
          <li>To respond to data subject requests, legal claims and regulator enquiries.</li>
          <li>To improve our services (anonymised metadata only; we do not train AI models on identifiable personal data).</li>
        </ul>
      </Section>

      <Section title="7. Retention">
        <table>
          <thead><tr><th>Data</th><th>Retention</th></tr></thead>
          <tbody>
            <tr><td>Client account data</td><td>Duration of the contract plus 6 years (UK statutory limitation for contract claims, s.5 Limitation Act 1980)</td></tr>
            <tr><td>Contributor profile</td><td>Duration of engagement plus 24 months; longer if required by Indian tax law (typically 8 years for invoice records)</td></tr>
            <tr><td>Contributor applicants — rejected</td><td>90 days, then deletion</td></tr>
            <tr><td>Raw Capture footage</td><td>Term of the Client licence; deleted within 90 days of expiry unless explicit re-consent is given</td></tr>
            <tr><td>Audit logs</td><td>12 months (security and accountability)</td></tr>
            <tr><td>Anonymised metadata</td><td>Indefinite, no identification possible</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="8. Your rights">
        <p>Under the UK GDPR and EU GDPR you have the right to:</p>
        <ul>
          <li>Access your personal data (Article 15)</li>
          <li>Rectify inaccurate data (Article 16)</li>
          <li>Erase your data where the legal grounds apply (Article 17)</li>
          <li>Restrict processing (Article 18)</li>
          <li>Data portability (Article 20)</li>
          <li>Object to processing, including profiling (Article 21)</li>
          <li>Not be subject to a solely automated decision with legal or similarly significant effect (Article 22) — note our matching engine is decision-support, not solely automated</li>
          <li>Withdraw consent at any time, where consent is the lawful basis (Article 7(3))</li>
        </ul>
        <p>
          Send requests to <a href="mailto:dpo@nxted.ai">dpo@nxted.ai</a>. We respond within one month (extendable to three for complex requests, with notice). We will verify your identity before responding. There is no fee unless the request is manifestly unfounded or excessive.
        </p>
      </Section>

      <Section title="9. International transfers">
        <p>The Services are delivered from the United Kingdom with a contributor network in India. This means we transfer personal data:</p>
        <ul>
          <li>From the UK to India — protected by the UK International Data Transfer Agreement (IDTA) issued under section 119A of the Data Protection Act 2018.</li>
          <li>From the EU to the UK — protected by the European Commission adequacy decision for the UK (28 June 2021, renewed 2025).</li>
          <li>From the EU to India — protected by EU Standard Contractual Clauses (Commission Decision 2021/914) with the UK Addendum where applicable.</li>
          <li>From the UK or EU to the US — only where the recipient is on the EU-US Data Privacy Framework or subject to UK SCCs.</li>
        </ul>
        <p>A copy of the relevant transfer mechanism and our Transfer Risk Assessment is available on request to <a href="mailto:dpo@nxted.ai">dpo@nxted.ai</a>.</p>
      </Section>

      <Section title="10. Security">
        <p>We apply the technical and organisational measures described in our <a href="/legal/security">Security Whitepaper</a>, including encryption at rest (AES-256) and in transit (TLS 1.3), mandatory MFA, role-based access control, network segmentation between application and biometric data stores, and regular penetration testing.</p>
        <p>We notify the ICO of personal data breaches within 72 hours where required by Article 33 UK GDPR, and notify affected data subjects without undue delay where Article 34 applies.</p>
      </Section>

      <Section title="11. Cookies">
        <p>See our <a href="/legal/cookies">Cookie Policy</a> for details and to manage your preferences.</p>
      </Section>

      <Section title="12. Children">
        <p>The Services are not directed at children. Contributors must be at least 18 years old. We do not knowingly collect data of minors; please contact our DPO if you believe we have.</p>
      </Section>

      <Section title="13. Complaints">
        <p>If you have a concern, please contact our DPO first. You also have the right to lodge a complaint with a supervisory authority:</p>
        <ul>
          <li>UK: Information Commissioner's Office (<a href="https://ico.org.uk" target="_blank" rel="noopener">ico.org.uk</a>), Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF.</li>
          <li>EU: your local supervisory authority (list at <a href="https://edpb.europa.eu" target="_blank" rel="noopener">edpb.europa.eu</a>).</li>
          <li>India: the Data Protection Board of India, under the DPDP Act 2023.</li>
        </ul>
      </Section>

      <Section title="14. Changes">
        <p>We may update this policy. Material changes are notified by email at least 14 days before they take effect. The version history is available at the foot of this page on request.</p>
      </Section>
    </LegalShell>
  );
}
