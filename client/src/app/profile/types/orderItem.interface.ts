import { Color, Gender, Size, Type } from '../../shared/types/chars.interface';
import { TFullProduct } from '../../shared/types/fullProduct.type';
import { Product } from '../../shared/types/product.interface';

export interface IOrderItem {
  id: number;
  quantity: number;
  product_char: {
    id: number;
    product: Product & {
      imgs: {
        id: number;
        img: {
          img: string;
        };
      }[];
    };
  };
}
