import type { Metadata } from 'next';
import { LegalShell, Section } from '@/components/legal/LegalShell';

export const metadata: Metadata = { title: 'Anti-Bribery & Anti-Corruption Policy' };

export default function BriberyPage() {
  return (
    <LegalShell
      title="Anti-Bribery & Anti-Corruption Policy"
      intro="Our zero-tolerance position on bribery and corruption. Aligned with the UK Bribery Act 2010 and the MoJ's six principles of adequate procedures."
      effectiveDate="28 May 2026"
      currentSlug="bribery"
    >
      <Section title="1. Scope">
        <p>This policy applies to all employees, officers, contributors, and any person acting on behalf of OFORO LTD. Breach is grounds for termination and may be referred to law enforcement.</p>
      </Section>

      <Section title="2. The Bribery Act 2010">
        <p>The Act creates four offences relevant to us: section 1 (bribing another); section 2 (being bribed); section 6 (bribing a foreign public official); and section 7 (failure of a commercial organisation to prevent bribery). Section 7 carries strict liability with an "adequate procedures" defence — this policy is part of our defence.</p>
      </Section>

      <Section title="3. Adequate procedures — the six principles">
        <ol>
          <li><strong>Proportionate procedures.</strong> This policy, due diligence, and gift/hospitality registers are sized to our risk profile.</li>
          <li><strong>Top-level commitment.</strong> The Board has approved this policy and reviews it annually.</li>
          <li><strong>Risk assessment.</strong> Our highest-risk areas are payments to Indian intermediaries and payments at filming sites — both subject to enhanced due diligence.</li>
          <li><strong>Due diligence.</strong> We check third parties before payment is made, in particular site owners, agents, and intermediaries.</li>
          <li><strong>Communication and training.</strong> All staff and engaged contributors receive a written briefing on this policy at onboarding.</li>
          <li><strong>Monitoring and review.</strong> The DPO maintains the gift register and reports incidents to the Board.</li>
        </ol>
      </Section>

      <Section title="4. Gifts and hospitality">
        <p>Routine business hospitality and gifts of nominal value are permitted. Anything above <strong>£100 per recipient per year</strong> must be approved in writing and entered in the register. Gifts to public officials, regardless of value, require prior approval.</p>
      </Section>

      <Section title="5. Facilitation payments — strictly prohibited">
        <p>Facilitation payments (small unofficial payments to expedite a routine action) are prohibited, including in jurisdictions where they are culturally common. If a facilitation payment is demanded under threat of personal safety, comply if necessary to ensure safety and report immediately to the DPO.</p>
      </Section>

      <Section title="6. Third parties">
        <p>We do not engage agents on a commission basis where the activity could appear to influence a public decision. Indian payment intermediaries are limited to regulated payment service providers (Razorpay, Stripe, Wise) and intermediaries appearing on the RBI's authorised list.</p>
      </Section>

      <Section title="7. Sanctions and trade controls">
        <p>We screen counterparties against UK Sanctions List (Sanctions and Anti-Money Laundering Act 2018), EU consolidated sanctions, and US OFAC SDN. We do not provide Services to sanctioned persons or for sanctioned end-uses.</p>
      </Section>

      <Section title="8. Reporting">
        <p>Suspected breaches must be reported to <a href="mailto:compliance@nxted.ai">compliance@nxted.ai</a> or via the <a href="/legal/whistleblowing">Whistleblowing Policy</a>. Retaliation against a person who reports in good faith is itself a breach of this policy.</p>
      </Section>
    </LegalShell>
  );
}
