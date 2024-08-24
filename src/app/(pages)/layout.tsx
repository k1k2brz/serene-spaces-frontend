import type { Metadata } from 'next';

import { Footer, Header } from '@/app/_components/layouts';

import { getUserApi } from '../_lib/user';

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
      <header className="bg-serene-500 shadow">
        <Header user={user} />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
