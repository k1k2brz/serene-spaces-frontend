import React from 'react';

export default function page() {
  return (
    <div className="bg-white p-6 shadow-md">
      <h1 className="text-2xl font-bold">Account and Settings Management</h1>
      <div className="mt-4">
        <h2 className="text-xl">프로필 관리</h2>
        <p>여기에 프로필 관리 폼을 표시합니다.</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl">결제 정보 관리</h2>
        <p>여기에 결제 정보 관리 폼을 표시합니다.</p>
      </div>
    </div>
  );
}
