'use server';

import { cookies } from 'next/headers';

interface UserApiProps {
  token: string;
  userId: string;
}

export const getUserServerApi = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const userId = cookieStore.get('user_id')?.value;

  if (!accessToken) {
    return null;
  }
  if (!userId) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        cache: 'no-store',
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error('유저의 정보를 받아올 수 없습니다.');
    }

    return result;
  } catch (error: any) {
    console.error(error);
    return { message: '서버에 연결할 수 없습니다. 나중에 다시 시도해 주세요.', code: 'NETWORK_ERROR' };
  }
};
