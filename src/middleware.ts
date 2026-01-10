import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect all routes starting with /admin
  if (path.startsWith('/admin')) {
    const authCookie = request.cookies.get('admin_session');

    // Simple check: if cookie doesn't exist or value is wrong, redirect to login
    // In a production app, verify a JWT token or session ID securely
    if (!authCookie || authCookie.value !== process.env.ADMIN_SECRET_TOKEN) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
