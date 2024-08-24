'use server';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const tokensResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, options).then((res) =>
    res.json(),
  );

  if ('error' in tokensResponse) {
    return Response.json(tokensResponse);
  }

  // 필요한 정보만 추출
  const tokens = {
    access_token: tokensResponse.access_token,
    refresh_token: tokensResponse.refresh_token,
    userId: tokensResponse.user?.id,
  };

  const response = NextResponse.json(tokens, { status: 200 });

  // 받은 토큰을 쿠키에 저장
  response.cookies.set({
    name: 'tokens',
    path: '/',
    value: JSON.stringify(tokens),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60,
  });

  return response;
}
