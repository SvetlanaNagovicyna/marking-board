import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user.interface';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  #http: HttpClient = inject(HttpClient);

  user: User = {} as User;
  user$: BehaviorSubject<User | null> = new BehaviorSubject<null | User>(null);

  getUserById(id: string): Observable<User> {
    return this.#http.get<{ [key: string]: User }>(`${environment.fbDbUrl}/users.json`)
      .pipe(map((response: { [key: string]: User }) => {
        return Object
          .keys(response)
          .map((key: string) => ({
            ...response[key],
            id: key
          })).filter(item => item.idDb === id)[0];
      }));
  }

  setUser(user: User): void {
    this.user$.next(user);
    this.user = user;
  }

  addUser(user: Omit<User, 'id'>): Observable<User> {
    return this.#http.post<User>(`${environment.fbDbUrl}/users.json`, user);
  }

  updateUserData(data: Partial<User>): Observable<void> {
    return this.#http.patch<void>(`${environment.fbDbUrl}/users/${this.user?.id}.json`, data)
      .pipe(tap((): void => {
        const updatedUser = {...this.user, ...data};
        this.setUser(updatedUser);
      }));
  }
}
