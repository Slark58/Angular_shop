import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IFiltersResponse } from '../../types/filterResponse.interface';

@Injectable()
export class FiltersService {
  private readonly _http: HttpClient = inject(HttpClient);

  getFilters = () => {
    const url = environment.URL_API + '/filters';

    return this._http.get<IFiltersResponse[]>(url);
  };
}
