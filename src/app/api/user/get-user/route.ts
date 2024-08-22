import { NextRequest, NextResponse } from 'next/server';

import { getUserCredentials } from '@/app/_utils/auth/getUserCredentials';
import { isValidJWT } from '@/app/_utils/auth/isValidateJWT';

export async function GET(req: NextRequest) {
  // 쿠키에서 사용자 자격 증명 추출
  console.log(req.cookies.get('tokens')?.value);
  const credentials = getUserCredentials(req);

  if (!credentials || !(await isValidJWT(credentials.accessToken))) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = credentials.id;

  // 사용자 정보를 가져오기 위한 API 요청
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user`, {
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
