'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useState } from 'react';

import { Button } from '@/app/_components/common/button';
import { Input } from '@/app/_components/common/input';
import { Label } from '@/app/_components/common/label';
import { ErrorMessage } from '@/app/_components/common/message';

import { loginApi } from '../_lib/loginApi';
import { LoginSchema } from '../_lib/schema';
import { type LoginErrors } from '../_lib/types';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      email,
      password,
    };

    // Zod 유효성 검사 수행
    const result = LoginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: LoginErrors = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [key, value?.[0]]),
      );

      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginApi(result.data);
      if (response.code) {
        const newErrors: LoginErrors = {};

        switch (response.code) {
          case 'EMAIL_INVALID':
            newErrors.email = response.message;
            break;
          case 'PASSWORD_INVALID':
            newErrors.password = response.message;
            break;
          default:
            alert(response.message);
            break;
        }

        setErrors(newErrors);
      } else {
        console.log(response);
        setErrors({});

        // router.push('/');
      }
    } catch (error) {
      // 네트워크 오류나 기타 예기치 못한 오류 처리
      console.error('로그인 실패:', error);
      alert('로그인 중 오류가 발생했습니다. 네트워크 상태를 확인하고 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg">
      <h2 className="text-center text-2xl font-bold text-gray-700">로그인</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label>이메일</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
          {errors.email && <ErrorMessage message={errors.email} />}
        </div>
        <div>
          <Label>비밀번호</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        </div>
        <div className="flex items-center">
          <Button type="submit" variant="primary" className="mt-4 w-full" isLoading={isLoading}>
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
