import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Security Headers for all responses
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(self)'
  );

  // Protect Owner routes (except login)
  if (pathname.startsWith('/owner') && pathname !== '/owner/login') {
    const sessionCookie = request.cookies.get('sl_owner_session')?.value;

    if (!sessionCookie) {
      const loginUrl = new URL('/owner/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect Admin routes (except login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const adminSession = request.cookies.get('slcf_session')?.value || request.cookies.get('sl_owner_session')?.value;
    if (!adminSession) {
      const adminUrl = new URL('/admin/login', request.url);
      adminUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(adminUrl);
    }
  }


  // Server-Side Referral Attribution Capture (?ref=CODE or ?referral=CODE)
  const refParam = request.nextUrl.searchParams.get('ref') || request.nextUrl.searchParams.get('referral') || request.nextUrl.searchParams.get('r');
  if (refParam && refParam.trim().length >= 3) {
    const cleanRef = refParam.trim().toUpperCase();
    response.cookies.set({
      name: 'slcf_ref',
      value: cleanRef,
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
  }

  return response;

}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/).*)'
  ]
};
