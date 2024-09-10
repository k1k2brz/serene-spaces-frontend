'use client';

import React from 'react';

import { FilterSection } from './FilterSection';
import { HeroSection } from './HeroSection';
import { ProductCard } from './ProductCard';

import type { Product } from '@/app/_types';

interface MainpageProps {
  products: Product[] | undefined;
}

export const Mainpage = ({ products }: MainpageProps) => {
  const handleBuyNowClick = () => {
    console.log('Buy Now Clicked');
  };

  const handleFilterClick = (filter: string) => {
    console.log('Filter Clicked:', filter);
  };

  const handleAllFiltersClick = () => {
    console.log('All Filters Clicked');
  };

  const handleAddToCart = () => {
    console.log('Add to Cart Clicked');
  };

  console.log(products);

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
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};
