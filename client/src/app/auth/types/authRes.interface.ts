import { Basket } from '../../shared/types/Basket.interface';

export interface AuthResponse {
  basket: Basket;
  token: string;
}
