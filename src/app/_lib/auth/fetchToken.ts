'use server';

export async function fetchToken(token: string) {
  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-token`, {
    headers: {
      Cookie: token || '',
    },
  });

  if (res.status === 401) {
    // access_token이 없거나 만료된 경우 refresh-token을 통해 재발급 시도
    const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` || '',
      },
      cache: 'no-store',
    });

    if (refreshRes.status === 200) {
      const refreshData = await refreshRes.json();
      return refreshData.access_token;
    } else {
      // 재발급 실패 시 null 반환
      return null;
    }
  }

  const data = await res.json();
  return data.token;
}
