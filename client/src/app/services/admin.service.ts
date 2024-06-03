import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { ProductCreateForm } from '../models/Form';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public isLoading = signal<boolean>(false)
  public errorMessage = signal<string>('')

  private http: HttpClient = inject(HttpClient)


  public createProduct(formData: FormData) {
    // this.isLoading.set(true)
    console.log(formData);
    
    // this.http.post(`${environment.URL_API}/admin/create-product`, formData)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isLoading.set(false)
    //     },
    //     error: (error) => {
    //       console.log(error);
    //       this.isLoading.set(false)
    //     },
    //   })
  }
  

}