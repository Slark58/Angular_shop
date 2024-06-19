import { TRole } from './role.type';

export interface IUser {
  username: string;
  email: string;
  phone: string;
  password: string;
  role: TRole;
}
