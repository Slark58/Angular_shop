export interface BaseTypeChar {
  id: number;
  value: string;
}

export type Type = BaseTypeChar;
export type Brand = BaseTypeChar;
export type Gender = BaseTypeChar;
export type Size = BaseTypeChar;


export interface imgs {
  id: number
  img: string
  tag: string
}