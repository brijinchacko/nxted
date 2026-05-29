import type { Metadata } from 'next';
import { LegalShell, Section, Sub } from '@/components/legal/LegalShell';

export const metadata: Metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      intro="These terms govern your use of nxted.ai, operated by OFORO LTD. By creating an account or using our services you agree to these terms."
      effectiveDate="28 May 2026"
      currentSlug="terms"
    >
      <Section title="1. Parties and definitions">
        <p>
          These Terms of Service form a binding agreement between OFORO LTD, a company registered in England and Wales (Company No. 16787568) with its registered office at Unit 8 Lyon Road, Milton Keynes, England, MK1 1EX ("<strong>Nxted</strong>", "<strong>we</strong>", "<strong>us</strong>"), and the legal entity or natural person identified at sign-up ("<strong>Client</strong>", "<strong>you</strong>").
        </p>
        <p>
          "<strong>Services</strong>" means Nxted Expert (AI evaluation, RLHF, red-teaming, EU AI Act compliance) and Nxted Capture (egocentric video collection and licensing). "<strong>Deliverables</strong>" means the reports, datasets, and outputs we deliver under an Order. "<strong>Client Data</strong>" means data and content uploaded by Client into the Services.
        </p>
      </Section>

      <Section title="2. Account and orders">
        <p>You create an account at <a href="/auth/register">nxted.ai/auth/register</a>. You are responsible for all activity under your account and must protect your credentials.</p>
        <p>Each engagement is formed via (a) an online order placed through the portal (Expert sprints, capture quotes) or (b) a signed statement of work for larger engagements. Orders are accepted when we send a written confirmation.</p>
      </Section>

      <Section title="3. Subscription and fees">
        <Sub title="Subscriptions">
          <p>Retainer products auto-renew monthly. You may cancel renewal at any time by giving us 30 days' written notice; cancellation takes effect at the end of the current billing period. Fees already paid are non-refundable except as set out in section 11 or the Refund Policy.</p>
        </Sub>
        <Sub title="One-off sprints">
          <p>Quick Sprint and similar one-off products are charged in advance via Stripe Checkout. We start work on receipt of cleared funds.</p>
        </Sub>
        <Sub title="Capture quotes">
          <p>Capture engagements are priced per quote. A 50% deposit confirms the engagement; the balance is invoiced on delivery.</p>
        </Sub>
        <Sub title="Taxes">
          <p>Prices exclude VAT and any applicable sales tax. UK VAT (currently 20%) is added to invoices for UK customers. For non-UK B2B customers the reverse-charge mechanism applies where available.</p>
        </Sub>
      </Section>

      <Section title="4. Cancellation and termination">
        <p>Either party may terminate this agreement for material breach not remedied within 30 days of written notice, or immediately for insolvency.</p>
        <p>We may suspend the Services for non-payment, breach of the <a href="/legal/aup">Acceptable Use Policy</a>, or to comply with law.</p>
        <p>On termination, your right to access the Services ends; we will provide a 30-day post-termination period to export Client Data and Deliverables. Surviving clauses: 6, 7, 9, 10, 11, 12, and 13.</p>
      </Section>

      <Section title="5. Client obligations">
        <ul>
          <li>You will use the Services only for lawful purposes and in compliance with the <a href="/legal/aup">Acceptable Use Policy</a>.</li>
          <li>You warrant that AI outputs and other Client Data you upload do not infringe any third party's intellectual property, privacy, or other rights.</li>
          <li>Where Client Data includes personal data, you act as data controller and we act as data processor - the <a href="/legal/dpa">Data Processing Agreement</a> applies and is incorporated by reference.</li>
          <li>You will not attempt to identify, contact, or solicit individual Nxted contributors outside the Services.</li>
        </ul>
      </Section>

      <Section title="6. Intellectual property - inputs and Deliverables">
        <Sub title="Your inputs">
          <p>You retain all right, title and interest in AI outputs, training datasets, and other materials you upload. You grant us a non-exclusive licence to use that material to provide the Services, including disclosure to vetted contributors under confidentiality.</p>
        </Sub>
        <Sub title="Deliverables - written assignment">
          <p>Subject to your full payment of fees due, we assign to you absolutely all of our right, title and interest (including all copyright, database rights, and other intellectual property rights) in the Deliverables. This assignment is made under section 90 of the UK Copyright, Designs and Patents Act 1988 (CDPA 1988).</p>
        </Sub>
        <Sub title="Nxted background IP">
          <p>We retain ownership of our pre-existing technology, evaluation infrastructure, rubric templates, and methodology. We grant you a perpetual, royalty-free licence to use that background IP solely as embodied in the Deliverables.</p>
        </Sub>
      </Section>

      <Section title="7. Model training rights">
        <p>
          We retain a perpetual, worldwide, royalty-free licence to use anonymised metadata derived from your engagement (aggregate quality metrics, taxonomy of errors, contributor performance signals) to improve our internal scoring models and benchmarks. We will <strong>not</strong> use the raw content of your AI outputs, Deliverables, or any identifiable information to train AI models. Clients on the Enterprise tier may opt out of metadata use by written notice.
        </p>
      </Section>

      <Section title="8. Derivative works">
        <p>You may use the Deliverables to train, fine-tune, evaluate, or otherwise improve your own AI models, agents, or systems, including for commercial deployment. We disclaim any claim of authorship or ownership in models or weights trained on the Deliverables.</p>
      </Section>

      <Section title="9. Warranties and disclaimers">
        <p>We will provide the Services with reasonable skill and care, in accordance with industry standards and section 49 of the UK Consumer Rights Act 2015 (where you are a consumer) or the equivalent common-law standard (where you are a business).</p>
        <p>
          <strong>No regulatory guarantee.</strong> Evaluations and reports are advisory and do not by themselves constitute legal advice or a guarantee of conformity with the EU AI Act, Equality Act 2010, or any other law. You remain responsible for your own compliance posture.
        </p>
        <p>To the maximum extent permitted by law, all other warranties (express, implied, statutory) including merchantability and fitness for a particular purpose are excluded.</p>
      </Section>

      <Section title="10. Limitation of liability">
        <p>
          Nothing in these Terms excludes liability for death or personal injury caused by negligence (Unfair Contract Terms Act 1977 s.2(1)), fraud, fraudulent misrepresentation, or any liability that cannot be excluded under English law.
        </p>
        <p>
          Subject to the paragraph above, our aggregate liability under or in connection with these Terms (in contract, tort including negligence, breach of statutory duty, or otherwise) is capped at <strong>the total fees you paid us in the 12 months preceding the event giving rise to the claim</strong>.
        </p>
        <p>
          Neither party is liable for indirect, special, incidental, consequential, or punitive losses, loss of profits, loss of revenue, loss of business, or loss of goodwill, however arising.
        </p>
      </Section>

      <Section title="11. Indemnities">
        <p>
          <strong>By us:</strong> we will defend, indemnify and hold you harmless against any third-party claim that a Deliverable, as delivered by us, infringes that third party's UK or EU intellectual property rights, subject to your prompt notice, sole control of the defence to us, and reasonable cooperation.
        </p>
        <p>
          <strong>By you:</strong> you will defend, indemnify and hold us harmless against any third-party claim arising out of (a) Client Data, (b) your use of the Services in breach of these Terms or the AUP, or (c) any AI system you train or deploy using the Deliverables.
        </p>
      </Section>

      <Section title="12. Confidentiality">
        <p>Each party will protect the other's confidential information with at least the same care it uses for its own, and not less than a reasonable standard of care, for a period of five years after disclosure, except for trade secrets which are protected for as long as they remain secret.</p>
      </Section>

      <Section title="13. Governing law and disputes">
        <p>These Terms are governed by the laws of England and Wales. The parties submit to the exclusive jurisdiction of the courts of England and Wales, save that we may bring proceedings to enforce judgments in any jurisdiction.</p>
        <p>For non-UK Clients, either party may instead refer disputes to arbitration administered by the London Court of International Arbitration (LCIA) under the LCIA Rules, before a single arbitrator, seated in London, in English.</p>
      </Section>

      <Section title="14. Force majeure, assignment, notices">
        <p>
          Neither party is liable for failure or delay caused by events beyond its reasonable control (including epidemic, war, government action, or large-scale infrastructure failure). The affected party must give written notice as soon as practicable.
        </p>
        <p>
          You may not assign this agreement without our consent. We may assign on a change of control or to an affiliate. Notices must be in writing to the email address on the most recent invoice (or to <a href="mailto:legal@nxted.ai">legal@nxted.ai</a> in our case).
        </p>
      </Section>

      <Section title="15. Entire agreement">
        <p>These Terms (with the order or SOW, the AUP, the DPA, and the Privacy Policy) form the entire agreement between the parties and supersede prior agreements on the same subject matter.</p>
      </Section>
    </LegalShell>
  );
}
