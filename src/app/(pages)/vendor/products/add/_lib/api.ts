'use server';

import { cookies } from 'next/headers';

import { apiRequestWithAuth } from '@/app/_lib/auth';

export const productsAddApi = async (formData: FormData) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return { message: '토큰이 존재하지 않습니다.', code: null };
  }

  try {
    const response = await apiRequestWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/products/create`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });
    return response;

    // const result = await response.json();

    // if (!response.ok) {
    //   return { message: result.message, code: result.code };
    // }

    // return { message: result.message, code: null };
  } catch (error: any) {
    console.error(error);
    return { message: '서버에 연결할 수 없습니다. 나중에 다시 시도해 주세요.', code: 'NETWORK_ERROR' };
  }
};
