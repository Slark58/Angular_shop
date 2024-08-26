import { createFeature, createReducer, on } from "@ngrx/store";
import { IReviewsData, IReviewsStore } from "../../types/IReviewsStore.interface";
import { ReviewsActions } from "./reviews.actions";


const initialState: IReviewsStore = {
  data: {} as IReviewsData,
  error: null,
  isLoading: false
}

export const reviewsReducer = createFeature({
  name: "reviews",
  reducer: createReducer(
    initialState,

    //////////////////$ GET REVIEWS $////////////////////////////////////////

    on(ReviewsActions.getReviews, (state) => ({
      ...state,
      isLoading: true
    })),
    on(ReviewsActions.getReviewsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.data,
    })),
    on(ReviewsActions.getReviewsFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    //////////////////$ CREATE REVIEWS $////////////////////////////////////////

    on(ReviewsActions.createReviews, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(ReviewsActions.createReviewsSuccess, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(ReviewsActions.createReviewsFailure, (state) => ({
      ...state,
      isLoading: true,
    })),
  )
})