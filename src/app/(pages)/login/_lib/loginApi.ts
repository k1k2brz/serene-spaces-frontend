'use server';

interface LoginBody {
  email: string;
  password: string;
}

export const loginApi = async (data: LoginBody) => {
  // 유효성 검사를 여기서
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
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
    return { message: error.message || 'An error occurred during login' };
  }

  return { message: null };
};
