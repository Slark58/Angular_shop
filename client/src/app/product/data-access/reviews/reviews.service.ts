import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { IReview } from '../../types/IReviews.interface';
import { Observable } from 'rxjs';
import { IReviewsData } from '../../types/IReviewsStore.interface';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  constructor() {}

  private readonly _http = inject(HttpClient) 

  getReviews(productId: number, userId: number): Observable<IReviewsData> {
    return this._http.get<IReviewsData>(
      `${environment.URL_API}/reviews/getAll`,
      {params: {productId, userId}}
    )
  }

  creteReview(
    productId: number,
    userId: number,
    comment: string | undefined,
    rating: number | null,
  ): Observable<IReview> {
    return this._http.post<IReview>(
      `${environment.URL_API}/reviews/create`,
      {productId, userId, comment, rating}
    )
  }
  
}
