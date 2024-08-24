import React from 'react';

export default function page() {
  return (
    <div className="bg-white p-6 shadow-md">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="bg-gray-100 p-4">
          <h2 className="text-xl">판매 성과</h2>
          <p>여기에 판매 성과 데이터를 표시합니다.</p>
        </div>
        <div className="bg-gray-100 p-4">
          <h2 className="text-xl">주문 현황</h2>
          <p>여기에 주문 현황 데이터를 표시합니다.</p>
        </div>
      </div>
    </div>
  );
}
