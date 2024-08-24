'use server';

import { cookies } from 'next/headers';

import cookie from 'cookie';

interface LoginBody {
  email: string;
  password: string;
}

export const loginApi = async (data: LoginBody) => {
  // 유효성 검사를 여기서
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      cache: 'no-store',
      credentials: 'include',
    });

    let setCookie = response.headers.get('Set-Cookie');
    if (setCookie) {
      const parsed: any = cookie.parse(setCookie);

      if (!parsed['tokens']) {
        return {
          message: '로그인 할 수 없습니다. 오류가 반복될 경우 관리자에게 문의해주세요.',
          code: 'TOKEN_NOT_FOUND',
        };
      }

      const tokens = JSON.parse(parsed['tokens']);

      // 브라우저에 쿠키 추가
      cookies().set('access_token', tokens.access_token, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60 * 60,
      });
      cookies().set('refresh_token', tokens.refresh_token, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
      });
      cookies().set('user_id', tokens.userId, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
      });
    }

    const result = await response.json();
    if (!response.ok) {
      return { message: result.message, code: result.code };
    }

    return result;
  } catch (error: any) {
    console.error(error);
    return { message: '서버에 연결할 수 없습니다. 오류가 반복될 경우 관리자에게 문의해주세요.', code: 'NETWORK_ERROR' };
  }
};
