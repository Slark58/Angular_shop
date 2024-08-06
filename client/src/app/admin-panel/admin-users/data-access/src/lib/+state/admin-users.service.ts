import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../../../../../shared/types/user.interface';
import { environment } from '../../../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CountAndRows } from '../../../../../../shared/types/countAndRows.interface';

@Injectable({ providedIn: 'root' })
export class AdminUsersService {
  private readonly _http: HttpClient = inject(HttpClient);

  getUsers(): Observable<CountAndRows<IUser[]>> {
    console.log('call getUsers');

    return this._http.get<CountAndRows<IUser[]>>(
      `${environment.URL_API}/admin/users`
    );
  }
}
