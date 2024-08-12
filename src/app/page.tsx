// app/layout.tsx
import { type Metadata } from 'next';

import { Button } from './_components/common/button';

import './globals.css';

export const metadata: Metadata = {
  title: 'Serene Spaces | 가정용 소품',
  description: '평화로운 공간을 만드는 가정용 소품 쇼핑몰',
};

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Button variant="primary">주문하기</Button>
      <Button variant="secondary">더 알아보기</Button>
      <Button variant="outline">문의하기</Button>
    </div>
  );
}
