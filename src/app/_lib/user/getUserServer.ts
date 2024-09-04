'use server';

import { getServerSession } from 'next-auth';

import { User } from '@/app/_types';
import { authOptions } from '@/auth';

export const getUserServerApi = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${session.userId}`, {
      method: 'GET',
      next: {
        tags: ['user', session.userId.toString()],
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: 'no-store',
    });

    const result: User = await response.json();
    if (!response.ok) {
      throw new Error('유저의 정보를 받아올 수 없습니다.');
    }

    return result;
  } catch (error) {
    console.error(error);
    throw new Error('유저의 정보를 받아올 수 없습니다.');
  }
};
