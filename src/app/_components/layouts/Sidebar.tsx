import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="flex w-64 flex-col space-y-4 bg-serene-700 p-6 text-white">
      <h2 className="text-2xl font-semibold">Vendor Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <Link href="/dashboard" className="rounded p-2 hover:bg-serene-600">
          Dashboard
        </Link>
        <Link href="/products" className="rounded p-2 hover:bg-serene-600">
          Products
        </Link>
        <Link href="/orders" className="rounded p-2 hover:bg-serene-600">
          Orders
        </Link>
        <Link href="/account" className="rounded p-2 hover:bg-serene-600">
          Account
        </Link>
        <Link href="/reviews" className="rounded p-2 hover:bg-serene-600">
          Reviews
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
