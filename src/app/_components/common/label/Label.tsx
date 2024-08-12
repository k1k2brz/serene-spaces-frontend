'use client';

import React, { ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
  className?: string;
}

export const Label = ({ children, className }: LabelProps) => {
  return <label className={`mb-1 block text-sm font-medium text-gray-700 ${className}`}>{children}</label>;
};
