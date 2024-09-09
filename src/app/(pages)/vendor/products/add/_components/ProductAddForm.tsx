'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { Button } from '@/app/_components/common/button';
import { Input } from '@/app/_components/common/input';
import { Label } from '@/app/_components/common/label';
import { ImageUpload } from '@/app/_components/common/uploads/image/ImageUpload';
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
    options: [''],
  });
  const [errors, setErrors] = useState<ProductAddErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: keyof ProductAddData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, [field]: e.target.value });
  };

  // 이미지 변경 핸들러
  const handleImageChange: React.Dispatch<React.SetStateAction<ImageMetadata[]>> = (value) => {
    setProductData((prevData) => ({
      ...prevData,
      images: typeof value === 'function' ? value(prevData.images) : value,
    }));
  };

  // 옵션 변경 핸들러
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...productData.options];
    newOptions[index] = value;
    setProductData({ ...productData, options: newOptions });
  };

  // 옵션 추가
  const addOption = () => {
    if (productData.options.length >= 10) {
      return;
    }

    setProductData({ ...productData, options: [...productData.options, ''] });
  };

  // 옵션 제거
  const removeOption = (index: number) => {
    if (productData.options.length === 1) {
      return;
    }

    const newOptions = productData.options.filter((_, i) => i !== index);
    setProductData({ ...productData, options: newOptions });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('productName', productData.productName);
    formData.append('description', productData.description);
    formData.append('companyName', productData.companyName);
    formData.append('role', user.role);
    formData.append('price', productData.price.toString()); // 백엔드에서 숫자로 처리됨

    productData.options.forEach((option) => {
      formData.append('options', option);
    });

    productData.images.forEach((image) => {
      formData.append('images', image.file);
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

        switch (response.code) {
          // 백엔드에서 에러 메세지 추가 안됨
          case 'COMPANY_NAME_REQUIRED':
            newErrors.companyName = response.message;
            break;
          case 'AUTH_INVALID':
            alert(response.message);
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
        <Label htmlFor="options" required>
          옵션 추가
        </Label>
        {productData.options.map((option, index) => (
          <div key={index} className="mt-2 flex items-center space-x-2">
            <Input
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="flex-1"
              placeholder={`옵션 ${index + 1}`}
            />
            <Button variant="danger" onClick={() => removeOption(index)}>
              제거
            </Button>
          </div>
        ))}
        <Button onClick={addOption} variant="secondary" className="mt-2">
          옵션 추가
        </Button>
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
  );
};
