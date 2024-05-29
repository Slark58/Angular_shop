import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { FiltersResponse } from '../models/Response';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root' 
})
export class FiltersService {
  http: HttpClient = inject(HttpClient)
  
  private filtersSubject$ = new BehaviorSubject<FiltersResponse[]>([])

  public filters$ = this.filtersSubject$.asObservable()

  // filter = toSignal(this.filtersSubject$, {initialValue: [] as FiltersResponse[]})
  

  async getAllFilters() {
    this.http.get<FiltersResponse[]>(`${environment.URL_API}/filters`)
      .subscribe({
        next: (res) => {
          this.filtersSubject$.next(res)
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
