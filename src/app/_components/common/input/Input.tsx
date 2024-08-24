import { ReactNode } from 'react';

interface InputProps {
  isError?: string;
  className?: string;
  value: string;
  type?: 'text' | 'number' | 'password' | 'email';
  onChange: (...args: any) => void;
  children?: ReactNode;
}

/**
 * Input 컴포넌트의 속성 타입
 *
 * @param {InputProps} props
 * @param {string} [props.isError] - 에러 상태를 나타내는 문자열
 * @param {string} [props.className] - 추가적인 사용자 정의 클래스명
 * @param {string} props.value - input의 값
 * @param {'text' | 'number' | 'password' | 'email'} [props.type='text'] - input 타입 (기본값은 'text')
 * @param {function} props.onChange - 값이 변경될 때 호출되는 함수
 * @param {ReactNode} [props.children] - 에러 메시지 등 추가적으로 렌더링할 자식 노드
 * @returns JSX.Element 렌더링된 Input 요소
 */
export const Input = ({ isError, className = '', type = 'text', value, onChange, children }: InputProps) => {
  const props = {
    value,
    type,
    onChange,
  };

  return (
    <div>
      <input
        className={`mb-1 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-serene-500 ${isError ? 'border-red-500' : ''} ${className} `}
        {...props}
      />
      {/* 레이아웃 시프트 신경써야 하는 form의 경우 */}
      {children && <div className="h-5">{children}</div>}
    </div>
  );
};
