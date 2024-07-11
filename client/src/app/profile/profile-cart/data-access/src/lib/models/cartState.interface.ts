import { ICartItem } from './cartItem.interface';

export interface ICartState {
  cartItems: ICartItem[] | undefined;
  cartQuantity: number;
  error: string | null;
  loading: boolean;
}
