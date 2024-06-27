import { FullProduct } from '../../models/Main';

export interface IProductStore {
  product: FullProduct | null;
  isLoading: boolean;
  error: string | null;
}
