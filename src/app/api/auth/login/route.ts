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

  const tokensResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, options);

  const result = await tokensResponse.json();

  if (!tokensResponse.ok) {
    // 에러 응답 시 에러 메시지와 코드 반환
    return NextResponse.json(
      {
        message: result.message || '로그인 실패',
        code: result.code || 'UNKNOWN_ERROR',
      },
      { status: tokensResponse.status || 401 },
    );
  }

  const tokens = {
    access_token: result.access_token,
    refresh_token: result.refresh_token,
    userId: result.user?.id,
    expiresIn: result.expiresIn,
  };

  const response = NextResponse.json(tokens, { status: 200 });

  return response;
}
