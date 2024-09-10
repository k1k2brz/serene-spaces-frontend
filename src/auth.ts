import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.userId = user.userId;
      }

      return token;
    },
    session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
        session.userId = token.userId;
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 14 * 24 * 60 * 60,
  },
  events: {
    signOut(data) {
      //   console.log('auth.ts events signout', 'session' in data && data.session, 'token' in data && data.token);
      fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      //   if ('session' in data) {
      //     data.session = null;
      //   }
      //   if ('token' in data) {
      //     data.token = null;
      //   }
    },
    session(data) {
      //   console.log('auth.ts events session', 'session' in data && data.session, 'token' in data && data.token);
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        let user;
        try {
          user = await authResponse.json();
        } catch (error) {
          console.error('응답 파싱 실패 : ', error);
          throw new Error('알 수 없는 에러');
        }

        if (!authResponse.ok) {
          return Promise.reject({
            message: '아이디가 일치하지 않거나 비밀번호가 일치하지 않습니다.',
            status: authResponse.status,
          });
        }

        return {
          accessToken: user.access_token,
          refreshToken: user.refresh_token,
          userId: user.user_id,
          ...user,
        };
      },
    }),
  ],
};
