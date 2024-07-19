import { IUser } from '../../../../../../shared/types/user.interface';

export interface IAdminUsersState {
  users: IUser[] | null;
  isLoading: boolean;
  error: string | null;
}
