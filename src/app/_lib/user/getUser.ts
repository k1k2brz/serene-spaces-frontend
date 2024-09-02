'use server';

import { QueryFunction } from '@tanstack/react-query';

import { User } from '@/app/_types';

export const getUserApi: QueryFunction<User, [_1: string, _2: number, token: string]> = async ({ queryKey }) => {
  const [_1, userId, accessToken] = queryKey;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
      method: 'GET',
      next: {
        tags: ['user', userId.toString()],
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
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
