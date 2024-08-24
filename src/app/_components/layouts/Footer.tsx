import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-serene-600 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold">About Us</h2>
            <p className="mt-4 text-sm text-serene-200">
              Serene Spaces는 고객의 일상 속에 영감을 주고 휴식을 주는 공간을 만들 수 있도록 도와드립니다. 일상에
              아름다움을 선사하는 엄선된 홈 데코레이션 및 라이프스타일 상품을 제공합니다.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="hover:text-serene-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-serene-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-serene-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-serene-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h2 className="text-lg font-semibold">Newsletter</h2>
            <p className="mt-4 text-sm text-serene-200">
              Subscribe to our newsletter to get the latest updates, promotions, and more.
            </p>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md bg-serene-500 px-4 py-2 text-white placeholder-serene-200 focus:outline-none focus:ring-2 focus:ring-serene-300"
              />
              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-serene-700 px-4 py-2 text-white hover:bg-serene-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between space-y-4 border-t border-serene-500 pt-8 sm:flex-row sm:space-y-0">
          {/* Social Media Links */}
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-serene-300">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {/* Facebook Icon */}
                <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .732.592 1.324 1.325 1.324h11.49v-9.294h-3.118v-3.622h3.118v-2.67c0-3.1 1.893-4.786 4.658-4.786 1.325 0 2.462.099 2.793.143v3.24h-1.917c-1.504 0-1.795.715-1.795 1.764v2.309h3.588l-.467 3.621h-3.121v9.294h6.116c.732 0 1.325-.592 1.325-1.324v-21.351c0-.733-.593-1.325-1.325-1.325z" />
              </svg>
            </Link>
            <Link href="#" className="hover:text-serene-300">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {/* Twitter Icon */}
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.563-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.72 0-4.923 2.203-4.923 4.917 0 .385.043.761.127 1.122-4.09-.205-7.719-2.165-10.148-5.144-.423.729-.666 1.575-.666 2.476 0 1.708.869 3.215 2.188 4.099-.806-.026-1.566-.248-2.228-.616v.062c0 2.385 1.697 4.374 3.95 4.828-.413.112-.849.171-1.296.171-.317 0-.626-.031-.929-.089.627 1.956 2.445 3.379 4.6 3.418-1.685 1.32-3.808 2.105-6.114 2.105-.397 0-.79-.023-1.175-.068 2.179 1.396 4.768 2.211 7.548 2.211 9.056 0 14.01-7.508 14.01-14.009 0-.213-.005-.425-.014-.637.961-.694 1.8-1.562 2.462-2.549z" />
              </svg>
            </Link>
            <Link href="#" className="hover:text-serene-300">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {/* Instagram Icon */}
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.322 3.608 1.296.975.974 1.234 2.241 1.296 3.608.058 1.266.07 1.646.07 4.851 0 3.204-.012 3.584-.07 4.85-.062 1.366-.322 2.633-1.296 3.608-.974.975-2.241 1.234-3.608 1.296-1.266.058-1.646.07-4.85.07-3.204 0-3.584-.012-4.851-.07-1.366-.062-2.633-.322-3.608-1.296-.974-.975-1.234-2.242-1.296-3.608-.058-1.266-.07-1.646-.07-4.85 0-3.204.012-3.584.07-4.851.062-1.366.322-2.633 1.296-3.608.975-.974 2.242-1.234 3.608-1.296 1.266-.058 1.646-.07 4.851-.07m0-2.163c-3.257 0-3.667.013-4.947.072-1.636.074-2.964.338-4.011 1.384-1.047 1.047-1.311 2.375-1.385 4.011-.058 1.28-.071 1.69-.071 4.947s.013 3.667.071 4.947c.074 1.636.338 2.964 1.385 4.011 1.047 1.047 2.375 1.311 4.011 1.385 1.28.058 1.69.071 4.947.071s3.667-.013 4.947-.071c1.636-.074 2.964-.338 4.011-1.385 1.047-1.047 1.311-2.375 1.385-4.011.058-1.28.071-1.69.071-4.947s-.013-3.667-.071-4.947c-.074-1.636-.338-2.964-1.385-4.011-1.047-1.047-2.375-1.311-4.011-1.385-1.28-.058-1.69-.071-4.947-.071z" />
                <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
              </svg>
            </Link>
          </div>
          <p className="text-sm text-serene-200">&copy; 2024 ~ Serene Spaces. All rights reserved.</p>
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
