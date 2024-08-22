import React from 'react';

import { getUserApi } from '@/app/_lib/user';

import { LoginForm } from './_components/LoginForm';

export default async function page() {
  const getUser = await getUserApi();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
}
