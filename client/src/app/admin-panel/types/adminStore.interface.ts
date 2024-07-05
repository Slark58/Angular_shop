import { EntityState } from '@ngrx/entity';
import { IUser } from '../../shared/types/user.interface';
import { TFullProduct } from '../../shared/types/fullProduct.type';

export interface IAdmintStore {
  products: TFullProduct[] | null;
  users: IUser[] | null;
  // orders: [];
  isLoading: boolean;
  error: string | null;
}
