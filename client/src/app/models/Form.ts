import { User } from "./User"

export type UserRegister = Omit<User, 'id' | 'role'>
export type UserLogin = Pick<User, 'email' | 'password'>


export interface ProductCreateForm {
  name: string,
  price: number,
  oldPrice: number,
  chars: ProductCharForm[]
}

export type ProductCharForm = {
  color: number 
  size: number
  type: number 
  gender: number
  count: number
}