import { inject, Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Users } from '../../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  #http: HttpClient = inject(HttpClient);

  getUsers(): Observable<Users[]> {
    return this.#http.get<{ [key: string]: User }>(`${environment.fbDbUrl}/users.json`).pipe(
      map((users: { [key: string]: User }) => {
        return Object.entries(users)
          .map(([key, data]: [string, User]): Users => ({id: key, data}))
      }),
    );
  }
}
