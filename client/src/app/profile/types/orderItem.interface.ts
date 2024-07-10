import { Color, Gender, Size, Type } from '../../shared/types/chars.interface';
import { TFullProduct } from '../../shared/types/fullProduct.type';
import { Product } from '../../shared/types/product.interface';
import { IProductChar } from '../../shared/types/productChar.interface';

export interface IOrderItem {
  id: number;
  price: number;
  status: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  order_products: {
    id: number;
    quantity: number;
    product_char: IProductChar;
  }[];
}
