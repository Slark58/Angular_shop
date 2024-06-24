import { IUser } from '../../shared/types/user.interface';

export interface IAuthState {
  isAuth: boolean | null;
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
}
