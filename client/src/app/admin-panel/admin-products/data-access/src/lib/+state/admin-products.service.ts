import { inject, Injectable } from '@angular/core';
import { TFullProduct } from '../../../../../../shared/types/fullProduct.type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment.development';
import { IFiltersResponse } from '../../../../../../catalog/types/filterResponse.interface';

@Injectable({ providedIn: 'root' })
export class AdminProductsService {
  private readonly _http: HttpClient = inject(HttpClient);

  getProducts(): Observable<TFullProduct[]> {
    return this._http.get<TFullProduct[]>(`${environment.URL_API}/admin-a`);
  }

  getFilters(): Observable<IFiltersResponse[]> {
    return this._http.get<IFiltersResponse[]>(`${environment.URL_API}/filters`);
  }

  createProduct(product: FormData): Observable<void> {
    return this._http.post<void>(
      `${environment.URL_API}/admin/create-product`,
      product
    );
  }
}
