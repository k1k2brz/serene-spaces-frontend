import React from 'react';

import { Label } from '../label';

type SelectProps<T> = {
  id: T;
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select = <T extends string>({ id, label, options, value, onChange }: SelectProps<T>) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
