import { ProductCharForm } from '../../models/Form';

export interface CreateProductInterface {
  name: string;
  price: string;
  oldPrice: string;
  colorId: string;
  chars: ProductCharForm[];
  info: {
    title: string;
    description: string;
  }[];
}
