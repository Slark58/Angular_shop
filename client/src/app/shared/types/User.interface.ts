import { TRole } from './role.type';

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: TRole;
}
