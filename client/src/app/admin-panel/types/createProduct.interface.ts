import { ProductCharForm } from '../../models/Form';

export interface CreateProductInterface {
  name: string;
  price: number;
  oldPrice: number;
  colorId: number;
  chars: ProductCharForm[];
  info: {
    title: string;
    description: string;
  }[];
}
