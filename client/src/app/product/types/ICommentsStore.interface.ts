import { TFullProduct } from '../../shared/types/fullProduct.type';

export interface ICommentsStore {
  product: TFullProduct | null;
  isLoading: boolean;
  error: string | null;
}
