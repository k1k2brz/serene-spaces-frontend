'use server';

import { cookies } from 'next/headers';

export const fetchToken = async (): Promise<string | null> => {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    return null; // Refresh token이 없는 경우
  }

  try {
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/get-token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      cache: 'no-store',
    });

    if (!tokenResponse.ok) {
      console.error('Failed to refresh access token');
      return null;
    }

    const tokenResult = await tokenResponse.json();
    const newAccessToken = tokenResult.access_token;

    // 새로 받은 access token을 쿠키에 저장
    cookieStore.set('access_token', newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};
