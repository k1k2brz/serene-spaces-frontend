'use server';

import { cookies } from 'next/headers';

export const refreshAccessToken = async (): Promise<string | null> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
      cache: 'no-store',
    });

    if (tokenResponse.ok) {
      const tokenResult = await tokenResponse.json();
      const newAccessToken = tokenResult.access_token;

      cookieStore.set('access_token', newAccessToken);

      return newAccessToken;
    } else {
      console.error('Failed to refresh access token');
      return null;
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};
