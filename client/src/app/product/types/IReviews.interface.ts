import { IUser } from "../../shared/types/user.interface";

export interface IReview {
  id: string;
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: IUser;
  productId: number;
}