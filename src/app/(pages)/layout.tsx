import type { Metadata } from 'next';

import { Footer, Header } from '@/app/_components/layouts';

import { getUserApi } from '../_lib/user';
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
  const user = await getUserApi();

  return (
    <>
      <Header user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
