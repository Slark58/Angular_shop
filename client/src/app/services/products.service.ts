import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { FullProduct } from '../models/Main';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsSubject$ = new BehaviorSubject<FullProduct[]>([])  
  public products$ = this.productsSubject$.asObservable()

  public isLoading = signal<boolean>(false)
  public errorMessage = signal<string>('')

  private http: HttpClient = inject(HttpClient)

  public getProducts() {
    this.isLoading.set(true)
    this.http.get<FullProduct[]>(`${environment.URL_API}/product`)
      .subscribe({
        next: (res) => {
          this.productsSubject$.next(res)
          console.log(res);
          this.isLoading.set(false)
        },
        error: (error) => {
          console.log(error);
          this.isLoading.set(false)
        },
      })
  }

  public getProductById(id: number) {
    this.isLoading.set(true)
    return this.http.get<FullProduct>(`${environment.URL_API}/product/${id}`)
      
  }

}
