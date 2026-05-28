import type { Metadata } from 'next';
import { FadeUp } from '@/components/motion/FadeUp';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About — OFORO LTD',
};

export default function AboutPage() {
  return (
    <section className="page-pad">
      <div className="container-narrow">
        <div className="text-label mb-5">About</div>
        <h1 className="text-h1 mb-10 max-w-[20ch]">
          We're a UK company with <span className="text-[var(--expert)]">India in our DNA</span>.
        </h1>

        <FadeUp className="text-body text-[var(--text-secondary)] space-y-6 max-w-[64ch]">
          <p>
            Nxted is operated by {COMPANY.name}, a company registered in England and Wales (Company No. {COMPANY.number}) at {COMPANY.address}.
          </p>
          <p className="text-[var(--text-primary)]">
            We exist because the AI industry has a supply problem. The Western model — paying a referral-only crowd in California to do dish-washing for $30/hr — does not scale to the data volumes humanoid robots and frontier text models need.
          </p>
          <p>
            India is the answer. 500 million skilled workers. 1.5 million STEM graduates annually. 500,000 doctors. 300,000 chartered accountants. All English-fluent. All available. And nobody in the AI training data market has been built India-first, UK-registered, and dual-product. We have.
          </p>
          <p className="text-[var(--text-primary)] font-medium pt-4">
            Two products. One mission. Zero compromise.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
