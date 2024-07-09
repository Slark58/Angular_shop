import { Observable } from 'rxjs';
import { ICartItem } from './cartItem.interface';
import { IOrderItem } from './orderItem.interface';

export interface ProfileState {
  cartItems: ICartItem[] | undefined;
  orderItems: IOrderItem[] | undefined;
  cartQuantity: number;
  error: string | null;
  loading: boolean;
}
