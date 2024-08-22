import { NextRequest, NextResponse } from 'next/server';

import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const access_token = req.cookies.get('access_token');

  if (!access_token) {
    return NextResponse.json({ message: 'No access token provided' }, { status: 401 });
  }

  try {
    // 토큰을 검증하고 디코딩된 내용을 얻음
    const decodedToken = jwt.verify(access_token.value, process.env.JWT_SECRET || '');

    return NextResponse.json({ token: access_token, user: decodedToken });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
