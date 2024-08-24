import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ReactQueryProvider } from './_providers/ReactQueryProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Serene Spaces',
  description: 'Serene Spaces Main Page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
