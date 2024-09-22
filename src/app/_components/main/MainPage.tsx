'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postAddCartApi } from '@/app/_lib/cart/api';

import { FilterSection } from './FilterSection';
import { HeroSection } from './HeroSection';
import { ProductCard } from './ProductCard';

import type { Product } from '@/app/_types';

interface MainpageProps {
  products: Product[] | undefined;
}

export const Mainpage = ({ products }: MainpageProps) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  // 장바구니에 아이템 추가
  const mutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) => {
      if (!session) {
        throw new Error('인증 토큰이 없습니다.');
      }
      return postAddCartApi(itemId, session.accessToken, quantity);
    },
    onSuccess: (data) => {
      if (data.code === 'CART_ALREADY_PRODUCT') {
        alert(data.message);
      } else {
        alert('상품이 장바구니에 추가되었습니다.');
      }
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('장바구니에 아이템 추가 실패:', error);
    },
  });

  const handleAddToCart = async (itemId: number, selectedQuantity: number) => {
    if (!session) {
      alert('사용자가 로그인하지 않았습니다.');
      return;
    }
    mutation.mutate({ itemId, quantity: selectedQuantity });
  };

  const handleBuyNowClick = () => {
    console.log('바로구매');
  };

  const handleFilterClick = (filter: string) => {
    console.log('필터 :', filter);
  };

  const handleAllFiltersClick = () => {
    console.log('필터 전체');
  };

  const filters = ['Product Type', 'Price', 'Review', 'Color', 'Material', 'Offer'];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <HeroSection
        title="Grab Upto 50% Off On Selected Product"
        buttonText="Buy Now"
        onButtonClick={handleBuyNowClick}
      />
      <FilterSection filters={filters} onFilterClick={handleFilterClick} onAllFiltersClick={handleAllFiltersClick} />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product: Product, index: number) => (
          <ProductCard
            key={index}
            id={product.id}
            productName={product.productName}
            description={product.description}
            price={product.price}
            averageRating={product.averageRating}
            reviews={product.reviews}
            options={product.options}
            companyName={product.companyName}
            images={product.images}
            index={index}
            onAddToCart={() => handleAddToCart(product.id, 1)}
          />
        ))}
      </div>
    </div>
  );
};
