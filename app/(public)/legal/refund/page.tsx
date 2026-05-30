import type { Metadata } from 'next';
import { LegalShell, Section } from '@/components/legal/LegalShell';

export const metadata: Metadata = { title: 'Refund & Cancellation Policy', description: "The nxted refund and cancellation policy for expert evaluation sprints, retainers and capture orders.", alternates: { canonical: "/legal/refund" } };

export default function RefundPage() {
  return (
    <LegalShell
      title="Refund & Cancellation Policy"
      intro="When and how we refund. This policy supplements the Terms of Service."
      effectiveDate="28 May 2026"
      currentSlug="refund"
    >
      <Section title="1. B2B engagements (default)">
        <p>Where you contract with us as a business, the order form or statement of work governs refunds. As a general principle:</p>
        <ul>
          <li>One-off sprints (e.g. Quick Sprint £249) are non-refundable once work has started, except where we fail to deliver to the agreed rubric.</li>
          <li>Monthly retainers cancel at the end of the current billing period - already-paid fees for the current period are not refunded.</li>
          <li>Capture engagements: the 50% deposit is refundable until contributor coordination begins; thereafter it is non-refundable.</li>
        </ul>
      </Section>

      <Section title="2. Consumer engagements">
        <p>Where you contract with us as a consumer (rare for our Services), the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 give you a 14-day cooling-off period for distance contracts. If you ask us to begin work within that period, you confirm that you waive the right to cancel once the service is fully performed (regulation 37). You can request a refund proportionate to any unperformed work.</p>
      </Section>

      <Section title="3. Statutory rights preserved">
        <p>Your statutory rights under the Consumer Rights Act 2015 are preserved. In particular, services are provided with reasonable skill and care (section 49) and you may seek repeat performance or a price reduction (sections 55-56) if those rights are breached.</p>
      </Section>

      <Section title="4. How to claim a refund">
        <p>Email <a href="mailto:billing@nxted.ai">billing@nxted.ai</a> with your invoice number and reason. We respond within 5 business days. Approved refunds are issued to the original payment method within 14 days of approval.</p>
      </Section>

      <Section title="5. Disputes">
        <p>If we cannot reach agreement, you may use an alternative dispute resolution provider. UK consumers can use Citizens Advice or the Centre for Effective Dispute Resolution. Nothing in this policy limits your right to bring proceedings in court.</p>
      </Section>
    </LegalShell>
  );
}
