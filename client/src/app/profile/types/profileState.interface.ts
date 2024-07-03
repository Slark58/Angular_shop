import { Observable } from 'rxjs';
import { ICartItem } from './cartItem.interface';

export interface ProfileState {
  cartItems: ICartItem[];
  cartQuantity: number;
  error: string | null;
  loading: boolean;
  // getAllOrderCartItems: (
  //   basketId: number
  // ) => Observable<ICartItem[] | undefined>;
  // getOneCartItem: (
  //   productId: string | number | undefined,
  //   basketId: number
  // ) => Observable<ICartItem | undefined>;
  // removeFromCart: (
  //   productId: string | number | undefined,
  //   basketId: number
  // ) => Observable<ICartItem | undefined>;
  // asyncIncreaseCartQuantity: (
  //   productId: string | number | undefined,
  //   basketId: number
  // ) => Observable<void>;
  // asyncDecreaseCartQuantity: (
  //   productId: string | number | undefined,
  //   basketId: number
  // ) => Observable<void>;
  // clearBasket: (basketId: number) => void;
  // reduceCartProdict: () => void;
}
