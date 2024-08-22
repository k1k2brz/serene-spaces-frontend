import { NextRequest } from 'next/server';

export type UserCredentials = {
  refreshToken: string;
  accessToken: string;
  expiresIn: number;
  id: string;
};

// 쿠키에서 토큰을 가져온다.
export const getUserCredentials = (req: NextRequest): UserCredentials | null => {
  //   console.log(req.cookies.get('access_token'));
  let tokens = req.cookies.get('refresh_token')?.value;
  if (!tokens) return null;
  const credentials = JSON.parse(tokens) as UserCredentials;

  if (!credentials.id) return null;

  return credentials;
};
