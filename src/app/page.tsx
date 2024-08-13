// app/layout.tsx
import { type Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Serene Spaces | 가정용 소품',
  description: '평화로운 공간을 만드는 가정용 소품 쇼핑몰',
};

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Grab Upto 50% Off On Selected Product</h2>
          <button className="rounded-md bg-serene-500 px-4 py-2 text-white hover:bg-serene-600">Buy Now</button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="mt-8 flex flex-wrap items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-wrap space-x-4">
          <button className="rounded-md bg-white px-4 py-2 shadow hover:bg-serene-50">Product Type</button>
          <button className="rounded-md bg-white px-4 py-2 shadow hover:bg-serene-50">Price</button>
          <button className="rounded-md bg-white px-4 py-2 shadow hover:bg-serene-50">Review</button>
          <button className="rounded-md bg-white px-4 py-2 shadow hover:bg-serene-50">Color</button>
          <button className="rounded-md bg-white px-4 py-2 shadow hover:bg-serene-50">Material</button>
          <button className="rounded-md bg-white px-4 py-2 shadow hover:bg-serene-50">Offer</button>
        </div>
        <button className="rounded-md bg-white px-4 py-2 shadow hover:bg-serene-50">All Filters</button>
      </div>

      {/* Products Section */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Example Product Card */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          {/* <img src="product-image-url" alt="Product Name" className="h-48 w-full rounded-md object-cover" /> */}
          <h3 className="mt-4 text-lg font-medium text-gray-900">Product info, product name</h3>
          <p className="mt-1 text-sm text-gray-500">Organic Cotton, Fairtrade certified</p>
          <div className="mt-2">
            <span className="font-semibold text-green-500">★★★★☆</span>
            <span className="ml-2 text-sm text-gray-500">(123)</span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">59.99won</span>
            <button className="rounded-md bg-serene-500 px-3 py-1 text-white hover:bg-serene-600">Add to Cart</button>
          </div>
        </div>
        {/* Repeat similar cards for other products */}
      </div>
    </div>
  );
}
