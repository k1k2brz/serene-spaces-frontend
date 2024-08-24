'use server';

import { User } from '@/app/_types';
import { cookies } from 'next/headers';

export const getUserApi = async () => {
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

    const result: User = await response.json();
    if (!response.ok) {
      throw new Error('유저의 정보를 받아올 수 없습니다.');
    }

    return result;
  } catch (error: any) {
    console.error(error);
    throw new Error('유저의 정보를 받아올 수 없습니다.');
  }
};
