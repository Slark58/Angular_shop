import { FullProduct } from '../../models/Main';

export interface ICartItem {
  id: number | undefined;
  quantity: number;
  basketId: number;
  productId: number;
  product: FullProduct;
}
