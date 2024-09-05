'use client';

import { CustomImage } from '@/app/_components/common/custom-image';

import type { Product } from '@/app/_types';

interface ProductDetailProps {
  product: Product | undefined;
}

const options = ['dummy1', 'dummy2'];
const reviews = [
  {
    user: 'riri@ds.com',
    rating: 4,
    comment: '좋아요.',
  },
];

export const ProductDetail = ({ product }: ProductDetailProps) => {
  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12">
        {/* 이미지 영역 */}
        <div className="flex flex-col justify-center lg:col-span-6">
          <CustomImage
            src={'/' + product.images[0]}
            alt={product.productName}
            className="h-full w-full rounded-lg object-cover shadow-lg"
          />
          <div className="mt-4 flex justify-center space-x-2">
            {product.images.slice(1, 4).map((image, index) => (
              <CustomImage
                key={index}
                src={'/' + image}
                alt={`${product.productName} thumbnail ${index + 1}`}
                className="h-20 w-20 rounded-lg border object-cover"
              />
            ))}
            {product.images.length > 4 && (
              <span className="flex h-20 w-20 items-center justify-center text-gray-500">
                +{product.images.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* 상세 정보 영역 */}
        <div className="rounded-lg bg-white p-4 shadow-lg lg:col-span-6 lg:p-8">
          <h1 className="text-2xl font-bold lg:text-3xl">{product.productName}</h1>
          <div className="mt-4">
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* 가격 정보 */}
          <div className="mt-4 flex flex-col lg:flex-row lg:items-center lg:space-x-4">
            <span className="text-2xl font-bold text-gray-500 line-through">
              {/* {Number(product.orginalPrice).toLocaleString()}원 */}
              {Number(100000).toLocaleString()}원
            </span>
            <span className="text-2xl font-bold text-blue-500 lg:text-3xl">
              {/* {Number(product.discountPrice).toLocaleString()}원 */}
              {Number(100000).toLocaleString()}원
            </span>
          </div>

          {/* 옵션 선택 */}
          <div className="mt-4 flex flex-col lg:flex-row lg:items-center lg:space-x-4">
            {/* <div className="flex space-x-2">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className={`h-8 w-8 rounded-full border ${
                    product.selectedColor === color ? 'border-black' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div> */}

            <div className="mt-4 lg:mt-0">
              <label htmlFor="size" className="mb-1 block text-sm text-gray-600">
                옵션 선택
              </label>
              <select
                id="size"
                className="w-full rounded-md border border-gray-300 p-2 text-gray-600 focus:border-serene-500"
              >
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 장바구니 및 구매 버튼 */}
          <div className="mt-6 flex flex-col lg:flex-row lg:space-x-4">
            <button className="w-full rounded-md bg-serene-500 px-6 py-3 text-white">Add to Cart</button>
            <button className="mt-2 w-full rounded-md bg-gray-800 px-6 py-3 text-white lg:mt-0">Checkout</button>
          </div>
        </div>
      </div>

      {/* 리뷰 섹션 */}
      <div className="mx-auto mt-12 max-w-7xl">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <div className="mt-4 space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="rounded-lg bg-white p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="font-bold">{review.user}</span>
                <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
              </div>
              <p className="mt-2 text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
