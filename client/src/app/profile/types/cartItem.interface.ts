import { TFullProduct } from '../../shared/types/fullProduct.type';

export interface ICartItem {
  id: number | undefined;
  quantity: number;
  basketId: number;
  productId: number;
  product: TFullProduct;
}
