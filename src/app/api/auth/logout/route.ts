import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const userId = cookieStore.get('user_id')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!accessToken || !userId || !refreshToken) {
    return NextResponse.json({ status: 401 });
  }

  cookieStore.set('access_token', '', {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    expires: new Date(0),
  });

  cookieStore.set('refresh_token', '', {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    expires: new Date(0),
  });

  cookieStore.set('user_id', '', {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    expires: new Date(0),
  });

  return NextResponse.json({ message: 'Logged out successfully' }, { status: 201 });
}
