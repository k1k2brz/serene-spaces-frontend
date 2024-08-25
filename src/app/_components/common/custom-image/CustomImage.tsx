import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames';

interface CustomImageProps {
  className?: string;
  src: string;
  alt: string;
  scale?: boolean;
}

/**
 * 커스텀 이미지 컴포넌트입니다. 이미지 로드 상태에 따라 애니메이션 효과를 제공하며, 이미지 로드 실패 시 기본 플레이스홀더 이미지를 보여줍니다.
 *
 * @param {CustomImageProps} props
 * @param {string} [props.className] 추가적인 사용자 정의 클래스명
 * @param {string} props.src 이미지의 소스 URL
 * @param {string} props.alt 이미지의 대체 텍스트
 * @returns JSX.Element 렌더링된 이미지 요소
 */
export const CustomImage = ({ className, src, alt }: CustomImageProps) => {
  const placeholderImage = 'https://via.placeholder.com/150';
  const [isSrc, setIsSrc] = useState(src || placeholderImage);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  /**
   * 에러가 발생했을 때 보여줄 이미지
   */
  const handleImageError = useCallback(() => {
    setIsSrc(placeholderImage);
  }, []);

  useEffect(() => {
    if (src) setIsSrc(src);
  }, [src]);

  return (
    <div
      className={classNames(className, 'relative h-9 overflow-hidden bg-white', {
        'animate-none': isLoaded,
        'animate-imageFade': !isLoaded,
      })}
    >
      <Image
        className="absolute left-0 top-0 rounded object-contain transition-opacity"
        src={isSrc}
        alt={alt}
        fill
        onError={handleImageError}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};
