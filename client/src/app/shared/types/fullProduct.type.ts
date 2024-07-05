import { Brand, Gender, Imgs, Size, Type } from './chars.interface';
import { Product } from './product.interface';

export type TFullProduct = Product & {
  info: {
    title: string;
    description: string;
  }[];
  chars: {
    size: Size;
    type: Type;
    brand: Brand;
    gender: Gender;
    typeId: number;
    brandId: number;
    genderId: number;
    productId: number;
    sizeId: number;
    count: number;
  }[];
  imgs: {
    id: number;
    img: Imgs;
    imgId: number;
    productId: number;
  }[];
};
