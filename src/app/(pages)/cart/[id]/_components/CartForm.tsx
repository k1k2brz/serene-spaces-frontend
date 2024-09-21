'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { CustomImage } from '@/app/_components/common/custom-image';
import { Cart } from '@/app/_types';

import { deleteCartApi } from '../_lib/api';

interface CartFormProps {
  userId: string;
  cart: Cart | undefined;
}

export const CartForm = ({ userId, cart }: CartFormProps) => {
  const router = useRouter();

  const handleRemoveFromCart = async (itemId: number) => {
    // const deleteCart = await deleteCartApi();
    // 필요시 장바구니 데이터를 다시 가져옴
  };

  const handleCheckout = () => {
    router.push('/order');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">장바구니</h1>

      {cart?.items.length === 0 ? (
        <div className="mt-12 flex flex-col items-center">
          <EmptyCartIcon />
          <p className="mt-4 text-xl text-gray-500">장바구니가 비어 있습니다.</p>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {cart?.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <CustomImage src={item.product.images[0]} alt={item.product.productName} className="h-20 w-20" />
                <div className="ml-4">
                  <h2 className="font-bold">{item.product.productName}</h2>
                  <p>수량: {item.quantity}</p>
                </div>
              </div>
              <div>
                <p>{item.price.toLocaleString()} 원</p>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="ml-4 rounded bg-red-500 px-3 py-1 text-white"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <button onClick={handleCheckout} className="rounded bg-blue-500 px-6 py-3 text-white">
          결제하기
        </button>
      </div>
    </div>
  );
};

const EmptyCartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-24 w-24 text-gray-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7m0 0L3 3m4 10l1.4 2m10.2 0a2 2 0 11-3.4 2m-7.4 0a2 2 0 103.4 2m7.4-2L17 13M6 15l-1.4-2"
    />
  </svg>
);

// 더미
// const cart = {
//   items: [
//     {
//       id: 1,
//       product: {
//         id: 1,
//         productName: '더미 상품 1',
//         images: ['https://via.placeholder.com/150'],
//         price: 10000,
//       },
//       quantity: 2,
//       price: 20000,
//     },
//     {
//       id: 2,
//       product: {
//         id: 2,
//         productName: '더미 상품 2',
//         images: ['https://via.placeholder.com/150'],
//         price: 15000,
//       },
//       quantity: 1,
//       price: 15000,
//     },
//   ],
// };
