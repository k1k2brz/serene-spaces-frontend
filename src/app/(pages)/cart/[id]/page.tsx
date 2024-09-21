import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { CartForm } from './_components/CartForm';
import { getCartApi } from './_lib/api';

import type { Cart } from '@/app/_types';

type Props = {
  params: { id: string };
};

export default async function Cart({ params }: Props) {
  const { id } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['cart', id], queryFn: getCartApi });
  const dehydratedState = dehydrate(queryClient);

  const cart: Cart | undefined = queryClient.getQueryData(['cart', id]);

  return (
    <div className="container mx-auto max-w-7xl p-6">
      <HydrationBoundary state={dehydratedState}>
        <CartForm userId={id} cart={cart} />
      </HydrationBoundary>
    </div>
  );
}
