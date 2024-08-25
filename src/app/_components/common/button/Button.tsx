'use client';

import { ReactNode } from 'react';

import { Spinner } from '../spinner';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'small';
  type?: 'button' | 'submit';
  onClick?: (...props: any) => void;
  isLoading?: boolean;
}

/**
 * 재사용 가능한 버튼 컴포넌트입니다.
 *
 * @param {ButtonProps} props
 * @param {ReactNode} props.children 버튼 내부에 표시될 콘텐츠 (일반적으로 텍스트 또는 아이콘)
 * @param {string} [props.className] 추가적인 사용자 정의 클래스명
 * @param {'primary' | 'secondary' | 'outline' | 'small'} [props.variant='primary'] 버튼의 스타일을 결정하는 변형 옵션
 * @param {'button' | 'submit'} [props.type='button'] 버튼의 타입 (기본값은 'button')
 * @param {function} [props.onClick] 버튼 클릭 시 호출될 함수
 * @param {boolean} [props.isLoading=false] 버튼이 로딩 상태인지 여부를 나타내는 불리언 값 (로딩 중일 경우 스피너를 표시)
 * @returns JSX.Element 렌더링된 버튼 요소
 */
export const Button = ({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  onClick,
  isLoading,
}: ButtonProps): JSX.Element => {
  const props = {
    type,
    onClick,
    disabled: isLoading,
  };

  const baseStyles =
    'px-4 py-2 rounded-full font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: `bg-serene-500 text-white hover:bg-serene-600 focus:ring-serene-500 ${isLoading && 'opacity-50 cursor-not-allowed'}`,
    secondary: `bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 ${isLoading && 'opacity-50 cursor-not-allowed'}`,
    outline: `bg-transparent border border-serene-500 text-serene-500 hover:bg-serene-50 focus:ring-serene-500 ${isLoading && 'opacity-50 cursor-not-allowed'}`,
    small: `bg-white text-black border border-dashed border-gray-400 px-2 py-1 text-sm rounded focus:ring-black ${isLoading && 'opacity-50 cursor-not-allowed'}`,
  };

  return (
    <button {...props} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {isLoading ? <Spinner /> : children}
    </button>
  );
};
