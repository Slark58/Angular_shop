import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { IFiltersResponse } from '../../types/filterResponse.interface';
import { TFullProduct } from '../../../shared/types/fullProduct.type';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly _http: HttpClient = inject(HttpClient);

  getFilters = () => {
    const url = environment.URL_API + '/filters';

    return this._http.get<IFiltersResponse[]>(url);
  };
  getPropducts = () => {
    const url = environment.URL_API + '/product';

    return this._http.get<TFullProduct[]>(url);
  };

  // public getProductById(id: number) {
  //   this.isLoading.set(true);
  //   return this.http.get<FullProduct>(`${environment.URL_API}/product/${id}`);
  // }

  // public createProduct(formData: FormData) {
  //   this.isLoading.set(true);
  //   console.log(formData);

  //   this.http
  //     .post(`${environment.URL_API}/admin/create-product`, formData)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.isLoading.set(false);
  //       },
  //       error: (error) => {
  //         console.log(error);
  //         this.isLoading.set(false);
  //       },
  //     });
  // }
}
