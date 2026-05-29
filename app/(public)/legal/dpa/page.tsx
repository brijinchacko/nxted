import type { Metadata } from 'next';
import { LegalShell, Section, Sub } from '@/components/legal/LegalShell';

export const metadata: Metadata = { title: 'Data Processing Agreement' };

export default function DpaPage() {
  return (
    <LegalShell
      title="Data Processing Agreement"
      intro="This Data Processing Agreement (DPA) sets the Article 28 UK GDPR processor terms that apply when Client uploads personal data into the Services. It is incorporated by reference into the Terms of Service and forms part of the contract between Client and OFORO LTD."
      effectiveDate="28 May 2026"
      currentSlug="dpa"
    >
      <Section title="1. Definitions">
        <p>Capitalised terms have the meaning given in the Terms of Service. In this DPA:</p>
        <ul>
          <li><strong>UK GDPR</strong> means the General Data Protection Regulation as it forms part of UK law by virtue of section 3 of the European Union (Withdrawal) Act 2018.</li>
          <li><strong>EU GDPR</strong> means Regulation (EU) 2016/679.</li>
          <li><strong>Data Protection Laws</strong> means the UK GDPR, EU GDPR, Data Protection Act 2018, PECR 2003, and any other data protection law applicable to the Services.</li>
          <li><strong>Personal Data</strong>, <strong>Processing</strong>, <strong>Controller</strong>, <strong>Processor</strong>, <strong>Data Subject</strong> have the meanings in Article 4 UK GDPR.</li>
        </ul>
      </Section>

      <Section title="2. Roles">
        <p>The parties acknowledge that for personal data Client uploads into the Services in connection with Expert evaluations, Client is the Controller and Nxted is the Processor (or sub-Processor where Client is itself a Processor). For all other personal data (e.g. Client's own administrative account data), Nxted is Controller as set out in the Privacy Policy.</p>
      </Section>

      <Section title="3. Subject-matter, duration, nature and purpose">
        <p>The subject-matter is the provision of AI evaluation Services by Nxted to Client. The duration runs for as long as the Services are provided plus the post-termination retention period in the Terms of Service. The nature is reading, scoring, and reporting on Client's AI outputs. The purpose is to deliver evaluation reports and structured datasets to Client.</p>
      </Section>

      <Section title="4. Categories of Data Subjects and Personal Data">
        <p>The Personal Data and Data Subject categories are set out in Schedule 1 (Client to complete on first upload). Typical categories include individuals named in Client's training prompts or AI outputs, end users of Client's AI system, and Client's internal staff who manage the engagement.</p>
      </Section>

      <Section title="5. Processor obligations (Article 28(3) UK GDPR)">
        <Sub title="5.1 Documented instructions">
          <p>Nxted will Process Personal Data only on the documented instructions of Client, including with regard to international transfers, unless required to do otherwise by law (in which case Nxted will notify Client unless legally prohibited).</p>
        </Sub>
        <Sub title="5.2 Confidentiality">
          <p>Nxted ensures that persons authorised to Process Personal Data are bound by confidentiality obligations or are under appropriate statutory obligation.</p>
        </Sub>
        <Sub title="5.3 Security">
          <p>Nxted implements the technical and organisational measures set out in Schedule 2 (TOMs), in line with Article 32 UK GDPR.</p>
        </Sub>
        <Sub title="5.4 Sub-processors">
          <p>Client provides general written authorisation for Nxted to engage Sub-processors. Nxted maintains the current list in Schedule 3 and gives Client at least 30 days' notice of any intended additions or replacements, during which Client may object. Reasonable objection - for example based on credible security or compliance concerns - may be grounds for Client to terminate the affected Services without penalty.</p>
        </Sub>
        <Sub title="5.5 Assistance with Data Subject rights">
          <p>Taking into account the nature of the Processing, Nxted assists Client by appropriate technical and organisational measures, insofar as possible, for the fulfilment of Client's obligation to respond to Data Subject rights requests.</p>
        </Sub>
        <Sub title="5.6 Assistance with Articles 32-36">
          <p>Nxted assists Client in complying with security, breach notification, DPIAs and prior consultation, taking into account the information available to Nxted.</p>
        </Sub>
        <Sub title="5.7 Deletion or return">
          <p>At Client's choice, Nxted will delete or return all Personal Data after the end of the Services and delete existing copies unless storage is required by law.</p>
        </Sub>
        <Sub title="5.8 Audit">
          <p>Nxted makes available to Client all information necessary to demonstrate compliance with this Article and allows for and contributes to audits, including inspections, conducted by Client or another auditor mandated by Client, no more than once per twelve months unless a breach has occurred, on 30 days' notice, at Client's cost, subject to confidentiality.</p>
        </Sub>
      </Section>

      <Section title="6. Personal data breaches">
        <p>Nxted notifies Client of a Personal Data breach without undue delay and not later than <strong>48 hours</strong> after Nxted becomes aware of it. The notice includes the categories and approximate number of Data Subjects and records concerned, likely consequences, and measures taken or proposed.</p>
      </Section>

      <Section title="7. International transfers">
        <p>For transfers of Personal Data from the UK to a country without an adequacy decision, the parties incorporate by reference the UK International Data Transfer Agreement (IDTA), Module 2 (Controller to Processor). For transfers from the EU, the parties incorporate Module 2 of the European Commission Standard Contractual Clauses (Decision 2021/914) with the UK Addendum where the data is also subject to UK law.</p>
        <p>India is the principal recipient country for our contributor network. A Transfer Risk Assessment is published in the <a href="/legal/privacy">Privacy Policy</a> and available in full on request.</p>
      </Section>

      <Section title="8. Liability">
        <p>The liability provisions of the Terms of Service apply to this DPA, with the following clarification: nothing in the liability cap limits a party's liability for unlawful Processing of Personal Data that results in a fine imposed on the other party under the Data Protection Laws to the extent the fine arises from the first party's own breach.</p>
      </Section>

      <Section title="Schedule 1 - Processing details">
        <p>To be completed by Client at first upload. Default values apply where Client provides none:</p>
        <ul>
          <li>Data Subjects: end users of Client's AI system; individuals named in prompts/outputs.</li>
          <li>Categories of Personal Data: names, identifiers, free-text content potentially containing personal data; no special category data unless agreed in writing.</li>
          <li>Frequency: continuous over the engagement.</li>
          <li>Duration: as the Services.</li>
        </ul>
      </Section>

      <Section title="Schedule 2 - Technical and organisational measures (TOMs)">
        <p>Summary; full detail in the <a href="/legal/security">Security Whitepaper</a>.</p>
        <ul>
          <li><strong>Pseudonymisation and encryption:</strong> AES-256 at rest; TLS 1.3 in transit; per-tenant envelope encryption keys.</li>
          <li><strong>Confidentiality, integrity, availability, resilience:</strong> ISO 27001-aligned ISMS; documented backup and recovery; AWS London region primary.</li>
          <li><strong>Restoration:</strong> RPO 24h, RTO 8h for application data.</li>
          <li><strong>Testing and evaluation:</strong> quarterly external penetration testing; continuous vulnerability scanning.</li>
          <li><strong>Access control:</strong> mandatory MFA, RBAC, least-privilege, segregation between application and biometric data stores, audit logging.</li>
        </ul>
      </Section>

      <Section title="Schedule 3 - Authorised Sub-processors">
        <table>
          <thead><tr><th>Sub-processor</th><th>Purpose</th><th>Location</th></tr></thead>
          <tbody>
            <tr><td>Amazon Web Services EMEA SARL</td><td>Cloud infrastructure (eu-west-2 London)</td><td>UK / EU</td></tr>
            <tr><td>Stripe Payments UK Ltd</td><td>Payments processing</td><td>UK</td></tr>
            <tr><td>Resend, Inc.</td><td>Transactional email</td><td>US (DPF certified)</td></tr>
            <tr><td>OFORO contributor network - India</td><td>Evaluation work - sub-processors for personal data in Client uploads</td><td>India (IDTA / SCCs)</td></tr>
          </tbody>
        </table>
      </Section>
    </LegalShell>
  );
}
