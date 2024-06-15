import { Basket } from '../../models/Main';

export interface AuthResponse {
  basket: Basket;
  token: string;
}
