import { redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { VendorHeader } from '@/app/_components/layouts/vendor';
import { userRole } from '@/app/_configs';
import { getUserServerApi } from '@/app/_lib/user';
import { User } from '@/app/_types';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['user'], queryFn: getUserServerApi });
  const dehydratedState = dehydrate(queryClient);

  const user: User | undefined = queryClient.getQueryData(['user']);

  if (user?.role === userRole.CUSTOMER) {
    alert('올바른 접근이 아닙니다.');
    redirect('/');
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <VendorHeader />
      <div>{children}</div>
    </HydrationBoundary>
  );
}
