import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ICartItem } from '../types/cartItem.interface';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly _http: HttpClient = inject(HttpClient);

  public removeFromCart(
    productId: string | number | undefined,
    basketId: number
  ) {
    return this._http.delete(
      `${environment.URL_API}/delete?basketId=${basketId}&productId=${productId}`
    );
  }
  public incrementProduct(productId: number | null, basketId: string | null) {
    return this._http.post(`${environment.URL_API}/cartOrder/increase`, {
      productId,
      basketId,
    });
  }

  public decrementProduct(
    productId: string | number | undefined,
    basketId: number
  ) {
    return this._http.post(`${environment.URL_API}/cartOrder/decrease`, {
      productId,
      basketId,
    });
  }

  public clearProduct(basketId: number) {
    return this._http.delete(`${environment.URL_API}/cartOrder/clear`, {
      params: { basketId },
    });
  }
  public getAllCartItems(
    basketId: number
  ): Observable<ICartItem[] | undefined> {
    return this._http.get<ICartItem[] | undefined>(
      `${environment.URL_API}/cartOrder/all`,
      {
        params: { basketId },
      }
    );
  }
  public getOneCartItem(
    productId: string | number | undefined,
    basketId: number
  ) {
    return this._http.get(
      `${environment.URL_API}/cartOrder/one?basketId=${basketId}&productId=${productId}`
    );
  }
  // public reduceCartProdict() {}
}
