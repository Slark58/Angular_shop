import { TFullProduct } from '../../shared/types/fullProduct.type';
import { IFiltersResponse } from './filterResponse.interface';

export interface ICatolgState {
  isLoading: boolean;
  error: string | null;
  products: TFullProduct[] | null;
  filters: IFiltersResponse[] | null;
}
