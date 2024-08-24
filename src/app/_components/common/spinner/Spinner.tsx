import React from 'react';

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-t-4 border-blue-200 border-t-white" />
    </div>
  );
};
