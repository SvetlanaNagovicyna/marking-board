import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user.interface';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  #http: HttpClient = inject(HttpClient);

  user: User | null = null;
  user$: BehaviorSubject<User | null> = new BehaviorSubject<null | User>(null);
  loaderService: LoaderService = inject(LoaderService);

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

  setUser(user: User | null): void {
    this.user$.next(user);
    this.user = user;
  }

  clearUser(): void {
    this.user = null;
    this.user$.next(null);
    localStorage.removeItem('userId');
  }

  getUser(): Observable<User | null> {
    const userId: string | null = localStorage.getItem('userId');

    if (!userId) {
      return of(null);
    }

    if (this.user) {
      return of(this.user);
    }

    return this.getUserById(userId).pipe(
      tap((user: User): void => {
        this.loaderService.hideLoader();
        this.setUser(user);
      })
    )
  }

  addUser(user: Omit<User, 'id'>, token: string): Observable<User> {
    return this.#http.post<User>(`${environment.fbDbUrl}/users.json?auth=${token}`, user);
  }

  updateUserData<T>(data: Partial<User>): Observable<T> {
    return this.#http.patch<T>(`${environment.fbDbUrl}/users/${this.user?.id}.json`, data)
      .pipe(tap((): void => {
        const updatedUser: User = {...this.user, ...data} as User;
        this.setUser(updatedUser);
      }));
  }
}
