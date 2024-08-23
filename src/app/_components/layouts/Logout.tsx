'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../common/button';
import { HeaderProps } from './Header';

export const LogoutButton = ({ user }: HeaderProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    const logout = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (logout.status === 201) {
      router.refresh();
    }
  };
  return (
    <Button type="button" className="hover:bg-transparant bg-none" onClick={() => handleLogout()}>
      Logout
    </Button>
  );
};
