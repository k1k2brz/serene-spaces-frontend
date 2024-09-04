import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const refresh_token = req.cookies.get('refresh_token');

  if (!refresh_token) {
    return NextResponse.json({ message: 'No refresh token provided' }, { status: 401 });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token }),
  });

  if (res.status !== 200) {
    return NextResponse.json({ message: '리프레시 토큰 전송 실패' }, { status: 403 });
  }

  const data = await res.json();
  const { access_token, refresh_token: new_refresh_token, expiresIn } = data;

  const response = NextResponse.json({ message: '리프레시 토큰 받기 완료.' });

  response.cookies.set({
    name: 'tokens',
    path: '/',
    value: JSON.stringify({ access_token, refresh_token, expiresIn }),
  });

  return response;
}
