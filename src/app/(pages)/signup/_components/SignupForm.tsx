'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

import { Button } from '@/app/_components/common/button';
import { Input } from '@/app/_components/common/input';
import { Label } from '@/app/_components/common/label';
import { Select } from '@/app/_components/common/select';
import { ImageUpload } from '@/app/_components/common/uploads/image/ImageUpload';
import { roleOptions, userRole } from '@/app/_configs';
import { type ImageMetadata } from '@/app/_types';

import { signupApi } from '../_lib/api';
import { SignupSchema } from '../_lib/schema';
import { type SignupErrors } from '../_lib/types';

type SignupUserRole = (typeof roleOptions)[number]['value'];

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedImages, setSelectedImages] = useState<ImageMetadata[]>([]);
  const [role, setRole] = useState<SignupUserRole>(userRole.CUSTOMER);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as SignupUserRole);
  };

  const onSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('rePassword', rePassword);
    formData.append('companyName', companyName);
    formData.append('role', role);
    formData.append('logo', selectedImages[0]?.file || '');

    // Zod 유효성 검사 수행
    const result = SignupSchema.safeParse({
      email,
      password,
      rePassword,
      companyName,
      role,
    });

    if (!result.success) {
      const fieldErrors: SignupErrors = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [key, value?.[0]]),
      );

      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await signupApi(formData);

      if (response.code) {
        const newErrors: SignupErrors = {};

        // 백엔드에서 반환되는 에러들
        switch (response.code) {
          case 'EMAIL_ALREADY_EXISTS':
            newErrors.email = response.message;
            break;
          case 'PASSWORD_INVALID':
            newErrors.password = response.message;
            break;
          case 'COMPANY_NAME_REQUIRED':
            newErrors.companyName = response.message;
            break;
          default:
            alert(response.message);
            break;
        }

        setErrors(newErrors);
      } else {
        setErrors({});

        router.push('/login');
        alert('회원가입이 완료되었습니다.');
      }
    } catch (error) {
      // 네트워크 오류나 기타 예기치 못한 오류 처리
      console.error('회원가입 실패:', error);
      alert('회원가입 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (role === userRole.CUSTOMER) {
      setCompanyName('');
      setSelectedImages([]);
    }
  }, [role]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-700">회원가입</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label required>이메일</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <Label required>비밀번호</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>
          <div>
            <Label required>비밀번호 확인</Label>
            <Input
              type="password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="mt-1"
            />
            {errors.rePassword && <p className="text-sm text-red-500">{errors.rePassword}</p>}
          </div>
          <div>
            <Label required>사용자 선택</Label>
            <Select id={role} options={roleOptions} value={role} onChange={handleRoleChange} />
          </div>
          {role === userRole.VENDOR && (
            <>
              <div>
                <Label required>회사 이름</Label>
                <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1" />
                {errors.companyName && <p className="text-sm text-red-500">{errors.companyName}</p>}
              </div>
              <div>
                <Label>회사 로고</Label>
                <ImageUpload
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                  limit={1}
                  capacity={4}
                />
              </div>
            </>
          )}
          <div className="flex items-center justify-between">
            <Button isLoading={isLoading} type="submit" variant="primary" className="w-full">
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
