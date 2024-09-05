import React from 'react';

interface HeroSectionProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}

export const HeroSection = ({ title, buttonText, onButtonClick }: HeroSectionProps) => {
  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h2>
        <button className="rounded-md bg-serene-500 px-4 py-2 text-white hover:bg-serene-600" onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};
