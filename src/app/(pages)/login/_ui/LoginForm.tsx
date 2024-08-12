'use client';

import Link from 'next/link';
import React from 'react';

export const LoginForm = () => {
  return (
    <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg">
      <h2 className="text-center text-2xl font-bold text-gray-700">로그인</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            이메일
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            로그인
          </button>
        </div>
      </form>
      <div className="text-center">
        <Link className="text-sm text-blue-600 hover:underline" href="/signup">
          회원가입
        </Link>
      </div>
    </div>
  );
};
