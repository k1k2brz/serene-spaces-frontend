import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import SignupForm from './_components/SignupForm';

export default function page() {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  if (token) {
    redirect('/');
  }

  return <SignupForm />;
}
