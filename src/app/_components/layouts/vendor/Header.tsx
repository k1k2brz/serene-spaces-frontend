'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function VendorHeader() {
  const pathname = usePathname();

  return (
    <div className="border-b border-gray-200 p-4">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/vendor/dashboard"
          className={`mr-4 ${pathname === '/vendor/dashboard' ? 'text-blue-600' : 'text-gray-700'}`}
        >
          대시보드
        </Link>
        <Link
          href="/vendor/order"
          className={`mr-4 ${pathname === '/vendor/order' ? 'text-blue-600' : 'text-gray-700'}`}
        >
          주문목록
        </Link>
        <Link
          href="/vendor/products"
          className={`mr-4 ${pathname === '/vendor/products' ? 'text-blue-600' : 'text-gray-700'}`}
        >
          상품목록
        </Link>
        <Link
          href="/vendor/products/add"
          className={`mr-4 ${pathname === '/vendor/products/add' ? 'text-blue-600' : 'text-gray-700'}`}
        >
          상품등록
        </Link>
      </nav>
    </div>
  );
}
