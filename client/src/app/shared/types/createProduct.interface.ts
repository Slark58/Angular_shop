import { ProductChars } from './ProductChars.interface';

export interface CreateProductInterface {
  name: string;
  price: string;
  oldPrice: string;
  colorId: string;
  chars: ProductChars[];
  info: {
    title: string;
    description: string;
  }[];
}
