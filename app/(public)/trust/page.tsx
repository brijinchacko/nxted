import { pageMeta } from '@/lib/seo';
import {
  ShieldCheck,
  HandCoins,
  SealCheck,
  Prohibit,
  FileText,
  Scroll,
  HardHat,
  ChartBar,
} from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/motion/FadeUp';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const metadata = pageMeta({
  title: 'Consented, DPDP-Compliant AI Data | nxted.ai',
  description:
    'Every nxted dataset ships with a Data Trust Pack - consent records, provenance, a DPDP & GDPR-aligned DPA, redaction and QA. Data you can safely use.',
  path: '/trust',
  keywords: [
    'consented AI training data',
    'data provenance robotics',
    'DPDP-compliant AI training data',
    'EU AI Act data governance training data',
  ],
});

const PACK = [
  {
    icon: SealCheck,
    title: 'Contributor consent record + location release',
    body: 'DPDP-compliant, explicit and withdrawable. Every contributor and partner location signs a release before any capture.',
  },
  {
    icon: HandCoins,
    title: 'Fair-payment confirmation',
    body: 'Documented proof that contributors were paid above the relevant local market rate.',
  },
  {
    icon: SealCheck,
    title: 'Skill verification + reviewer credentials',
    body: 'Who produced the data, what they are qualified in, and who reviewed it - recorded, not assumed.',
  },
  {
    icon: Prohibit,
    title: 'No-minors policy + redaction',
    body: 'No contributors under 18. PII, faces, plates and screens redacted as standard.',
  },
  {
    icon: FileText,
    title: 'Dataset card + data-provenance log',
    body: 'A dataset card describing scope, splits and limitations, plus a provenance log tracing every clip back to its source.',
  },
  {
    icon: Scroll,
    title: 'DPA template + international-transfer support',
    body: 'A Data Processing Agreement template, with SCCs and the UK IDTA where applicable, so your legal team can move quickly.',
  },
  {
    icon: HardHat,
    title: 'Safety / PPE record for industrial tasks',
    body: 'For electrical, machining and construction capture, a record of the safety and PPE conditions on site.',
  },
  {
    icon: ChartBar,
    title: 'QA report',
    body: 'Inter-annotator agreement, plus success and failure labelling, so you can judge the data before you train on it.',
  },
];

export default function TrustPage() {
  return (
    <section className="page-pad">
      <div className="container-site">
        <div className="max-w-3xl mb-14">
          <div className="text-label mb-5 flex items-center gap-3">
            <ShieldCheck size={18} weight="duotone" style={{ color: 'var(--expert)' }} />
            Trust &amp; Compliance
          </div>
          <h1 className="text-h1">
            Data you can <span className="text-[var(--expert)]">actually use</span>.
          </h1>
          <p className="text-body text-[var(--text-secondary)] mt-6 max-w-[60ch]">
            For UK/EU and regulated buyers, the real question is &ldquo;can we safely use this data?&rdquo; Every nxted dataset ships with a Data Trust Pack that answers it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PACK.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeUp key={item.title} delay={(i % 2) * 0.06}>
                <article className="surface p-7 h-full flex flex-col gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[var(--expert-dim)] flex items-center justify-center">
                    <Icon size={22} weight="duotone" style={{ color: 'var(--expert)' }} />
                  </div>
                  <h2 className="text-h4">{item.title}</h2>
                  <p className="text-sm text-[var(--text-secondary)]">{item.body}</p>
                </article>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp delay={0.2}>
          <div className="surface mt-12 p-8 md:p-10">
            <Badge tone="expert">Process, not paperwork</Badge>
            <p className="text-body text-[var(--text-secondary)] mt-4 max-w-[64ch]">
              The Data Trust Pack describes the real process behind every engagement: signed consent and releases, fair-pay records, redaction, provenance logging, a DPA, on-site safety records, and a QA report. It is the documentation your data, legal and safety teams need to sign off a dataset for production use.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Button href="/portal/capture/new" variant="expert" size="lg">
                Request a Physical AI Test Kit
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Talk to us about compliance
              </Button>
            </div>
          </div>
        </FadeUp>

        <p className="text-xs text-[var(--text-tertiary)] mt-8 max-w-3xl">
          See also our <a href="/legal/dpa" className="text-[var(--expert)] underline">Data Processing Agreement</a>, <a href="/legal/privacy" className="text-[var(--expert)] underline">Privacy Policy</a>, and <a href="/legal/contributor-agreement" className="text-[var(--expert)] underline">Contributor Agreement</a>.
        </p>
      </div>
    </section>
  );
}
