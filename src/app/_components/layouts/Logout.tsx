'use client';

import { signOut } from 'next-auth/react';

import { Button } from '../common/button';

export const LogoutButton = () => {
  return (
    <Button type="button" className="hover:bg-transparant bg-none" onClick={() => signOut()}>
      Logout
    </Button>
  );
};
