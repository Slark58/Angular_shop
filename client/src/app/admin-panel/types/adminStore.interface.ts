import { EntityState } from '@ngrx/entity';
import { FullProduct } from '../../models/Main';
import { IUser } from '../../shared/types/user.interface';

export interface IAdmintStore {
  products: FullProduct[] | null;
  users: IUser[] | null;
  // orders: [];
  isLoading: boolean;
  error: string | null;
}
