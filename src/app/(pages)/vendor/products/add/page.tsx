import { redirect } from 'next/navigation';
import React from 'react';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getUserServerApi } from '@/app/_lib/user';
import { User } from '@/app/_types';

import { AddProductForm } from './_components/ProductAddForm';

export default async function ProductAddPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['user'], queryFn: getUserServerApi });
  const dehydratedState = dehydrate(queryClient);

  const user: User | undefined = queryClient.getQueryData(['user']);

  if (!user?.role) {
    redirect('/');
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <AddProductForm user={user as User} />
    </HydrationBoundary>
  );
}
