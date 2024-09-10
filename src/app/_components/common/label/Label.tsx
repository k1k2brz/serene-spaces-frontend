'use client';

import React, { ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
  className?: string;
  htmlFor?: string;
  required?: boolean;
}

export const Label = ({ children, className = '', htmlFor, required }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={`mb-1 block text-sm font-medium text-gray-700 ${className}`}>
      {children}
      {required && <span className="text-red-500"> (필수)</span>}
    </label>
  );
};
