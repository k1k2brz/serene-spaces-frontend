// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  /**
   * Extends the built-in session/user types with the custom properties
   * accessToken and refreshToken are added to the User type
   */
  interface User {
    accessToken: string;
    userId: number;
    expires: string;
  }

  /**
   * Extends the built-in Session type with accessToken and refreshToken
   */
  interface Session {
    accessToken: string;
    userId: number;
    expires: string;
  }
}

declare module 'next-auth/jwt' {
  /** Extends the built-in JWT type with accessToken and refreshToken */
  interface JWT {
    accessToken: string;
    userId: number;
    expires: string;
  }
}
