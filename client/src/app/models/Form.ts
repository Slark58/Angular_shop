export interface ProductCreateForm {
  name: string;
  price: number;
  oldPrice: number;
  chars: ProductCharForm[];
}

export type ProductCharForm = {
  color: number;
  size: number;
  type: number;
  gender: number;
  count: number;
};
