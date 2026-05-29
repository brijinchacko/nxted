import type { Metadata } from 'next';
import { LegalShell, Section } from '@/components/legal/LegalShell';

export const metadata: Metadata = { title: 'Accessibility Statement' };

export default function AccessibilityPage() {
  return (
    <LegalShell
      title="Accessibility Statement"
      intro="We are committed to making nxted.ai usable by everyone, regardless of ability. This statement explains the standards we work to and how to give us feedback."
      effectiveDate="28 May 2026"
      currentSlug="accessibility"
    >
      <Section title="1. Standards">
        <p>We target conformance with the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA across the marketing site and the authenticated platform. We are working towards WCAG 2.2 Level AA by Q4 2026.</p>
      </Section>

      <Section title="2. What works well">
        <ul>
          <li>Keyboard navigation across all interactive elements.</li>
          <li>Visible focus indicators and skip-to-content links.</li>
          <li>Sufficient colour contrast on body text and UI controls.</li>
          <li>Respect for the <code>prefers-reduced-motion</code> media query - animations are disabled if requested.</li>
          <li>Semantic HTML, landmarks, and ARIA roles where appropriate.</li>
        </ul>
      </Section>

      <Section title="3. Known limitations">
        <p>We honestly note current gaps and our planned fixes:</p>
        <ul>
          <li>Some marketing imagery does not yet have descriptive alt text - being added.</li>
          <li>The evaluation interface keyboard model does not yet meet WCAG 2.4.7 in all states - refactor scheduled.</li>
          <li>Long-form legal pages may benefit from a higher-contrast theme - toggle planned.</li>
        </ul>
      </Section>

      <Section title="4. Legal context">
        <p>UK private companies are not bound by the Public Sector Bodies (Websites and Mobile Applications) Accessibility Regulations 2018. However, the Equality Act 2010 section 20 duty to make reasonable adjustments applies to our Services as a "service" under that Act. For our US clients we voluntarily target conformance with US Section 508 standards and the Americans with Disabilities Act Title III's evolving web accessibility practice.</p>
        <p>The European Accessibility Act (Directive (EU) 2019/882) became enforceable on 28 June 2025. Where we offer the Services to consumers in the EU, we treat them as in scope and apply WCAG 2.1 AA conformance accordingly.</p>
      </Section>

      <Section title="5. Feedback">
        <p>If you have trouble using the Services, please tell us. We aim to acknowledge within 5 business days and provide an interim or final response within 15 business days. Contact: <a href="mailto:accessibility@nxted.ai">accessibility@nxted.ai</a>.</p>
      </Section>
    </LegalShell>
  );
}
