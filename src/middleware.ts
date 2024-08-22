import { NextResponse, type NextRequest } from 'next/server';

import { getUserCredentials } from '@/app/_utils/auth/getUserCredentials';
import { isValidJWT } from '@/app/_utils/auth/isValidateJWT';

// Token없을 때 못 들어가는 라우터
const protectedRoutes = ['/api/rsc'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const credentials = getUserCredentials(request);

  // Token guard
  if (protectedRoutes.includes(pathname) && (!credentials || !(await isValidJWT(credentials?.refreshToken ?? '')))) {
    request.cookies.delete('user');

    const response = NextResponse.redirect(new URL('/auth', request.url));
    response.cookies.delete('user');

    return response;
  }

  return NextResponse.next();
}
