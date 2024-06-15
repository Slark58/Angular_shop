import { IUser } from '../../shared/types/User.interface';

export interface IAuthState {
  isAuth: boolean | null;
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
}
