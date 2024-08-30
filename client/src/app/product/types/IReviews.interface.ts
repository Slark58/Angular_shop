import { IUser } from "../../shared/types/user.interface";

export interface IReview {
  id: string;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: IUser;
  productId: number;
}