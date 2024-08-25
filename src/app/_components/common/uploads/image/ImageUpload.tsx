'use client';

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { type ImageMetadata } from '@/app/_types';

import { validateImageMetadata } from './validate';
import { Button } from '../../button';
import { CustomImage } from '../../custom-image';

interface ImagesUploadProps {
  className?: string;
  limit?: number;
  capacity?: number;
  selectedImages: ImageMetadata[];
  setSelectedImages: Dispatch<SetStateAction<ImageMetadata[]>>;
  customImageClassName?: string;
  isError?: string;
}

/**
 * 이미지 업로드를 위한 컴포넌트입니다.
 *
 * @param {ImagesUploadProps} props
 * @param {string} [props.className] 추가적인 사용자 정의 클래스명
 * @param {string} [props.customImageClassName] 이미지에 대한 추가적인 사용자 정의 클래스명
 * @param {number} [props.limit=3] 최대 업로드할 수 있는 이미지 수
 * @param {number} [props.capacity=2] 각 이미지의 최대 용량 (MB 단위)
 * @param {ImageMetadata[]} props.selectedImages 선택된 이미지들의 메타데이터 배열
 * @param {Dispatch<SetStateAction<ImageMetadata[]>>} props.setSelectedImages 선택된 이미지들을 업데이트하는 상태 설정 함수
 * @param {string} [props.isError] 오류 메시지
 * @returns JSX.Element 렌더링된 이미지 업로드 요소
 */
export const ImageUpload = ({
  className,
  limit = 3,
  capacity = 2,
  selectedImages,
  setSelectedImages,
  customImageClassName,
  isError,
}: ImagesUploadProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = Array.from(e.target.files || []);
    let tempErrorMessage: undefined | null | string = null;

    const validFilesMetadata = files
      .map((file) => {
        const { isValid, errorMessage, imageMetadata } = validateImageMetadata(file, selectedImages, capacity);
        if (!isValid) {
          tempErrorMessage = errorMessage;
          return null;
        }
        return imageMetadata;
      })
      .filter(Boolean);

    if (tempErrorMessage) {
      setErrorMessage(tempErrorMessage);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    if (selectedImages.length + validFilesMetadata.length > limit) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    const newSelectedImages = [...selectedImages];
    for (const metadata of validFilesMetadata) {
      if (metadata) {
        newSelectedImages.push(metadata);
        setErrorMessage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }

    setSelectedImages(newSelectedImages);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const modifyImage = async () => {
    if (!fileInputRef.current) {
      setErrorMessage('image_ref');
      throw new Error('image_ref');
    }

    fileInputRef.current.click();

    try {
      const file = await new Promise<File | null>((resolve, reject) => {
        fileInputRef.current!.onchange = (e) => {
          const target = e.target as HTMLInputElement;
          const files = target.files;
          if (files && files.length > 0) {
            resolve(files[0]);
          } else {
            reject(new Error('image_non_selected'));
          }

          fileInputRef.current!.value = '';
          fileInputRef.current!.onchange = null;
        };
      });

      if (!file) {
        throw new Error('image_non_selected');
      }

      const { isValid, errorMessage, imageMetadata } = validateImageMetadata(file, selectedImages, capacity);
      if (!isValid) {
        const error = new Error(errorMessage);
        throw error;
      }

      return imageMetadata;
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
      throw error;
    }
  };

  const handleModifyImage = async (imageToModify: ImageMetadata) => {
    try {
      const newImageMetadata = await modifyImage();
      if (newImageMetadata) {
        const updatedImages = selectedImages.map((img) => (img === imageToModify ? newImageMetadata : img));
        setSelectedImages(updatedImages);
        URL.revokeObjectURL(imageToModify.url);
        setErrorMessage(null);
      } else {
        setErrorMessage('image_undefined');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      throw new Error(`Image Modify Errors :: ${error}`);
    }
  };

  const handleRemoveImage = (image: ImageMetadata) => {
    const updatedImages = selectedImages.filter((selectedImage) => selectedImage !== image);
    setSelectedImages(updatedImages);
    URL.revokeObjectURL(image.url);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setErrorMessage(null);
  };

  const handleButtonClick = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (errorMessage || isError) {
      if (errorMessage) {
        alert(errorMessage);
      } else if (isError) {
        alert(isError);
      }
      setErrorMessage(null);
    }
  }, [errorMessage, isError]);

  return (
    <div className={className}>
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        onChange={handleImageUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <div className="flex flex-col">
        {selectedImages.map((image, index) => (
          <div key={index} className="relative mb-2 flex items-center justify-between rounded border p-2">
            <div className="flex items-center">
              <CustomImage
                src={image.url}
                alt={image.file.name}
                className={classNames(customImageClassName, 'mr-4 h-12 w-12')}
              />
              <span className="text-sm">{image.file.name}</span>
            </div>
            <div className="mr-1 flex items-center">
              <button className="ml-3 text-sm text-gray-500" type="button" onClick={() => handleModifyImage(image)}>
                수정
              </button>
              <button className="ml-3 text-sm text-red-500" type="button" onClick={() => handleRemoveImage(image)}>
                삭제
              </button>
            </div>
          </div>
        ))}
        {selectedImages.length < limit && (
          <Button className="mb-5" type="button" variant="small" onClick={handleButtonClick}>
            이미지 등록
          </Button>
        )}
      </div>
    </div>
  );
};
