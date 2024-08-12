'use client';

import Link from 'next/link';

import { Button } from '@/app/_components/common/button';
import { Input } from '@/app/_components/common/input';
import { Label } from '@/app/_components/common/label';

export default function SignupForm() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-700">회원가입</h2>
        <form className="space-y-4">
          <div>
            <Label>이름</Label>
            <Input value="" onChange={() => {}} className="mt-1" />
          </div>
          <div>
            <Label>이메일</Label>
            <Input type="email" value="" onChange={() => {}} className="mt-1" />
          </div>
          <div>
            <Label>비밀번호</Label>
            <Input type="password" value="" onChange={() => {}} className="mt-1" />
          </div>
          <div>
            <Label>역할 선택</Label>
            <select
              id="role"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            >
              <option value="user">일반 사용자</option>
              <option value="seller">판매자</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" variant="primary" className="w-full">
              회원가입
            </Button>
          </div>
        </form>
        <div className="text-center">
          <Link className="text-sm text-blue-600 hover:underline" href="/login">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
