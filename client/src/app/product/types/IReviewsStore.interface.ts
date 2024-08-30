import { IReview } from './IReviews.interface';

export interface IReviewsStore {
  data: IReviewsData
  isLoading: boolean;
  error: string | null;
}


export interface IReviewsData {
  reviews:IReview[] | undefined
  isPaid: boolean
  currentUserReview: IReview | null
}