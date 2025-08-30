
import {NextResponse, type NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('aether_user_id')?.value;
  const {pathname} = request.nextUrl;

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/join');

  if (isAuthPage && currentUser) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // Add protection for other routes if needed, for example:
  // if (pathname.startsWith('/dashboard') && !currentUser) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
