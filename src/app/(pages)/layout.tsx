import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { Footer, Header } from '@/app/_components/layouts';
import { authOptions } from '@/auth';

import { getUserServerApi } from '../_lib/user';
import { User } from '../_types';

export const metadata: Metadata = {
  title: 'Serene Spaces',
  description: 'Serene Spaces Main Page',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['user'], queryFn: getUserServerApi });
  const dehydratedState = dehydrate(queryClient);

  const user: User | undefined = queryClient.getQueryData(['user']);

  return (
    <>
      <header className="bg-serene-500 shadow">
        <HydrationBoundary state={dehydratedState}>
          <Header user={user} session={session} />
        </HydrationBoundary>
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
