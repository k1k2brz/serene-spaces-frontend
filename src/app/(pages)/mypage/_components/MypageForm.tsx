'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, MouseEvent, useState } from 'react';

import { Button } from '@/app/_components/common/button';
import { Input } from '@/app/_components/common/input';
import { Label } from '@/app/_components/common/label';

import { UpdateUserSchema } from '../_lib/schema';
import { UpdateUserErrors } from '../_lib/types';

export function UpdateUserForm() {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errors, setErrors] = useState<UpdateUserErrors>({});
  const router = useRouter();

  const onSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      email,
      companyName,
    };

    // Zod 유효성 검사 수행
    const result = UpdateUserSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: UpdateUserErrors = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [key, value?.[0]]),
      );

      setErrors(fieldErrors);
      return;
    }

    // try {
    //   const response = await updateUserApi(result.data);

    //   if (response.code) {
    //     const newErrors: UpdateUserErrors = {};

    //     switch (response.code) {
    //       case 'EMAIL_INVALID':
    //         newErrors.email = response.message;
    //         break;
    //       case 'COMPANY_NAME_INVALID':
    //         newErrors.companyName = response.message;
    //         break;
    //       default:
    //         alert(response.message);
    //         break;
    //     }

    //     setErrors(newErrors);
    //   } else {
    //     alert('유저 정보가 성공적으로 변경되었습니다.');
    //     router.push('/profile');
    //   }
    // } catch (error) {
    //   console.error('유저 정보 변경 실패:', error);
    //   alert('유저 정보 변경 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    // }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-700">유저 정보 변경</h2>
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
          <div>
            <Label>회사 이름</Label>
            <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1" />
            {errors.companyName && <p className="text-sm text-red-500">{errors.companyName}</p>}
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" variant="primary" className="w-full">
              정보 변경
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
