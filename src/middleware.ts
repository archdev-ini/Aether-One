
import {withAuth} from 'next-auth/middleware';
import {NextResponse} from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const {pathname} = req.nextUrl;

    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/join');

    // If user is trying to access auth pages but is already logged in, redirect them
    if (isAuthPage && token) {
      return NextResponse.redirect(new URL('/profile', req.url));
    }
    
    // If user's profile is not complete, redirect them to the profile setup page,
    // unless they are already on it.
    if (token && !token.isProfileComplete && pathname !== '/profile') {
      return NextResponse.redirect(new URL('/profile', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({token}) => {
        // This makes the middleware apply to all routes.
        // We handle public vs. private logic inside the middleware function.
        return true;
      },
    },
     pages: {
      signIn: '/login',
    }
  }
);

// This specifies which routes the middleware should run on.
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
