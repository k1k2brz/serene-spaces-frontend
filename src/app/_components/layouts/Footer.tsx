import React from 'react';

export const Footer = () => {
  return (
    <footer className="mt-12 bg-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p>&copy; 2024 Serene Spaces. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">
              개인정보 처리방침
            </a>
            <a href="#" className="hover:text-gray-300">
              이용약관
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
