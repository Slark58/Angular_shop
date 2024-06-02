import { Brand, Gender, Imgs, Size, Type } from "./Chars"

export interface Product {
  id: number
  name: string
  price: number
  oldPrice: string 
}
export interface ProductInfo {
  id: number
  title: string
  decription: number
  product_id: number
}
export interface Order {
  id: number
  price: number
  status: string 
  address: string
  user_id: number
}
export interface Basket {
  id: number
  user_id: number
}
export interface Rating {
  id: number
  rate: number
  product_id: number
  user_id: number
}
export interface Comments {
  id: number
  comment: string
  product_id: number
  user_id: number
}

export type FullProduct = Product &{
  product_chars: {
    size: Size,
    type: Type,
    brand: Brand,
    gender: Gender,
    typeId: number,
    brandId: number,
    genderId: number,
    productId: number,
    sizeId: number,
    count: number,
  }[]
  product_imgs: {
    id: number,
    img: Imgs
    imgId: number,
    productId: number
  }[]
}

