import type { Metadata } from 'next';
import { LegalShell, Section } from '@/components/legal/LegalShell';

export const metadata: Metadata = { title: 'Cookie Policy' };

export default function CookiesPage() {
  return (
    <LegalShell
      title="Cookie Policy"
      intro="We use cookies and similar technologies on nxted.ai. This policy explains what they are, what we use them for, and how you control them. We comply with the UK Privacy and Electronic Communications Regulations 2003 (PECR) and the ICO's 2025 guidance on cookie consent."
      effectiveDate="28 May 2026"
      currentSlug="cookies"
    >
      <Section title="1. What is a cookie?">
        <p>A cookie is a small text file a website places on your device. We also use related technologies (web beacons, localStorage, fingerprint protections). Where this policy says "cookie" we mean all of these together.</p>
      </Section>

      <Section title="2. Categories of cookies we use">
        <table>
          <thead><tr><th>Category</th><th>Purpose</th><th>Consent required?</th></tr></thead>
          <tbody>
            <tr><td>Strictly necessary</td><td>Authentication, session persistence, security (CSRF), load balancing</td><td>No - exempted under regulation 6(4) PECR</td></tr>
            <tr><td>Analytics</td><td>Google Analytics 4 with IP anonymisation; aggregate usage statistics</td><td>Yes - your consent</td></tr>
            <tr><td>Marketing</td><td>Currently not used. If we add any, we will update this page and request fresh consent.</td><td>Yes - your consent</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="3. Specific cookies">
        <table>
          <thead><tr><th>Name</th><th>Purpose</th><th>Duration</th><th>First/third party</th></tr></thead>
          <tbody>
            <tr><td><code>__Secure-authjs.session-token</code></td><td>NextAuth session</td><td>30 days</td><td>First</td></tr>
            <tr><td><code>authjs.csrf-token</code></td><td>CSRF protection</td><td>Session</td><td>First</td></tr>
            <tr><td><code>nxted-consent-v1</code></td><td>Stores your cookie consent choices</td><td>12 months</td><td>First</td></tr>
            <tr><td><code>_ga, _ga_*</code></td><td>Google Analytics user/session</td><td>2 years / 24 hours</td><td>Third (Google)</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="4. How we obtain your consent">
        <p>When you first visit nxted.ai, you see a cookie banner. Strictly necessary cookies load immediately because they are essential to the operation of the site. Analytics and marketing cookies do not load until you click <strong>Accept all</strong>. The banner also offers an equally prominent <strong>Essential only</strong> button - per the ICO's 2025 guidance on dark patterns.</p>
      </Section>

      <Section title="5. Changing your preferences">
        <p>You can change your choices at any time:</p>
        <ul>
          <li>Click the cookie icon at the bottom of any page (coming soon - currently you can clear the <code>nxted-consent-v1</code> localStorage entry to reset).</li>
          <li>Use your browser's settings to block or delete cookies - note this may impair authentication.</li>
          <li>For Google Analytics specifically: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics opt-out</a>.</li>
        </ul>
      </Section>

      <Section title="6. International data flows from analytics">
        <p>Google Analytics 4 may transfer aggregated, IP-anonymised data to the United States. We rely on the EU-US Data Privacy Framework (for EU data) and the UK Extension to the DPF (for UK data). See the <a href="/legal/privacy">Privacy Policy</a> for our overall international transfer position.</p>
      </Section>

      <Section title="7. Contact">
        <p>Questions about cookies: <a href="mailto:dpo@nxted.ai">dpo@nxted.ai</a>.</p>
      </Section>
    </LegalShell>
  );
}
