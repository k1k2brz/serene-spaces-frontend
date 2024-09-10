import { PropsWithChildren } from 'react';

export const NoReviewsMessage = ({ children }: PropsWithChildren) => (
  <div className="mt-8 flex flex-col items-center justify-center space-y-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-16 text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 13h6m2 0h1m-2 0V5a2 2 0 00-2-2H7a2 2 0 00-2 2v8m5-6h.01M5 10h.01M15 10h.01M19 10h.01M5 6h.01M15 6h.01M19 6h.01"
      />
    </svg>
    <p className="text-lg text-gray-500">등록된 리뷰가 없습니다.</p>
  </div>
);
