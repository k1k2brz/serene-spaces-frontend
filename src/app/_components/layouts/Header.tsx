import React from 'react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-semibold text-gray-800">Serene Spaces</h1>
          </div>
          <div className="hidden sm:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                홈
              </a>
              <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                제품
              </a>
              <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                소개
              </a>
              <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                문의
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
