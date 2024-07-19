import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../../../../../shared/types/user.interface';
import { environment } from '../../../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdminUsersService {
  private readonly _http: HttpClient = inject(HttpClient);

  getUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(`${environment.URL_API}/products`);
  }
}
