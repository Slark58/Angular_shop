export interface BasketProduct {
  id: number
  quantity: number
  product_id: number
  basket_id: number
}
export interface OrderProduct {
  id: number
  quantity: number
  product_id: number
  order_id: number
}
export interface ProductChars {
  id: number
  count: number
  type_id: number
  product_id: number
  brand_id: number
  gender_id: number
  size_id: number
}
export interface ProductImgs {
  id: number
  product_id: number
  imgs_id: number
}