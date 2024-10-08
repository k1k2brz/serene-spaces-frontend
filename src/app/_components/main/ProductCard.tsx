'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { CustomImage } from '../common/custom-image';

import type { Product } from '@/app/_types';

interface ProductCardProps extends Product {
  index: number;
  onAddToCart?: (itemId: number, quantity: number) => void;
}

export const ProductCard = ({
  productName,
  description,
  price,
  averageRating,
  reviews,
  images,
  id,
  index,
  onAddToCart,
}: ProductCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    // 상품 상세 페이지로 이동
    router.push(`/product/${id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleCardClick();
    }
  };

  return (
    <div
      role="button"
      onKeyDown={handleKeyDown}
      className="cursor-pointer rounded-lg bg-white p-6 shadow-lg"
      onClick={handleCardClick}
      tabIndex={index}
    >
      <div className="relative mx-auto">
        <CustomImage className="h-32" src={images[0]} alt={productName} />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{productName}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-2">
        {averageRating && (
          <span className="font-semibold text-green-500">
            {'★'.repeat(Math.round(averageRating))}
            {'☆'.repeat(5 - Math.round(averageRating))}
            {averageRating}
          </span>
        )}
        {/* <span className="ml-2 text-sm text-gray-500">({reviews})</span> */}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900">{Number(price).toLocaleString()}원</span>
        <button
          className="rounded-md bg-serene-500 px-3 py-1 text-white hover:bg-serene-600"
          onClick={(e) => {
            e.stopPropagation();
            if (onAddToCart) onAddToCart(id, 1);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
