export interface BaseTypeChar {
  id: number;
  value: string;
}

export type Type = BaseTypeChar;
export type Brand = BaseTypeChar;
export type Gender = BaseTypeChar;
export type Size = BaseTypeChar;
export type Color = BaseTypeChar & {
  code: string;
};
export interface Imgs {
  id: number;
  img: string;
  tag: string;
}
