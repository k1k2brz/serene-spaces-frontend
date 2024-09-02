import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import SignupForm from './_components/SignupForm';

export const metadata: Metadata = {
  title: 'Serene Spaces | 회원가입',
  description: '평화로운 공간을 만드는 가정용 소품 쇼핑몰 Serene Spaces 회원가입 페이지',
};

export default function page() {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  if (token) {
    redirect('/');
  }

  return <SignupForm />;
}
