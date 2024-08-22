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

  const response = NextResponse.json(tokensResponse, { status: 200 });

  // 받은 토큰을 쿠키에 저장
  response.cookies.set({
    name: 'tokens',
    path: '/',
    value: JSON.stringify(tokensResponse),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  // 토큰 확인
  console.log('TOKEWNS: ', response.headers.get('tokens'));
  console.log(response.headers.get('Set-Cookie'));

  return response;
}
