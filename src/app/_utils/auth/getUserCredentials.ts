import { NextRequest } from 'next/server';

export type UserCredentials = {
  refresh_token: string;
  access_token: string;
  //   expiresIn: number;
  userId: number;
};

// 쿠키에서 토큰을 가져온다.
export const getUserCredentials = (req: NextRequest): UserCredentials | null => {
  const tokens = req.cookies.get('tokens')?.value;

  if (!tokens) return null;

  const credentials = JSON.parse(tokens) as UserCredentials;

  if (!credentials.userId) return null;

  return credentials;
};
