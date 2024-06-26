import { FullProduct } from '../../models/Main';
import { IFiltersResponse } from './filterResponse.interface';

export interface ICatolgState {
  isLoading: boolean;
  error: string | null;
  products: FullProduct[] | null;
  filters: IFiltersResponse[] | null;
}
