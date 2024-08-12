'use client';

import Link from 'next/link';
import React, { MouseEvent } from 'react';

import { Button } from '@/app/_components/common/button';
import { Input } from '@/app/_components/common/input';
import { Label } from '@/app/_components/common/label';

export const LoginForm = () => {
  const onSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg">
      <h2 className="text-center text-2xl font-bold text-gray-700">로그인</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label>이메일</Label>
          <Input value="" onChange={() => {}} className="mt-1" />
        </div>
        <div>
          <Label>비밀번호</Label>
          <Input type="password" value="" onChange={() => {}} className="mt-1" />
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit" variant="primary" className="w-full">
            로그인
          </Button>
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
