import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getUserServerApi } from '@/app/_lib/user';
import { User } from '@/app/_types';
import { authOptions } from '@/auth';

import { MypageForm } from './_components/MypageForm';

export default async function UpdateUserPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['user'], queryFn: getUserServerApi });
  const dehydratedState = dehydrate(queryClient);

  const user: User | undefined = queryClient.getQueryData(['user']);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MypageForm user={user} />
    </HydrationBoundary>
  );
}
