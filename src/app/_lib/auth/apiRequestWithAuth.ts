'use server';

import { cookies } from 'next/headers';

import { refreshAccessToken } from './refreshAccessToken';

export const apiRequestWithAuth = async (endpoint: string, options: RequestInit) => {
  const cookieStore = cookies();
  let accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    const token = await refreshAccessToken();
    if (!token) {
      return { message: '토큰이 존재하지 않거나 갱신에 실패했습니다.', code: 'TOKEN_ERROR' };
    }
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      return { message: result.message, code: result.code };
    }

    return result;
  } catch (error) {
    console.error(error);
    return { message: '서버에 연결할 수 없습니다. 나중에 다시 시도해 주세요.', code: 'NETWORK_ERROR' };
  }
};
