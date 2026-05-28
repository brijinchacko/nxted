import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { NxtedSessionProvider } from '@/components/providers/SessionProvider';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect('/auth/login?callbackUrl=/portal/dashboard');
  return (
    <NxtedSessionProvider>
      <div className="flex min-h-screen">
        <PortalSidebar />
        <div className="flex-1 min-w-0">
          <header className="border-b border-[var(--border-dim)] bg-[var(--bg-surface)] px-8 py-4 flex items-center justify-between">
            <div className="text-sm text-[var(--text-secondary)]">{session.user.email}</div>
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Client portal</div>
          </header>
          <main className="p-8">{children}</main>
        </div>
      </div>
    </NxtedSessionProvider>
  );
}
