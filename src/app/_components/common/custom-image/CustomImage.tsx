import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames';

interface CustomImageProps {
  src: string;
  alt: string;
  scale?: boolean;
}

export const CustomImage = ({ src, alt, scale = false }: CustomImageProps) => {
  const [isSrc, setIsSrc] = useState(src || '/images/image-placeholder.svg');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleImageError = useCallback(() => {
    setIsSrc('/images/image-placeholder.svg'); // 에러가 발생했을 때 보여줄 이미지
  }, []);

  useEffect(() => {
    if (src) setIsSrc(src);
  }, [src]);

  return (
    <div
      className={classNames('w-37.5 relative h-full overflow-hidden bg-white', {
        'animate-none': isLoaded,
        'animate-imageFade': !isLoaded,
      })}
    >
      <Image
        className={classNames('h-37.5 absolute left-0 top-0 rounded object-contain transition-opacity', {
          'transition-transform hover:scale-105': scale,
          'scale-100': !scale,
        })}
        src={isSrc}
        fill
        alt={alt}
        onError={handleImageError}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};
