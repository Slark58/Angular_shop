import { IReviews } from './IReviews.interface';

export interface IReviewsStore {
  data: IReviewsData
  isLoading: boolean;
  error: string | null;
}


export interface IReviewsData {
  reviews:IReviews[] | undefined
  isPaid: boolean
  currentUserReview: IReviews | null
}