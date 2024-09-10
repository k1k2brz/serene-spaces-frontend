'use server';

export const getAllProductsApi = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: 'GET',
      next: {
        tags: ['products'],
      },
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${session.accessToken}`,
      },
      cache: 'no-store',
    });

    const result = await response.json();
    if (!response.ok) {
      return {
        message: result.error.message || '상품을 받아올 수 없습니다.',
        code: result.error.code || 'PRODUCTS_NOT_FOUND',
      };
    }

    return result;
  } catch (error) {
    console.error(error);
    return { message: '상품을 받아올 수 없습니다.', code: 'PRODUCTS_NOT_FOUND' };
  }
};
