import { CountAndRows } from '../../../../../../shared/types/countAndRows.interface';
import { TFullProduct } from '../../../../../../shared/types/fullProduct.type';

export interface IAdminProductsState {
  products: CountAndRows<TFullProduct[]> | null;
  isLoading: boolean;
  error: string | null;
}
