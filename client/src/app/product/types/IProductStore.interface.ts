import { TFullProduct } from '../../shared/types/fullProduct.type';

export interface IProductStore {
  product: TFullProduct | null;
  isLoading: boolean;
  error: string | null;
}
