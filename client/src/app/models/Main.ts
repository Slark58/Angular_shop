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