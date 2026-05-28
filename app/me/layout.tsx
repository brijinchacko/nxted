import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { ContributorSidebar } from '@/components/layout/ContributorSidebar';
import { NxtedSessionProvider } from '@/components/providers/SessionProvider';

export default async function MeLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect('/auth/login?callbackUrl=/me/dashboard');
  return (
    <NxtedSessionProvider>
      <div className="flex min-h-screen">
        <ContributorSidebar />
        <div className="flex-1 min-w-0">
          <header className="border-b border-[var(--border-dim)] bg-[var(--bg-surface)] px-8 py-4 flex items-center justify-between">
            <div className="text-sm text-[var(--text-secondary)]">{session.user.email}</div>
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Contributor portal</div>
          </header>
          <main className="p-8">{children}</main>
        </div>
      </div>
    </NxtedSessionProvider>
  );
}
