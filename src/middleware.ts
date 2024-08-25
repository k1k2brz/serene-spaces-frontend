import { NextResponse, type NextRequest } from 'next/server';

import { getUserCredentials } from '@/app/_utils/auth/getUserCredentials';
import { isValidJWT } from '@/app/_utils/auth/isValidateJWT';

// Token없을 때 못 들어가는 라우터
const protectedRoutes = ['/mypage'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const credentials = getUserCredentials(request);

  // Token guard
  if (protectedRoutes.includes(pathname) && (!credentials || !(await isValidJWT(credentials?.refresh_token ?? '')))) {
    request.cookies.delete('access_token');

    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('access_token');

    return response;
  }

  return NextResponse.next();
}
