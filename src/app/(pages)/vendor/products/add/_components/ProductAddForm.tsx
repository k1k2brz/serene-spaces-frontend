'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Button } from '@/app/_components/common/button';
import { Input } from '@/app/_components/common/input';
import { Label } from '@/app/_components/common/label';
import { ImageUpload } from '@/app/_components/common/uploads/image/ImageUpload';
import { getUserApi } from '@/app/_lib/user';
import { ImageMetadata, User } from '@/app/_types';

import { productsAddApi } from '../_lib/api';
import { productAddSchema } from '../_lib/schema';
import { ProductAddErrors, ProductAddFormData } from '../_lib/types';

type ProductAddData = Omit<ProductAddFormData, 'images'> & { images: ImageMetadata[] };

interface AddProductFormProps {
  user: User;
}

export const AddProductForm = ({ user }: AddProductFormProps) => {
  const [productData, setProductData] = useState<ProductAddData>({
    productName: '',
    description: '',
    price: 0,
    companyName: user.companyName || '',
    images: [],
  });
  const [errors, setErrors] = useState<ProductAddErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // const { data: user, error } = useQuery<User, Object, User, [_1: string, _2: string]>({
  //   queryKey: ['users', userId],
  //   queryFn: getUserApi,
  //   staleTime: 60 * 1000,
  //   gcTime: 300 * 1000,
  // });

  const handleInputChange = (field: keyof ProductAddData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, [field]: e.target.value });
  };

  const handleImageChange: React.Dispatch<React.SetStateAction<ImageMetadata[]>> = (value) => {
    setProductData((prevData) => ({
      ...prevData,
      images: typeof value === 'function' ? value(prevData.images) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ole 추가해야함

    const formData = new FormData();

    formData.append('productName', productData.productName);
    formData.append('description', productData.description);
    formData.append('companyName', productData.companyName);
    formData.append('role', user.role);

    // 백엔드에서 숫자로 처리됨
    formData.append('price', productData.price.toString());

    productData.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image.file);
    });

    // Zod 유효성 검사
    const result = productAddSchema.safeParse(productData);

    if (!result.success) {
      const fieldErrors: ProductAddErrors = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [key, value?.[0]]),
      );
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await productsAddApi(formData);
      console.log(response);

      if (response.code) {
        const newErrors: ProductAddErrors = {};

        // 백엔드에서 반환되는 에러들
        switch (response.code) {
          // 백엔드에서 에러 메세지 추가 안됨
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

        // router.push('/products');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-serene-600">상품등록</h1>
      <form className="w-full max-w-lg space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <Label htmlFor="productName" required>
            상품명
          </Label>
          <Input
            value={productData.productName}
            onChange={handleInputChange('productName')}
            isError={!!errors.productName}
            className="mb-4"
            placeholder="상품명을 입력해주세요."
          />
          {errors.productName && <p className="text-sm text-red-500">{errors.productName}</p>}
        </div>
        <div className="flex flex-col">
          <Label htmlFor="description" required>
            상세정보
          </Label>
          <Input
            value={productData.description}
            onChange={handleInputChange('description')}
            isError={!!errors.description}
            className="mb-4"
            placeholder="상세정보를 입력해주세요."
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
        </div>
        <div className="flex flex-col">
          <Label htmlFor="price" required>
            가격
          </Label>
          <Input
            type="number"
            value={productData.price.toString()}
            onChange={handleInputChange('price')}
            isError={!!errors.price}
            className="mb-4"
            placeholder="가격을 입력해주세요."
          />
          {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
        </div>
        <div className="flex flex-col">
          <Label htmlFor="companyName" required>
            회사명
          </Label>
          <Input
            value={productData.companyName}
            onChange={handleInputChange('companyName')}
            isError={!!errors.companyName}
            className="mb-4"
            placeholder="회사명을 입력해주세요."
          />
          {errors.companyName && <p className="text-sm text-red-500">{errors.companyName}</p>}
        </div>
        <div className="flex flex-col">
          <Label htmlFor="images" required>
            상품 이미지(최대 5개)
          </Label>
          <ImageUpload
            selectedImages={productData.images}
            setSelectedImages={handleImageChange}
            limit={5}
            className="mb-4"
            isError={errors.images}
            variant="l"
          />
        </div>
        <Button type="submit" isLoading={isLoading} className="w-full">
          상품 등록
        </Button>
      </form>
    </div>
  );
};
