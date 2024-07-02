import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FullProduct } from '../../models/Main';
import { environment } from '../../../environments/environment.development';
import { IUser } from '../../shared/types/user.interface';
import { CreateProductInterface } from '../types/createProduct.interface';
import { IFiltersResponse } from '../../catalog/types/filterResponse.interface';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly _http: HttpClient = inject(HttpClient);

  getProducts(): Observable<FullProduct[]> {
    return this._http.get<FullProduct[]>(`${environment.URL_API}/admin-a`);
  }
  getUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(`${environment.URL_API}/products`);
  }
  getFilters(): Observable<IFiltersResponse[]> {
    return this._http.get<IFiltersResponse[]>(`${environment.URL_API}/filters`);
  }

  createProduct(product: CreateProductInterface): Observable<void> {
    return this._http.post<void>(`${environment.URL_API}/create-product`, {
      product,
    });
  }
}
