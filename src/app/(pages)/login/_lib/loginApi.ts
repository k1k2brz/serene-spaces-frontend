'use server';

interface LoginBody {
  email: string;
  password: string;
}

export const loginApi = async (data: LoginBody) => {
  // 유효성 검사를 여기서
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/login`, {
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

    return result;
  } catch (error: any) {
    console.error(error);
    return { message: '서버에 연결할 수 없습니다. 나중에 다시 시도해 주세요.', code: 'NETWORK_ERROR' };
  }
};
