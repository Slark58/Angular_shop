import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { FiltersResponse } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  
  filtersSubject = new BehaviorSubject<FiltersResponse[]>([])
  filters$ = this.filtersSubject.asObservable()

  http: HttpClient = inject(HttpClient)

  async getAllFilters() {
    this.http.get<FiltersResponse[]>(`${environment.URL_API}/filters`)
      .subscribe({
        next: (res) => {
          this.filtersSubject.next(res)
          console.log(res);
        },
        error: (error) => {
          console.log(error);
        },
        complete() {
          
        },
      })
  }

}
