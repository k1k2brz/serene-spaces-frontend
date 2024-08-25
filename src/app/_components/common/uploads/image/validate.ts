import type { ImageMetadata } from '@/app/_types';

/**
 * 이미지 메타데이터를 검증하는 함수입니다.
 *
 * @param {ImageMetadata['file']} file - 검증할 이미지 파일.
 * @param {ImageMetadata[]} selectedImages - 이미 선택된 이미지들의 메타데이터 배열.
 * @param {number} [capacity=2] - 이미지 파일의 최대 용량(MB)입니다. 기본값은 2MB.
 * @returns {{
 *   isValid: boolean;
 *   errorMessage?: string;
 *   imageMetadata?: ImageMetadata;
 * }} - 이미지가 유효하지 않은 경우 `isValid`가 `false`이며, `errorMessage`가 포함됨. 이미지가 유효한 경우 `isValid`가 `true`이며, `imageMetadata`가 포함됨.
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
    return { isValid: false, errorMessage: '이미 등록된 이미지입니다.' };
  }

  return { isValid: true, imageMetadata };
};

/**
 * 이미지가 이미 선택된 이미지들 중 중복되는지 확인하는 함수입니다.
 *
 * @param {ImageMetadata} metadata - 확인할 이미지의 메타데이터.
 * @param {ImageMetadata[]} selectedImages - 이미 선택된 이미지들의 메타데이터 배열.
 * @returns {boolean} - 중복된 이미지가 존재하면 `true`를, 그렇지 않으면 `false`를 반환.
 */
export const isImageDuplicate = (metadata: ImageMetadata, selectedImages: ImageMetadata[]): boolean => {
  return selectedImages.some(
    (selectedImg) =>
      metadata.file.name === selectedImg.file.name &&
      metadata.file.size === selectedImg.file.size &&
      metadata.file.lastModified === selectedImg.file.lastModified,
  );
};
