import type { Metadata } from 'next';
import { LegalShell, Section } from '@/components/legal/LegalShell';

export const metadata: Metadata = { title: 'DMCA Copyright Policy' };

export default function DmcaPage() {
  return (
    <LegalShell
      title="DMCA Copyright Policy"
      intro="How copyright holders can report infringing material on nxted.ai. We respect the rights of copyright holders and respond to compliant notices."
      effectiveDate="28 May 2026"
      currentSlug="dmca"
    >
      <Section title="1. Designated agent">
        <p>Our designated agent for receiving notices of claimed infringement under 17 U.S.C. § 512(c)(2) is:</p>
        <p>
          <strong>DMCA Agent — OFORO LTD</strong><br />
          Unit 8 Lyon Road, Milton Keynes, England, MK1 1EX, United Kingdom<br />
          Email: <a href="mailto:dmca@nxted.ai">dmca@nxted.ai</a>
        </p>
        <p>(Registration with the US Copyright Office: pending. Until registration is complete, notices may be sent to the address above and will be processed on the same basis.)</p>
      </Section>

      <Section title="2. Notice requirements">
        <p>Your notice must include all of the following, per § 512(c)(3)(A):</p>
        <ol>
          <li>A physical or electronic signature of a person authorised to act on behalf of the owner of the exclusive right alleged to be infringed.</li>
          <li>Identification of the copyrighted work claimed to have been infringed.</li>
          <li>Identification of the material claimed to be infringing, with information reasonably sufficient to locate the material on our Services.</li>
          <li>Contact information: your address, telephone number, and email.</li>
          <li>A statement that you have a good-faith belief that the use is not authorised by the copyright owner, its agent, or the law.</li>
          <li>A statement, under penalty of perjury, that the information in your notice is accurate and that you are authorised to act on behalf of the owner.</li>
        </ol>
      </Section>

      <Section title="3. Counter-notice">
        <p>If you believe your material was removed by mistake or misidentification, you may submit a counter-notice under § 512(g) including:</p>
        <ol>
          <li>Your signature.</li>
          <li>Identification of the material removed and where it appeared.</li>
          <li>A statement under penalty of perjury that you have a good-faith belief the material was removed by mistake.</li>
          <li>Your name, address, telephone, and consent to jurisdiction of the federal court for the judicial district in which your address is located.</li>
        </ol>
      </Section>

      <Section title="4. Repeat infringer policy">
        <p>We terminate, in appropriate circumstances, the accounts of subscribers and account holders who are repeat infringers, in accordance with § 512(i).</p>
      </Section>

      <Section title="5. UK position">
        <p>For copyright claims under UK law, please contact <a href="mailto:legal@nxted.ai">legal@nxted.ai</a>. We comply with our obligations under the Copyright, Designs and Patents Act 1988 and the e-Commerce Regulations 2002 hosting defence.</p>
      </Section>
    </LegalShell>
  );
}
