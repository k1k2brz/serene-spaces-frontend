'use server';

import { getServerSession } from 'next-auth';

import { QueryFunctionContext } from '@tanstack/react-query';

import { authOptions } from '@/auth';

export const getCartApi = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
  const [_, userId] = queryKey;

  const session = await getServerSession(authOptions);

  if (!session) {
    return { message: '인증 토큰이 존재하지 않습니다.', code: 'AUTH_INVALID' };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      return { message: result.message, code: result.code };
    }

    console.log(result);
    return { ...result, code: null };
  } catch (error: any) {
    console.error(error);
    return { message: '서버에 연결할 수 없습니다. 나중에 다시 시도해 주세요.', code: 'NETWORK_ERROR' };
  }
};

export const deleteCartApi = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
  const [_, id] = queryKey;

  const session = await getServerSession(authOptions);

  if (!session) {
    return { message: '인증 토큰이 존재하지 않습니다.', code: 'AUTH_INVALID' };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      return { message: result.message, code: result.code };
    }

    return result;
  } catch (error: any) {
    console.error(error);
    return { message: '서버에 연결할 수 없습니다. 나중에 다시 시도해 주세요.', code: 'NETWORK_ERROR' };
  }
};
