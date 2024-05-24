import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../../interfaces/user.interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  #http = inject(HttpClient);


  getUserById(id: string): Observable<User> {
    return this.#http.get<User>(`${environment.fbDbUrl}/users.json`)
      .pipe(map(res => {
        console.log(res)
        return res;
      }))
  }

}
