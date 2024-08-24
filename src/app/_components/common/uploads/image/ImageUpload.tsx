'use client';

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { validateImageMetadata } from './validate';
import { CustomImage } from '../../custom-image';

import type { ImageMetadata } from '@/app/_types';

interface ImagesUploadProps {
  className?: string;
  uploads?: number;
  capacity?: number;
  selectedImages: ImageMetadata[];
  setSelectedImages: Dispatch<SetStateAction<ImageMetadata[]>>;
  isError?: string;
}

export const ImageUpload = ({
  className,
  uploads = 3,
  capacity,
  selectedImages,
  setSelectedImages,
  isError,
}: ImagesUploadProps) => {
  const [isUploaded, setIsUploaded] = useState(false);
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
          setIsUploaded(true);
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

    if (selectedImages.length + validFilesMetadata.length > uploads) {
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
    setIsUploaded(true);

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
      setIsUploaded(true);
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
    setIsUploaded(true);
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
      setIsUploaded(false);
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
      <div className="flex flex-row">
        {selectedImages.map((image, index) => (
          <div
            key={index}
            className={classNames(
              'w-37.5 h-37.5 gap-1.25 relative mr-4 flex items-center justify-center rounded text-[0px]',
            )}
          >
            <CustomImage src={image.url} alt={image.file.name} />
            <div className="absolute bottom-0 h-9 w-full rounded-b bg-black opacity-50" />
            <button
              className="left-9.75 absolute bottom-1.5 flex h-6 w-6 items-center justify-center"
              type="button"
              onClick={() => handleModifyImage(image)}
            >
              수정
            </button>
            <button
              className="right-9.75 absolute bottom-1.5 flex h-6 w-6 items-center justify-center"
              type="button"
              onClick={() => handleRemoveImage(image)}
            >
              삭제
            </button>
          </div>
        ))}
        {selectedImages.length < uploads && (
          <button
            className="w-37.5 h-37.5 gap-1.25 body-14m mr-4 flex items-center justify-center rounded border border-dashed border-neutral-300"
            type="button"
            onClick={handleButtonClick}
          >
            image
          </button>
        )}
      </div>
    </div>
  );
};
