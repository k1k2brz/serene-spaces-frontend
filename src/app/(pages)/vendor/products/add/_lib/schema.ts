import { z } from 'zod';

// 이미지 메타데이터 타입
export const imageMetadataSchema = z.object({
  url: z.string().url('유효한 이미지 URL이 아닙니다.'),
  file: z.any(),
});

// 제품 등록 폼의 유효성 검사
export const productAddSchema = z.object({
  productName: z.string().min(1, '상품명은 필수입니다.'),
  description: z.string().min(1, '상세정보는 필수입니다.'),
  price: z
    .preprocess((val) => parseFloat(val as string), z.number().positive('가격은 음수가 될 수 없습니다.'))
    .refine((val) => val > 10, {
      message: '가격은 10보다 커야 합니다.',
    }),
  companyName: z.string().min(1, '회사명은 필수입니다.'),
  images: z.array(imageMetadataSchema).min(1, '최소 하나의 이미지를 업로드해야 합니다.'),
  options: z.array(z.string().min(1, '옵션은 비어 있을 수 없습니다.')).min(1, '최소 하나의 옵션을 입력해야 합니다.'),
});
