import { NextRequest, NextResponse } from 'next/server';

import { getUserCredentials } from '@/app/_utils/auth/getUserCredentials';
import { isValidJWT } from '@/app/_utils/auth/isValidateJWT';
import { cookies } from 'next/headers';

const getCookie = async (name: string) => {
  const cookieStore = cookies();
  return cookieStore.get(name)?.value ?? '';
};

export async function GET(req: NextRequest) {
  const tokens = req.cookies.get('tokens')?.value;

  // 쿠키에서 사용자 자격 증명 추출
  console.log('TOKENS:', tokens);

  if (!tokens) {
    console.log('토큰 세팅 대기중');
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const credentials = getUserCredentials(req);
  console.log('CREDENTIALS :: ', credentials);

  if (!credentials || !(await isValidJWT(credentials.access_token))) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = credentials.userId;
  const access_token = credentials.access_token;

  // 사용자 정보를 가져오기 위한 API 요청
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
    credentials: 'include', // 쿠키를 포함하여 요청
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: '유저 데이터를 찾을 수 없습니다.', code: 'USER_NOT_FOUND' },
      { status: response.status },
    );
  }

  const userData = await response.json();

  return NextResponse.json(userData);
}
