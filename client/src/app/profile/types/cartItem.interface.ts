import { Color, Gender, Size, Type } from '../../shared/types/chars.interface';
import { TFullProduct } from '../../shared/types/fullProduct.type';
import { Product } from '../../shared/types/product.interface';
import { IProductChar } from '../../shared/types/productChar.interface';

export interface ICartItem {
  id: number;
  quantity: number;
  product_char: IProductChar;
}
