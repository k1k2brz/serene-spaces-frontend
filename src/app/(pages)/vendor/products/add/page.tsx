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
    <div className="flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-serene-600">상품등록</h1>
      <HydrationBoundary state={dehydratedState}>
        <AddProductForm user={user as User} />
      </HydrationBoundary>
    </div>
  );
}
