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

    if (response.status === 403) {
      return { message: 'login_failed' };
    }

    const result = await response.json();
    if (response.status === 401 || result.statusCode === 401) {
      return { message: result.message || 'Unauthorized' };
    }
  } catch (error: any) {
    console.error(error);
    return { message: error.message || 'An error occurred during login' };
  }

  return { message: null };
};
