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
  isShowForm$ = new BehaviorSubject<boolean>(false);
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

  getUserByIdDb(idDb: string): Observable<string> {
    return this.#http.get<{ [key: string]: User }>(`${environment.fbDbUrl}/users.json`)
      .pipe(
        map((response: { [key: string]: User }) => {
          const userKey = Object.keys(response).find(key => response[key].idDb === idDb);
          if (!userKey) {
            throw new Error('User not found');
          }
          return userKey;
        })
      );
  }

  // getAllUsers(): Observable<User[]> {
  //   return this.#http.get<{ [key: string]: User }>(`${environment.url}/users.json`)
  //     .pipe(map((response: { [key: string]: User }) => {
  //       return Object
  //         .keys(response)
  //         .map((key:string) => ({
  //           ...response[key],
  //           id: key
  //         }))
  //     }));
  // }

   setUser(user: User) {
     this.user$.next(user);
   }

  setShowForm(value: boolean) {
    this.isShowForm$.next(value);
  }

  updateUserInfo(userId: string, updatedUser: User) {
    this.setUser(updatedUser);
    return this.#http.patch(`${environment.fbDbUrl}/users/${userId}.json`, updatedUser);
  }

}
