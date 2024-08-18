'use client';

import React, { ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
  className?: string;
  htmlFor?: string;
}

export const Label = ({ children, className = '', htmlFor }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={`mb-1 block text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  );
};
