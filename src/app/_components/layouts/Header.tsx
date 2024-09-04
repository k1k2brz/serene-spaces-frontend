'use client';

import Link from 'next/link';
import { Session } from 'next-auth';
import React, { useCallback, useRef, useState } from 'react';

import { userRole } from '@/app/_configs';
import { useClickOutside } from '@/app/_hooks';
import { User } from '@/app/_types';

import { LogoutButton } from './Logout';

export interface HeaderProps {
  user: User | undefined;
  session: Session | null;
}

const mypage = '계정관리';
const order = '주문/배송조회';
const wishlist = '보관함';
const saels = '판매목록';
const admin = '관리자페이지';

export const Header = ({ user, session }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef(null);

  const handleOutSideClick = useCallback(() => {
    setIsDropdownOpen(false);
    console.log(ref);
  }, []);
  useClickOutside(ref, handleOutSideClick);

  // 모바일 햄버거 버튼
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <React.Fragment>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-xl font-semibold text-white sm:text-2xl">
              Serene Spaces
            </Link>
            <nav className="hidden space-x-4 md:flex">
              <Link href="#" className="text-white">
                Categories
              </Link>
              <Link href="#" className="text-white">
                Deals
              </Link>
              <Link href="#" className="text-white">
                What`s New
              </Link>
            </nav>
          </div>
          <div className="hidden items-center space-x-4 md:flex">
            <input type="text" placeholder="Search Product" className="rounded-md px-3 py-2" />
            {session ? (
              <div className="relative flex items-center space-x-4">
                <button onClick={toggleDropdown} className="text-white">
                  마이페이지
                </button>
                {isDropdownOpen && (
                  <div
                    className={`absolute right-2 top-full z-10 mt-2 w-full bg-white text-black shadow-lg ${
                      isDropdownOpen ? 'block' : 'hidden'
                    }`}
                    ref={ref}
                  >
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        <Link href="/mypage">{mypage}</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        <Link href="/mypage/orders">{order}</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        <Link href="/mypage/wishlist">{wishlist}</Link>
                      </li>
                      {user && user.role !== userRole.CUSTOMER && (
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <Link href="/vendor/dashboard">{admin}</Link>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                <div className="text-white">
                  <LogoutButton />
                </div>
              </div>
            ) : (
              <div className="group relative flex items-center space-x-4">
                <Link href="/signup" className="text-white">
                  Signup
                </Link>
                <Link href="/login" className="text-white">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center md:hidden">
          {/* 햄버거 메뉴 아이콘 (모바일 전용) */}
          <button onClick={handleMobileMenuToggle} className="text-white">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {/* 모바일 버전 */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <nav className="space-y-4 bg-serene-500 p-4">
            <Link href="#" className="block text-white">
              Categories
            </Link>
            <Link href="#" className="block text-white">
              Deals
            </Link>
            <Link href="#" className="block text-white">
              What`s New
            </Link>
            <Link href="/mypage" className="block text-white">
              마이페이지
            </Link>
            {user ? (
              <ul className="space-y-2">
                <li>
                  <Link href="/mypage">{mypage}</Link>
                </li>
                <li>
                  <Link href="/mypage/orders">{order}</Link>
                </li>
                <li>
                  <Link href="/mypage/wishlist">{wishlist}</Link>
                </li>
                {user.role !== userRole.CUSTOMER && (
                  <li>
                    <Link href="/vendor/dashboard">{admin}</Link>
                  </li>
                )}
                <li>
                  <LogoutButton />
                </li>
              </ul>
            ) : (
              <ul className="space-y-2">
                <li>
                  <Link href="/signup" className="text-white">
                    Signup
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-white">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      )}
    </React.Fragment>
  );
};
