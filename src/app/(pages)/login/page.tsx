import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import { LoginForm } from './_components/LoginForm';

export const metadata: Metadata = {
  title: 'Serene Spaces | 로그인',
  description: '평화로운 공간을 만드는 가정용 소품 쇼핑몰 Serene Spaces 로그인 페이지',
};

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
