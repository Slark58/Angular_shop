import {
  Color,
  Gender,
  Size,
  Type,
} from '../../../../../../shared/types/chars.interface';
import { TFullProduct } from '../../../../../../shared/types/fullProduct.type';
import { IOrder } from '../../../../../../shared/types/order.interface';
import { Product } from '../../../../../../shared/types/product.interface';
import { IProductChar } from '../../../../../../shared/types/productChar.interface';

export interface IOrderItem extends IOrder {
  order_products: {
    id: number;
    quantity: number;
    product_char: IProductChar;
  }[];
}
