import type { Metadata } from 'next';
import { LegalShell, Section } from '@/components/legal/LegalShell';

export const metadata: Metadata = { title: 'Acceptable Use Policy', description: "The nxted Acceptable Use Policy: permitted and prohibited uses of our AI training-data and evaluation services.", alternates: { canonical: "/legal/aup" } };

export default function AupPage() {
  return (
    <LegalShell
      title="Acceptable Use Policy"
      intro="This policy sets out the use of the Services we will not support. Breach is grounds for immediate suspension and termination."
      effectiveDate="28 May 2026"
      currentSlug="aup"
    >
      <Section title="1. Strictly prohibited content">
        <p>You may not use the Services in connection with content that is, depicts, encourages, or facilitates:</p>
        <ul>
          <li>Child sexual abuse material (CSAM) - Protection of Children Act 1978; Online Safety Act 2023 priority illegal content.</li>
          <li>Terrorism content, including content prepared for terrorist purposes - Terrorism Act 2006.</li>
          <li>Malware, ransomware, exploits, or instructions to circumvent security controls without authority.</li>
          <li>Trade in illegal goods, including controlled drugs (Misuse of Drugs Act 1971) and unlicensed firearms.</li>
          <li>Non-consensual intimate imagery - Sexual Offences Act 2003 s.66B (as amended).</li>
          <li>Defamatory, knowingly false, or harassing content targeting individuals.</li>
        </ul>
      </Section>

      <Section title="2. Prohibited evaluation requests">
        <p>We will not evaluate AI outputs, prompts, or training data designed to:</p>
        <ul>
          <li>Deceive or discriminate against any protected class under the Equality Act 2010 (race, religion, sex, sexual orientation, disability, age, gender reassignment, pregnancy/maternity, marriage and civil partnership).</li>
          <li>Facilitate fraud, market manipulation, election interference, or undermining of democratic processes.</li>
          <li>Generate convincing personalised disinformation about identifiable individuals.</li>
          <li>Produce scientific, medical, or legal disinformation likely to cause harm if relied upon.</li>
        </ul>
      </Section>

      <Section title="3. EU AI Act - prohibited practices (Article 5)">
        <p>The Services may not be used to build or evaluate AI systems that engage in the prohibited practices set out in Article 5 of Regulation (EU) 2024/1689 (the EU AI Act), in force from 2 February 2025:</p>
        <ul>
          <li>Subliminal or manipulative techniques causing significant harm.</li>
          <li>Exploitation of vulnerabilities of specific groups.</li>
          <li>Social scoring by public authorities.</li>
          <li>Predictive policing based on profiling alone.</li>
          <li>Untargeted scraping of facial images to build facial recognition databases.</li>
          <li>Emotion recognition in workplaces and education (with narrow medical/safety exceptions).</li>
          <li>Biometric categorisation by protected characteristics.</li>
          <li>Real-time remote biometric identification in public spaces for law enforcement (with narrow exceptions).</li>
        </ul>
      </Section>

      <Section title="4. Red-team and adversarial work - controlled carve-out">
        <p>Bona-fide red-team and adversarial testing of harmful outputs is permitted, but only under a separate Red-Team Addendum that includes:</p>
        <ul>
          <li>Identification of the customer's safety lead and ethics committee.</li>
          <li>Isolated workspace with stricter access controls.</li>
          <li>Mandatory deletion of adversarial artifacts at engagement end.</li>
          <li>No real-world personal targets without independent ethics approval.</li>
        </ul>
      </Section>

      <Section title="5. Capture-specific prohibitions">
        <ul>
          <li>No filming of minors under 18.</li>
          <li>No filming in sensitive locations (places of worship, hospitals beyond agreed sets, military or government secure sites).</li>
          <li>No facial recognition or gait recognition as the primary purpose of a capture, unless explicitly contracted with documented DPIA.</li>
          <li>Workers must be paid above the relevant local market rate. Modern Slavery Act 2015 commitments apply.</li>
        </ul>
      </Section>

      <Section title="6. System integrity">
        <p>You may not (i) reverse engineer or attempt to derive source code of the Services; (ii) probe, scan, or test the Services for vulnerabilities except under an authorised programme; (iii) overload or interfere with the Services; (iv) attempt to bypass rate limits, authentication, or content controls; or (v) extract, scrape, or harvest contributor profiles, identifiers, or contact data.</p>
      </Section>

      <Section title="7. Enforcement">
        <p>We may, at our discretion: warn you, suspend access, terminate the agreement, withhold Deliverables produced from prohibited use, and refer matters to law enforcement, the ICO, the National Crime Agency, or the relevant CSAM hotline (Internet Watch Foundation in the UK).</p>
        <p>Report suspected abuse to <a href="mailto:abuse@nxted.ai">abuse@nxted.ai</a>. We aim to acknowledge reports within 72 hours.</p>
      </Section>

      <Section title="8. Online Safety Act 2023 - note">
        <p>nxted.ai is a B2B service and not a user-to-user service for the purposes of the Online Safety Act 2023. However we cooperate with Ofcom and other authorities where required and our content controls reflect those obligations as best practice.</p>
      </Section>
    </LegalShell>
  );
}
