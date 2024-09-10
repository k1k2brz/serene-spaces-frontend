'use client';

import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';

import { Button } from '@/app/_components/common/button';
import { Input } from '@/app/_components/common/input';
import { Label } from '@/app/_components/common/label';
import { ImageUpload } from '@/app/_components/common/uploads/image/ImageUpload';
import { userRole } from '@/app/_configs';
import { ImageMetadata, User } from '@/app/_types';

import { updateUserApi } from '../_lib/api';
import { UpdateUserSchema } from '../_lib/schema';
import { UpdateUserErrors } from '../_lib/types';

interface MypageFormProps {
  user: User;
}

export function MypageForm({ user }: MypageFormProps) {
  const [email, setEmail] = useState(user?.email || '');
  const [companyName, setCompanyName] = useState(user?.companyName || '');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [selectedImages, setSelectedImages] = useState<ImageMetadata[]>(() => {
    if (user?.logoUrl) {
      const fileExtension = user.logoUrl.split('.').pop();
      const mockFile = new File([''], `logo.${fileExtension}`, { type: `image/${fileExtension}` });
      return [{ file: mockFile, url: `http://localhost:3000/${user.logoUrl}` }];
    }
    return [];
  });
  const [errors, setErrors] = useState<UpdateUserErrors>({});
  const router = useRouter();

  const onSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('password', password);
    formData.append('role', user.role);
    if (user.role === userRole.VENDOR) {
      formData.append('companyName', companyName);
      formData.append('logo', selectedImages[0]?.file);
    }

    // Zod 유효성 검사 수행
    const result = UpdateUserSchema.safeParse({
      email,
      password,
      rePassword,
      companyName,
    });

    if (!result.success) {
      const fieldErrors: UpdateUserErrors = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [key, value?.[0]]),
      );

      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await updateUserApi(formData);

      if (response.code) {
        const newErrors: UpdateUserErrors = {};

        switch (response.code) {
          case 'EMAIL_ALREADY_EXISTS':
            newErrors.email = response.message;
            break;
          case 'PASSWORD_INVALID':
            newErrors.password = response.message;
            break;
          case 'COMPANY_NAME_INVALID':
            newErrors.companyName = response.message;
            break;
          default:
            alert(response.message);
            break;
        }

        setErrors(newErrors);
      } else {
        setErrors({});

        alert('유저 정보가 성공적으로 변경되었습니다.');
        router.refresh();
      }
    } catch (error) {
      setErrors({});
      console.error('유저 정보 변경 실패:', error);
      alert('유저 정보 변경 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-700">유저 정보 변경</h2>
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
          {user?.role === userRole.VENDOR && (
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
            <Button type="submit" variant="primary" className="w-full">
              정보 변경
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
