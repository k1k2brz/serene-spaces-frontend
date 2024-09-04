import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';

import { getUserCredentials } from '@/app/_utils/auth/getUserCredentials';
import { isValidJWT } from '@/app/_utils/auth/isValidateJWT';

// Token없을 때 못 들어가는 라우터
const protectedRoutes = ['/mypage'];

export default withAuth(
  async function middleware(req) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('params', req.url);
    console.log(requestHeaders);

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

const redirectToLogin = (request: NextRequest) => {
  const response = NextResponse.redirect(new URL('/login', request.url));
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');
  response.cookies.delete('user_id');
  return response;
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const credentials = getUserCredentials(request);

  // Token guard
  if (protectedRoutes.includes(pathname) && (!credentials || !(await isValidJWT(credentials?.refreshToken ?? '')))) {
    request.cookies.delete('access_token');

    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('access_token');

    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Do not run the middleware on the following paths
  matcher: ['/((?!api|.*\\..*|_next/static|_next/image|manifest.json|assets|favicon.ico).*)'],
};
