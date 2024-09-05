import { type Metadata } from 'next';

import { Mainpage } from '../_components/main/MainPage';
import { getProductServerApi } from '../_lib/product/getAllProducts';
import { Product } from '../_types';

export const metadata: Metadata = {
  title: 'Serene Spaces | 가정용 소품',
  description: '평화로운 공간을 만드는 가정용 소품 쇼핑몰',
};

export default async function Home() {
  const products: Product[] = await getProductServerApi();

  return <Mainpage products={products} />;
}
