import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IOrderItem } from '../models/orderItem.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly _http: HttpClient = inject(HttpClient);

  public createOrder(
    userId: number | undefined,
    basketId: number,
    price: number,
    address: string
  ) {
    return this._http.post(`${environment.URL_API}/order/create`, {
      userId,
      basketId,
      price,
      address,
    });
  }

  public getAllOrdersById(
    userId: number
  ): Observable<IOrderItem[] | undefined> {
    return this._http.get<IOrderItem[] | undefined>(
      `${environment.URL_API}/order/getAll`,
      { params: { userId } }
    );
  }
  // public getOneCartItem(
  //   productId: number | null,
  //   basketId: number,
  //   sizeId: number | null
  // ) {
  //   return this._http.get(
  //     `${environment.URL_API}/cartOrder/one?basketId=${basketId}&productId=${productId}`
  //   );
  // }
}
