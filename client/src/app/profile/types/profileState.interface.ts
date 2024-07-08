import { Observable } from 'rxjs';
import { ICartItem } from './cartItem.interface';

export interface ProfileState {
  cartItems: ICartItem[] | undefined;
  cartQuantity: number;
  error: string | null;
  loading: boolean;
}
