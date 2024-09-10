import { type Metadata } from 'next';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { Mainpage } from '../_components/main/MainPage';
import { getAllProductsApi } from '../_lib/product/getAllProducts';
import { Product } from '../_types';

export const metadata: Metadata = {
  title: 'Serene Spaces | 가정용 소품',
  description: '평화로운 공간을 만드는 가정용 소품 쇼핑몰',
};

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['products'], queryFn: getAllProductsApi });
  const dehydratedState = dehydrate(queryClient);

  const products: Product[] | undefined = queryClient.getQueryData(['products']);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Mainpage products={products} />
    </HydrationBoundary>
  );
}
