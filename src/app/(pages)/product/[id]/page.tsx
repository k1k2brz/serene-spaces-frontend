import React from 'react';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { Product } from '@/app/_types';

import { ProductDetail } from './_components/ProductDetail';
import { productDetailApi } from './_lib/api';

type ProductPageProps = {
  params: { id: string };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['product', id.toString()], queryFn: productDetailApi });
  const dehydratedState = dehydrate(queryClient);

  const product: Product | undefined = queryClient.getQueryData(['product', id]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductDetail product={product} />
    </HydrationBoundary>
  );
}
