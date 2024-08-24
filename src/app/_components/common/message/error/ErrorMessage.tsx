import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <p className="text-sm text-red-500">{message}</p>;
};
