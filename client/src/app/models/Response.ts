import { Basket } from './Main';

// export interface AuthResponse {
//   basket: Basket
//   token: string
// }
export interface FiltersResponse {
  title: string;
  data: {
    id: number;
    value: string | number;
  }[];
}
