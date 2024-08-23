import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { getUserCredentials } from '@/app/_utils/auth/getUserCredentials';
import { isValidJWT } from '@/app/_utils/auth/isValidateJWT';

const getCookie = async (name: string) => {
  const cookieStore = cookies();
  return cookieStore.get(name)?.value ?? '';
};

export async function GET(req: NextRequest) {
  const tokens = req.cookies.get('access_token')?.value;

  if (!tokens) {
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
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
