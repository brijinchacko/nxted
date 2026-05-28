import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { authConfig } from '@/lib/auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session?.user;
  const role = session?.user.role;

  const path = nextUrl.pathname;

  const isAuthRoute = path.startsWith('/auth');
  const isPortalRoute = path.startsWith('/portal');
  const isMeRoute = path.startsWith('/me');
  const isAdminRoute = path.startsWith('/admin');

  if (isAuthRoute && isLoggedIn) {
    const dest = role === 'ADMIN' ? '/admin/dashboard' : role === 'CONTRIBUTOR' ? '/me/dashboard' : '/portal/dashboard';
    return NextResponse.redirect(new URL(dest, nextUrl));
  }

  if ((isPortalRoute || isMeRoute || isAdminRoute) && !isLoggedIn) {
    const login = new URL('/auth/login', nextUrl);
    login.searchParams.set('callbackUrl', nextUrl.pathname);
    return NextResponse.redirect(login);
  }

  if (isPortalRoute && role !== 'CLIENT' && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/me/dashboard', nextUrl));
  }
  if (isMeRoute && role !== 'CONTRIBUTOR' && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/portal/dashboard', nextUrl));
  }
  if (isAdminRoute && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/portal/dashboard', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
