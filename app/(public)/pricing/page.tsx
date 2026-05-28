import type { Metadata } from 'next';
import { FadeUp } from '@/components/motion/FadeUp';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EXPERT_PRODUCTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Pricing — Nxted Expert & Nxted Capture',
};

export default function PricingPage() {
  return (
    <section className="pt-[140px] pb-[120px]">
      <div className="container-site">
        <FadeUp className="max-w-3xl mb-16">
          <div className="text-label text-[var(--text-secondary)] mb-4">Pricing</div>
          <h1 className="text-h1">
            Transparent, in <span className="text-[var(--expert)]">GBP / USD / EUR</span>.
          </h1>
          <p className="text-body text-[var(--text-secondary)] mt-6">
            No minimum commitments. No referral gates. Self-serve checkout on Expert sprints, quote-based for Capture.
          </p>
        </FadeUp>

        <div className="mb-16">
          <div className="text-label text-[var(--expert)] mb-6">Nxted Expert</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Free Test Kit</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="text-h2 mb-1">£0</div>
                <p className="text-xs text-[var(--text-muted)] mb-4">20 outputs · 48h delivery</p>
                <Button href="/portal/expert/new?product=TEST_KIT" variant="outline" size="sm" fullWidth>
                  Get test kit
                </Button>
              </CardBody>
            </Card>
            {EXPERT_PRODUCTS.map((p) => (
              <Card key={p.key} accent="expert">
                <CardHeader>
                  <CardTitle>{p.label}</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="text-h2 mb-1">{p.price}</div>
                  <p className="text-xs text-[var(--text-muted)] mb-4">{p.outputs} · {p.turnaround}</p>
                  <Button href={`/portal/expert/new?product=${p.key}`} variant="expert" size="sm" fullWidth>
                    {p.mode === 'payment' ? 'Buy' : 'Start retainer'}
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="text-label text-[var(--capture)] mb-6">Nxted Capture</div>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardTitle>L1 Foundation</CardTitle>
              <CardBody><div className="text-h3 mt-2">from $35 / hr</div></CardBody>
            </Card>
            <Card>
              <CardTitle>L3 Technical</CardTitle>
              <CardBody><div className="text-h3 mt-2">from $80 / hr</div></CardBody>
            </Card>
            <Card>
              <CardTitle>L4 Professional</CardTitle>
              <CardBody><div className="text-h3 mt-2">from $120 / hr</div></CardBody>
            </Card>
          </div>
          <Card>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Need a custom dataset?</CardTitle>
                <CardBody className="mt-2">Quote within 24 hours for any spec, format and volume.</CardBody>
              </div>
              <div className="flex gap-3">
                <Badge tone="capture">RLDS / HDF5 / LeRobot</Badge>
                <Button href="/portal/capture/new" variant="capture">Request a quote</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
