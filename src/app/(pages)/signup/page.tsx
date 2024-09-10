import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth';

import SignupForm from './_components/SignupForm';

export const metadata: Metadata = {
  title: 'Serene Spaces | 회원가입',
  description: '평화로운 공간을 만드는 가정용 소품 쇼핑몰 Serene Spaces 회원가입 페이지',
};

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return <SignupForm />;
}
