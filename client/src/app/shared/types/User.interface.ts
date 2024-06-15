import { TRole } from './role.type';

export interface IUser {
  usetname: string;
  email: string;
  phone: string;
  password: string;
  role: TRole;
}
