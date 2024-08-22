import React from 'react';

import { getUserApi } from '@/app/_lib/user';

import { LoginForm } from './_components/LoginForm';
import { cookies } from 'next/headers';

export default async function page() {
  const cookieStore = cookies();
  const tokens = cookieStore.get('tokens')?.value;

  if (!tokens) {
    console.log('token이 없음');
  }

  console.log((tokens as any)?.['userId']);

  // const getUser = await getUserApi(tokens);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
}
