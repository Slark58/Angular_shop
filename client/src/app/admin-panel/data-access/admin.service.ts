import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IUser } from '../../shared/types/user.interface';
import { CreateProductInterface } from '../types/createProduct.interface';
import { IFiltersResponse } from '../../catalog/types/filterResponse.interface';
import { TFullProduct } from '../../shared/types/fullProduct.type';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly _http: HttpClient = inject(HttpClient);

  getProducts(): Observable<TFullProduct[]> {
    return this._http.get<TFullProduct[]>(`${environment.URL_API}/admin-a`);
  }
  getUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(`${environment.URL_API}/products`);
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
