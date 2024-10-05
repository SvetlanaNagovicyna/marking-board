import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user.interfaces';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  isUser = false;
  user: User = {} as User;
  user$ = new BehaviorSubject<null | User>(null);


  #http = inject(HttpClient);

  getUserById(id: string): Observable<User> {
    return this.#http.get<{ [key: string]: User }>(`${environment.fbDbUrl}/users.json`)
      .pipe(map((response: { [key: string]: User }) => {
        return Object
          .keys(response)
          .map((key:string) => ({
            ...response[key],
            id: key
          })).filter(item => item.idDb === id)[0];
      }));
  }

  getAllUsers(): Observable<User[]> {
    return this.#http.get<{ [key: string]: User }>(`${environment.url}/users.json`)
      .pipe(map((response: { [key: string]: User }) => {
        return Object
          .keys(response)
          .map((key:string) => ({
            ...response[key],
            id: key
          }))
          // .map((item) => {
          //   item.forEach((date) => {
          //     date.date = Object
          //       .keys(date.date)
          //       .map(key => ({
          //         ...date.date[key],
          //       }))
          //   })
          //   return item;
          // });
      }));
  }

 setUser(user: User) {
   this.user$.next(user);
 }
}
