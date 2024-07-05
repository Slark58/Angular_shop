import { Observable } from 'rxjs';
import { ICartItem } from './cartItem.interface';

export interface ProfileState {
  cartItems: ICartItem[] | null;
  cartQuantity: number;
  error: string | null;
  loading: boolean;
}
