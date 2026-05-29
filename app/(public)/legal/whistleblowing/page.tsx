import type { Metadata } from 'next';
import { LegalShell, Section } from '@/components/legal/LegalShell';

export const metadata: Metadata = { title: 'Whistleblowing Policy' };

export default function WhistleblowingPage() {
  return (
    <LegalShell
      title="Whistleblowing Policy"
      intro="How to raise serious concerns about wrongdoing at OFORO LTD or via our platform, with full protection from retaliation."
      effectiveDate="28 May 2026"
      currentSlug="whistleblowing"
    >
      <Section title="1. Statutory framework">
        <p>This policy reflects the Public Interest Disclosure Act 1998 (PIDA), which amended the Employment Rights Act 1996. A protected disclosure under section 43B ERA 1996 relates to a reasonable belief that one or more of the following has occurred, is occurring, or is likely to occur:</p>
        <ul>
          <li>A criminal offence;</li>
          <li>Breach of a legal obligation;</li>
          <li>Miscarriage of justice;</li>
          <li>Danger to health and safety;</li>
          <li>Damage to the environment; or</li>
          <li>Concealment of any of the above.</li>
        </ul>
      </Section>

      <Section title="2. Who is covered">
        <p>This policy covers all OFORO LTD employees, officers, and engaged contributors (extended by section 43K ERA 1996), including our India-based contributor network. EU-based individuals are additionally covered by Directive (EU) 2019/1937 once we cross the headcount thresholds; we apply the equivalent standards now as a matter of best practice.</p>
      </Section>

      <Section title="3. Channels">
        <ul>
          <li><strong>Internal first:</strong> CEO at <a href="mailto:ceo@nxted.ai">ceo@nxted.ai</a> or the Chair of the Board.</li>
          <li><strong>Confidential third party:</strong> [provider to be appointed] - independent channel with anonymity option.</li>
          <li><strong>Prescribed person:</strong> the ICO, HMRC, or other prescribed regulator under the Public Interest Disclosure (Prescribed Persons) Order 2014, as relevant.</li>
          <li><strong>External disclosure:</strong> permitted in limited circumstances under sections 43G-H ERA 1996.</li>
        </ul>
      </Section>

      <Section title="4. No detriment, no retaliation">
        <p>Detriment against a person who has made a protected disclosure is itself unlawful (section 47B ERA 1996). We commit that no person will suffer dismissal, demotion, withholding of work, or any other adverse treatment for making a protected disclosure in good faith - including disclosures that turn out to be mistaken.</p>
      </Section>

      <Section title="5. Confidentiality and anonymity">
        <p>We protect the identity of a whistleblower to the maximum extent possible. Anonymous disclosures are accepted and investigated. Confidentiality clauses elsewhere in our agreements do not override the right to make a protected disclosure.</p>
      </Section>

      <Section title="6. Investigation">
        <p>We acknowledge receipt within 7 calendar days and provide feedback within 3 months, in line with EU Directive 2019/1937 Article 9. Investigations are led by the CEO or, where the CEO is implicated, the Chair of the Board.</p>
      </Section>

      <Section title="7. Bad-faith disclosures">
        <p>Knowingly false or malicious disclosures are not protected and may be subject to disciplinary action. Good-faith concerns based on reasonable belief are always protected, even if later shown to be incorrect.</p>
      </Section>
    </LegalShell>
  );
}
