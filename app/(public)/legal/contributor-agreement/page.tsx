import type { Metadata } from 'next';
import { LegalShell, Section, Sub } from '@/components/legal/LegalShell';

export const metadata: Metadata = { title: 'Contributor Agreement' };

export default function ContributorAgreementPage() {
  return (
    <LegalShell
      title="Contributor Agreement"
      intro="This agreement governs your engagement with OFORO LTD as an independent contributor on nxted.ai. By submitting an application you agree to these terms; the agreement becomes binding once we approve your account."
      effectiveDate="28 May 2026"
      currentSlug="contributor-agreement"
    >
      <Section title="1. Engagement and status">
        <p>You provide services to OFORO LTD as an <strong>independent contractor</strong> and not as an employee, worker, partner, or agent. You are responsible for your own taxes, social contributions and any business registrations applicable to you in India. Nothing in this Agreement creates an employment relationship under English, Indian, or any other law.</p>
        <p>We acknowledge that the legal characterisation of platform workers is contested in many jurisdictions. We commit to operating the platform in a way that respects genuine self-direction: you choose which projects to accept, when to work, and how to organise your tasks within the project scope.</p>
      </Section>

      <Section title="2. Project assignments">
        <p>You may apply for any project listed in the marketplace that matches your skills. We may also extend direct offers for specific projects. Each accepted project is governed by a project brief that forms part of this Agreement on acceptance.</p>
        <p>You may decline any project without penalty. You may withdraw from an accepted project on 7 days' notice, save where the project brief requires shorter timelines.</p>
      </Section>

      <Section title="3. Payment">
        <Sub title="3.1 Rate and cadence">
          <p>Project rates are set in GBP in the project brief. Hours worked are submitted weekly via the portal. Payment is made <strong>weekly on Wednesday (Indian Standard Time)</strong> for hours approved in the preceding work-week (Saturday 00:00 IST → Friday 23:59 IST).</p>
        </Sub>
        <Sub title="3.2 Payment rails">
          <p>Default payment is in INR via UPI or NEFT to a bank account in your own legal name. We use Razorpay or an equivalent regulated provider. GBP payouts via Wise are available on request. Stripe Connect is available for contributors outside India.</p>
        </Sub>
        <Sub title="3.3 Taxes">
          <p>You are responsible for declaring foreign income to the Income Tax Department of India and for any applicable GST. Where your annual receipts from us exceed the prevailing GST threshold and you are GST-registered, your invoices may be zero-rated as export of services under section 2(6) of the IGST Act 2017.</p>
        </Sub>
        <Sub title="3.4 Disputes">
          <p>If you dispute a payment, raise it within 30 days of payout. We will respond within 10 business days.</p>
        </Sub>
      </Section>

      <Section title="4. Intellectual property - Expert evaluation work">
        <p>For evaluation, RLHF, red-team, and compliance work, you irrevocably assign to OFORO LTD with full title guarantee all present and future rights, title and interest (including all copyright, database rights, and related rights) in any work product you create under this Agreement. The assignment is effective from creation under section 91 of the Copyright, Designs and Patents Act 1988.</p>
        <p>You waive all moral rights you may have in the work product to the extent permitted by law (CDPA 1988 section 87). To the extent moral rights under section 57 of the Indian Copyright Act 1957 cannot be assigned, you grant OFORO an irrevocable licence not to assert them.</p>
      </Section>

      <Section title="5. Image and likeness release - Capture work">
        <p>If your engagement involves being filmed for Nxted Capture, you grant OFORO a perpetual, worldwide, sublicensable licence to use your image, likeness, voice, and biometric data captured during the engagement to:</p>
        <ul>
          <li>Train, fine-tune, evaluate, and improve artificial intelligence and robotics systems;</li>
          <li>License the footage and derived datasets to OFORO's clients;</li>
          <li>Demonstrate the platform to prospective clients in a way that does not personally identify you without your express further consent.</li>
        </ul>
        <p>You may withdraw consent for <strong>future</strong> processing at any time by writing to <a href="mailto:dpo@nxted.ai">dpo@nxted.ai</a>. Withdrawal will not retroactively invalidate AI models or datasets that have already been trained on or shipped to clients before withdrawal. We will, however, cease further licensing of footage that personally identifies you within 90 days of withdrawal where this is technically possible without breaching client commitments.</p>
        <p>This release operates as your explicit consent under Article 9(2)(a) UK GDPR and section 6 of India's Digital Personal Data Protection Act 2023.</p>
      </Section>

      <Section title="6. Confidentiality">
        <p>You may receive Client data and OFORO confidential information during your engagement. You will keep that information confidential, use it only to perform your duties, and return or destroy it at the end of the engagement.</p>
        <p>Confidentiality does not prevent you from making a protected disclosure under the Public Interest Disclosure Act 1998 (UK) or similar law; see the <a href="/legal/whistleblowing">Whistleblowing Policy</a>.</p>
      </Section>

      <Section title="7. Non-solicitation; no non-compete">
        <p>For 12 months after the end of a project, you will not directly solicit the Client of that project for services materially identical to those you performed through us, where the solicitation arises from the relationship formed via OFORO. We do <strong>not</strong> impose any general non-compete: you remain free to work for any other party or platform, consistent with section 27 of the Indian Contract Act 1872.</p>
      </Section>

      <Section title="8. Health and safety (Capture)">
        <p>For Capture engagements, you must follow the on-site safety protocols in the project brief. OFORO carries appropriate insurance for the filming sessions and will document any incident.</p>
      </Section>

      <Section title="9. Termination">
        <p>Either party may terminate this Agreement on 14 days' written notice, or immediately for material breach. Termination does not affect accrued rights, payments due, or surviving clauses (4, 5, 6, 7, 10, 11).</p>
      </Section>

      <Section title="10. Data protection">
        <p>OFORO is the controller of your personal data under this Agreement. The <a href="/legal/privacy">Privacy Policy</a> sets out how your data is processed, your rights, and how to exercise them. For Capture engagements, the additional consent process in section 5 above applies.</p>
      </Section>

      <Section title="11. Governing law and dispute resolution">
        <p>This Agreement is governed by the laws of England and Wales. For disputes:</p>
        <ul>
          <li>Either party may refer disputes to online mediation through the Centre for Online Resolution of Disputes (CORD) or another recognised Indian ODR provider as a first step.</li>
          <li>Failing settlement, disputes are referred to arbitration in London under the LCIA Rules, in English, before a single arbitrator. You may bring small-value claims (under £5,000) in the district court of your principal residence in India.</li>
        </ul>
      </Section>

      <Section title="12. Whole agreement">
        <p>This Agreement, together with the project brief for each engagement and our Privacy Policy, forms the whole agreement between you and us on the subject matter.</p>
      </Section>

      <Section title="Schedule A - Capture consent notice (summary)">
        <p>If you accept a Capture engagement, you will be asked to sign a separate consent notice in English and your regional language before any filming. The notice will set out the purpose of filming, the recipients of the footage, the retention period, your rights, and how to withdraw consent.</p>
      </Section>
    </LegalShell>
  );
}
