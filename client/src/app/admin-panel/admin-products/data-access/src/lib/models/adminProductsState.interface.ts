import { TFullProduct } from '../../../../../../shared/types/fullProduct.type';

export interface IAdminProductsState {
  products: TFullProduct[] | null;
  isLoading: boolean;
  error: string | null;
}
