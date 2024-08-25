'use client';

import React, { useState } from 'react';

type SelectProps<T> = {
  id: T;
  options: { value: T; label: string }[];
  value: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select = <T extends string>({ id, options, value, onChange }: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <select
        id={id}
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        onBlur={handleBlur}
        onClick={handleClick}
        className="mt-1 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* Custom 화살표 */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 pt-1">
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.917l3.71-3.688a.75.75 0 111.06 1.06l-4.24 4.22a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};
