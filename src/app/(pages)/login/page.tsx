import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import { LoginForm } from './_components/LoginForm';

export default async function page() {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  if (token) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
}
