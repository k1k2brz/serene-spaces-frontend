'use server';

import { SignupBody } from './types';

export const signupApi = async (data: SignupBody) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      cache: 'no-store',
    });

    const result = await response.json();
    if (!response.ok) {
      return { message: result.message, code: result.code };
    }
  } catch (error: any) {
    console.error(error);
    return { message: error.message || '회원가입 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.' };
  }

  return { message: null };
};
