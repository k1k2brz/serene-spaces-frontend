'use client';

import { ReactNode } from 'react';

import classNames from 'classnames';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit';
  onClick?: (...props: any) => void;
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  className,
  type = 'button',
  onClick,
  isLoading,
}: ButtonProps) => {
  const props = {
    type,
    onClick,
  };

  const baseStyles =
    'px-4 py-2 rounded-full font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'bg-transparent border border-teal-500 text-teal-500 hover:bg-teal-50 focus:ring-teal-500',
  };

  return (
    <button {...props} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};
