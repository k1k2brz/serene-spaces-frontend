import React from 'react';

import { Button } from '@/app/_components/common/button';
import { Label } from '@/app/_components/common/label';

export default function page() {
  return (
    <div className="bg-white p-6 shadow-md">
      <h1 className="text-2xl font-bold">Add New Product</h1>
      <form className="mt-4">
        <div className="mb-4">
          <Label>상품명</Label>
          <input type="text" className="mt-1 w-full rounded-md border-gray-300" />
        </div>
        <div className="mb-4">
          <Label>설명</Label>
          <textarea className="mt-1 w-full rounded-md border-gray-300"></textarea>
        </div>
        <div className="mb-4">
          <Label>가격</Label>
          <input type="number" className="mt-1 w-full rounded-md border-gray-300" />
        </div>
        <div className="mb-4">
          <Label>이미지 업로드</Label>
          <input type="file" className="mt-1 w-full" />
        </div>
        <Button type="submit">상품 등록</Button>
      </form>
    </div>
  );
}
