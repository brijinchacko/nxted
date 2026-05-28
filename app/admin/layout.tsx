import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { NxtedSessionProvider } from '@/components/providers/SessionProvider';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN') redirect('/auth/login');
  return (
    <NxtedSessionProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 min-w-0">
          <header className="border-b border-[var(--border-dim)] bg-[var(--bg-surface)] px-8 py-4 flex items-center justify-between">
            <div className="text-sm text-[var(--text-secondary)]">{session.user.email}</div>
            <div className="text-xs text-[var(--capture)] uppercase tracking-wider">Admin</div>
          </header>
          <main className="p-8">{children}</main>
        </div>
      </div>
    </NxtedSessionProvider>
  );
}
