import { Color, Gender, Size, Type } from './chars.interface';
import { Product } from './product.interface';

export interface IProductChar {
  id: number;
  product: Product & {
    imgs: {
      id: number;
      img: {
        img: string;
      };
    }[];
  };
  type: Type;
  size: Size;
  color: Color;
  gender: Gender;
}
