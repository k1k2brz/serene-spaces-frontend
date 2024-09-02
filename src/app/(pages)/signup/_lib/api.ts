'use server';

export const signupApi = async (formData: FormData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
      method: 'POST',
      body: formData,
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      return { message: result.message, code: result.code };
    }

    return { message: result.message, code: null };
  } catch (error: any) {
    console.error(error);
    return { message: '서버에 연결할 수 없습니다. 나중에 다시 시도해 주세요.', code: 'NETWORK_ERROR' };
  }
};
