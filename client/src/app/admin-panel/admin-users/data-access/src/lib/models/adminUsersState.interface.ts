import { CountAndRows } from '../../../../../../shared/types/countAndRows.interface';
import { IUser } from '../../../../../../shared/types/user.interface';

export interface IAdminUsersState {
  users: CountAndRows<IUser[]> | null;
  isLoading: boolean;
  error: string | null;
}
