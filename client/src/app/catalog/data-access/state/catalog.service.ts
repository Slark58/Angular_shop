import { HttpClient, HttpParams } from '@angular/common/http';
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
  // colors, types, sizes, genders
  getPropducts = (filters: Record<string, number[]>) => {
    const url = environment.URL_API + '/product';
    console.log(filters);

    let params = new HttpParams();
    for (const key in filters) {
      // filters[key].forEach((value) => {
      //   params = params.append(key, value);
      // });

      if (filters.hasOwnProperty(key)) {
        const values = filters[key].join(',');
        params = params.set(key, values);
      }
      console.log(params);
    }
    return this._http.get<TFullProduct[]>(url, { params });
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
