import { NextRequest } from 'next/server';

export type UserCredentials = {
  refreshToken: string;
  accessToken: string;
  //   expiresIn: number;
  userId: number;
};

// 쿠키에서 토큰을 가져온다.
export const getUserCredentials = (req: NextRequest): UserCredentials | null => {
  const accessToken = req.cookies.get('access_token')?.value;
  const refreshToken = req.cookies.get('refresh_token')?.value;
  const userId = req.cookies.get('user_id')?.value;

  if (!accessToken) return null;
  if (!refreshToken) return null;
  if (!userId) return null;

  const credentials: UserCredentials = {
    accessToken,
    refreshToken,
    userId: Number(userId),
  };

  return credentials;
};
