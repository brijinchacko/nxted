import type { NextAuthConfig } from 'next-auth';
import type { UserRole } from '@prisma/client';

export const authConfig = {
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/login' },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as { role?: UserRole; firstName?: string; lastName?: string };
        if (u.role) token.role = u.role;
        if (u.firstName) token.firstName = u.firstName;
        if (u.lastName) token.lastName = u.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub!;
        session.user.role = (token as { role: UserRole }).role;
        session.user.firstName = (token as { firstName: string }).firstName;
        session.user.lastName = (token as { lastName: string }).lastName;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
