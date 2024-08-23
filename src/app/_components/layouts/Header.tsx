import Link from 'next/link';
import React from 'react';

import { User } from '@/app/_types';
import { Button } from '../common/button';
import { LogoutButton } from './Logout';

export interface HeaderProps {
  user: User | null;
}

export const Header = async ({ user }: HeaderProps) => {
  return (
    <header className="bg-serene-500 shadow">
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
            <ul className="flex items-center space-x-4">
              {user ? (
                <React.Fragment>
                  <li className="text-white">
                    <LogoutButton user={user} />
                  </li>
                  <li className="text-white">
                    <Link href="/mypage">{user.email}</Link>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
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
                </React.Fragment>
              )}
            </ul>
          </div>
          <div className="flex items-center md:hidden">
            {/* 햄버거 메뉴 아이콘 (모바일 전용) */}
            <button className="text-white">
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
      </div>
    </header>
  );
};
