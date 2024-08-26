export interface IReviews {
  id: string;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  productId: number;
}