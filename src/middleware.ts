import { NextResponse, type NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { withAuth } from 'next-auth/middleware';

import { authOptions } from './auth';

// Token없을 때 못 들어가는 라우터
const protectedRoutes = ['/mypage'];

export default withAuth(
  async function middleware(req) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('params', req.url);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  {
    pages: {
      signIn: '/login',
      signOut: '/',
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
);

export async function middleware(request: NextRequest) {
  // const pathname = request.nextUrl.pathname;
  // const session = await getServerSession(authOptions);
  // console.log('Session:', session);
  // if (protectedRoutes.includes(pathname) && !session) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|.*\\..*|_next/static|_next/image|manifest.json|assets|favicon.ico).*)'],
};
