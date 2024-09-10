import { Review } from './user';

export interface Product {
  id: number;
  productName: string;
  description: string;
  price: string;
  averageRating: number;
  images: string[];
  companyName: string;
  options: string[];
  reviews: Review[];
}
