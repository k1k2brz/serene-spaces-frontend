'use server';

export const getUserApi = async (tokens: any) => {
    console.log(tokens)
    
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/user/${tokens.userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
      credentials: 'include', // 쿠키를 포함하여 요청
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
