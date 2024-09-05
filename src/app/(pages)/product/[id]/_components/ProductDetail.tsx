'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CustomImage } from '@/app/_components/common/custom-image';

import type { Product } from '@/app/_types';

export const ProductDetail = () => {
  const router = useRouter();
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/product/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Design */}
      <div className="p-4 lg:hidden">
        <MobileProductDetail product={product} />
      </div>

      {/* Desktop Design */}
      <div className="hidden p-4 lg:block">
        <DesktopProductDetail product={product} />
      </div>
    </div>
  );
};

// Mobile layout for the product detail
const MobileProductDetail = ({ product }: { product: Product }) => (
  <div className="rounded-lg bg-white p-4 shadow-lg">
    <CustomImage src={product.images[0]} alt={product.productName} className="h-64 w-full object-cover" />
    <h1 className="mt-4 text-xl font-bold">{product.productName}</h1>
    <p className="mt-2 text-gray-600">{product.description}</p>
    <div className="mt-4">
      <span className="text-2xl font-bold text-gray-900">{Number(product.price).toLocaleString()}원</span>
      {/* <span className="ml-2 text-sm text-red-500 line-through">{Number(product.originalPrice).toLocaleString()}원</span> */}
    </div>
    <div className="mt-4 flex justify-between">
      <button className="mr-2 w-full rounded-md bg-serene-500 px-4 py-2 text-white">Add to Cart</button>
      <button className="ml-2 w-full rounded-md bg-gray-800 px-4 py-2 text-white">Checkout</button>
    </div>
  </div>
);

// Desktop layout for the product detail
const DesktopProductDetail = ({ product }: { product: Product }) => (
  <div className="grid grid-cols-2 gap-8">
    <div>
      <CustomImage src={product.images[0]} alt={product.productName} className="h-auto w-full rounded-lg shadow-lg" />
    </div>
    <div className="rounded-lg bg-white p-8 shadow-lg">
      <h1 className="text-3xl font-bold">{product.productName}</h1>
      <p className="mt-4 text-gray-600">{product.description}</p>
      <div className="mt-6">
        <span className="text-3xl font-bold text-gray-900">{Number(product.price).toLocaleString()}원</span>
        <span className="ml-2 text-xl text-red-500 line-through">
          {/* {Number(product.originalPrice).toLocaleString()}원 */}
        </span>
      </div>
      <div className="mt-6 flex">
        <button className="mr-4 w-full rounded-md bg-serene-500 px-6 py-3 text-white">Add to Cart</button>
        <button className="w-full rounded-md bg-gray-800 px-6 py-3 text-white">Checkout</button>
      </div>
    </div>
  </div>
);
