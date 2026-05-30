import type { Metadata } from 'next';
import { LegalShell, Section } from '@/components/legal/LegalShell';

export const metadata: Metadata = { title: 'Security Whitepaper' };

export default function SecurityPage() {
  return (
    <LegalShell
      title="Security Whitepaper"
      intro="A summary of how we protect your data. This page is a public summary; deeper technical documentation is available under NDA to enterprise clients on request."
      effectiveDate="28 May 2026"
      currentSlug="security"
    >
      <Section title="1. Governance">
        <p>We operate an Information Security Management System (ISMS) aligned with ISO/IEC 27001:2022. The CEO holds executive accountability; a designated security lead manages day-to-day operations. The Board reviews security posture quarterly.</p>
      </Section>

      <Section title="2. Hosting and architecture">
        <p>Primary hosting is on Amazon Web Services in the London region (<code>eu-west-2</code>). We inherit AWS's SOC 2 Type II and ISO 27001 certifications for the underlying infrastructure. Production is segregated by VPC; biometric data (Capture footage) is stored in a dedicated VPC with separate KMS keys.</p>
      </Section>

      <Section title="3. Encryption">
        <ul>
          <li>At rest: AES-256 with AWS KMS-managed keys. Per-tenant envelope encryption for personal data.</li>
          <li>In transit: TLS 1.3 only. HSTS preloaded.</li>
          <li>Biometric / Capture footage: separate KMS realm, hardware-backed keys.</li>
        </ul>
      </Section>

      <Section title="4. Access control">
        <ul>
          <li>Mandatory MFA on every internal account.</li>
          <li>Role-based access control with least-privilege defaults.</li>
          <li>Just-in-time elevation for production access, with audit log.</li>
          <li>SSO via approved IdPs for enterprise customers on request.</li>
        </ul>
      </Section>

      <Section title="5. Software supply chain">
        <p>We have learned from the wave of supply-chain and data-exfiltration incidents across the AI data industry. Our specific controls:</p>
        <ul>
          <li>All third-party packages pinned by hash (npm <code>integrity</code> attributes; lockfile committed).</li>
          <li>LLM gateway dependencies isolated in a sandboxed egress namespace.</li>
          <li>Dependency provenance scanning (SLSA-style attestations where available).</li>
          <li>No internal production secrets in source repositories; secrets managed by AWS Secrets Manager.</li>
        </ul>
      </Section>

      <Section title="6. Vulnerability management">
        <ul>
          <li>Quarterly external penetration testing by a CREST-accredited provider.</li>
          <li>Continuous SCA, SAST, and DAST scanning in CI.</li>
          <li>CVSS triage SLA: critical 24h, high 7d, medium 30d, low 90d.</li>
          <li>Coordinated disclosure programme: <a href="mailto:security@nxted.ai">security@nxted.ai</a>; PGP key on request.</li>
        </ul>
      </Section>

      <Section title="7. Incident response">
        <p>We maintain a documented incident response plan with role assignments, escalation paths, and customer communication templates. We commit to:</p>
        <ul>
          <li>Internal containment within 4 hours of detection of a confirmed incident.</li>
          <li>Customer notification within <strong>48 hours</strong> of confirming an incident that affects your data.</li>
          <li>ICO notification within 72 hours where required by Article 33 UK GDPR.</li>
          <li>A written post-mortem within 30 days for any customer-affecting incident.</li>
        </ul>
      </Section>

      <Section title="8. Personnel security">
        <ul>
          <li>Background checks for staff within applicable legal limits in the UK and India.</li>
          <li>Mandatory security training at onboarding; refresher annually.</li>
          <li>Contributors complete a security primer before access to any client data.</li>
        </ul>
      </Section>

      <Section title="9. Vendor management">
        <p>Every sub-processor undergoes a security review and DPIA. The list is in our <a href="/legal/dpa">DPA</a>. We require sub-processors to meet at least equivalent technical and organisational measures.</p>
      </Section>

      <Section title="10. Business continuity and disaster recovery">
        <ul>
          <li>Daily encrypted backups to a separate AWS region.</li>
          <li>RPO 24 hours; RTO 8 hours for the application tier.</li>
          <li>Disaster recovery tested at least twice a year.</li>
        </ul>
      </Section>

      <Section title="11. Roadmap">
        <p>SOC 2 Type II report targeted for Q4 2026. ISO/IEC 27001 certification targeted for 2027. Cyber Essentials Plus targeted before first UK public-sector engagement.</p>
      </Section>
    </LegalShell>
  );
}
