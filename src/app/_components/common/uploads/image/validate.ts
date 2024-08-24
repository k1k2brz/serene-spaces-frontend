import type { ImageMetadata } from '@/app/_types';

/**
 * 이미지파일 검증하는 Validate입니다.
 * @param file 파일
 * @param selectedImages 현재 올라가있는 이미지 배열
 * @param capacity number: 제한 용량
 * @returns
 */
export const validateImageMetadata = (
  file: ImageMetadata['file'],
  selectedImages: ImageMetadata[],
  capacity?: number,
) => {
  const isValidType = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);

  if (!isValidType) {
    return {
      isValid: false,
      errorMessage: '파일 확장자는 jpg, jpeg, png만 등록 가능합니다.',
    };
  }

  const isSizeValid = file.size / 1024 / 1024 < (capacity || 2);
  if (!isSizeValid) {
    return {
      isValid: false,
      errorMessage: `이미지 파일은 ${capacity || 2}MB를 넘을 수 없습니다.`,
    };
  }

  const imageMetadata: ImageMetadata = {
    file,
    url: URL.createObjectURL(file),
  };

  const isDuplicate = isImageDuplicate(imageMetadata, selectedImages);
  if (isDuplicate) {
    return { isValid: false, errorMessage: 'This image is already uploaded.' };
  }

  return { isValid: true, imageMetadata };
};

// 이미지 중복검사 로직
export const isImageDuplicate = (metadata: ImageMetadata, selectedImages: ImageMetadata[]): boolean => {
  return selectedImages.some(
    (selectedImg) =>
      metadata.file.name === selectedImg.file.name &&
      metadata.file.size === selectedImg.file.size &&
      metadata.file.lastModified === selectedImg.file.lastModified,
  );
};
