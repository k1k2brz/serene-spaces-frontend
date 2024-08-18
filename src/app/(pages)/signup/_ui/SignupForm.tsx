'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, MouseEvent, useState } from 'react';

import { Button } from '@/app/_components/common/button';
import { Input } from '@/app/_components/common/input';
import { Label } from '@/app/_components/common/label';
import { Select } from '@/app/_components/common/select';
import { roleOptions, userRole } from '@/app/_configs';

import { SignupSchema } from '../_lib/schema';
import { signupApi } from '../_lib/signup';
import { SignupErrors } from '../_lib/types';

type SignupUserRole = (typeof roleOptions)[number]['value'];

const errorMessage = (code: string | null) => {
  if (code === 'EMAIL_ALREADY_EXISTS') {
    return '이미 등록된 이메일입니다.';
  }
  if (code === 'EMAIL_INVALID') {
    return '이메일이 올바르지 않습니다.';
  }
  if (code === 'PASSWORD_INVALID') {
    return '비밀번호가 올바르지 않습니다.';
  }
  if (code === 'COMPANY_NAME_REQUIRED') {
    return 'Vendor 계정에는 회사명이 필수입니다.';
  }
  return '';
};

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState<SignupUserRole>(userRole.CUSTOMER);
  const [errors, setErrors] = useState<SignupErrors>({});
  const router = useRouter();

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as SignupUserRole);
  };

  const onSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      rePassword,
      companyName,
      role,
    };

    // Zod 유효성 검사 수행
    const result = SignupSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: SignupErrors = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [key, value?.[0]]),
      );

      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await signupApi(result.data);

      if (response.code) {
        const message = errorMessage(response.code);
        setErrors((prevErrors) => ({
          // API 반환시 검사되는 값들
          email: response.code === 'EMAIL_ALREADY_EXISTS' ? message : prevErrors.email,
          password: response.code === 'PASSWORD_INVALID' ? message : prevErrors.password,
          companyName: response.code === 'COMPANY_NAME_REQUIRED' ? message : prevErrors.companyName,
        }));
      } else {
        router.push('/login');
      }
    } catch (error) {
      // 네트워크 오류나 기타 예기치 못한 오류 처리
      console.error('회원가입 실패:', error);
      alert('회원가입 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-700">회원가입</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label>이메일</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <Label>비밀번호</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>
          <div>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="mt-1"
            />
            {errors.rePassword && <p className="text-sm text-red-500">{errors.rePassword}</p>}
          </div>
          <Select id={role} label="사용자 선택" options={roleOptions} value={role} onChange={handleRoleChange} />
          {role === userRole.VENDOR && (
            <div>
              <Label>회사 이름</Label>
              <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1" />
              {errors.companyName && <p className="text-sm text-red-500">{errors.companyName}</p>}
            </div>
          )}
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
