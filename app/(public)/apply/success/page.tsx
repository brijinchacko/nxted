import { CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/Button';

export const metadata = { title: 'Application received' };

export default function ApplySuccessPage() {
  return (
    <section className="page-pad min-h-screen">
      <div className="container-narrow max-w-2xl text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--expert-dim)] flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} weight="duotone" style={{ color: 'var(--expert)' }} />
        </div>
        <h1 className="text-h1 mb-5">Application received.</h1>
        <p className="text-body text-[var(--text-secondary)] mb-3 max-w-[52ch] mx-auto">
          We review every application within 3 business days. You'll get an email from <strong className="text-[var(--text-primary)]">hello@nxted.ai</strong> with the outcome — and if approved, your first project recommendations.
        </p>
        <p className="text-sm text-[var(--text-tertiary)] mb-10">
          In the meantime, you can sign in to your contributor portal to complete your profile and see open projects.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button href="/auth/login" variant="expert">Sign in to portal</Button>
          <Button href="/" variant="outline">Back to nxted.ai</Button>
        </div>
      </div>
    </section>
  );
}
