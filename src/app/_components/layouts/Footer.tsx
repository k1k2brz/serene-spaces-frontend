import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <footer className="mt-12 bg-serene-600 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <p>&copy; 2024 Serene Spaces. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-serene-300">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-serene-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
