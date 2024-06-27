import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FullProduct } from '../../models/Main';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly _http: HttpClient = inject(HttpClient);

  public getProductById(id: number) {
    const url = environment.URL_API + `/product/${id}`;
    return this._http.get<FullProduct>(url);
  }

  // public createProduct (formData: FormData) {
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
