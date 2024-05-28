import { Basket } from "./Main"

export interface User {
  id: number
  name: string
  email: string
  password: string
  role: string
  phone: string
}
export type UserRegister = Omit<User, 'id' | 'role'>
export type UserLogin = Pick<User, 'email' | 'password'>

