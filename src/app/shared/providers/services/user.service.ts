import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user.interfaces';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Theme } from '../../types/theme.type';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  #http = inject(HttpClient);

  user: User = {} as User;
  user$ = new BehaviorSubject<null | User>(null);

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

   setUser(user: User) {
     this.user$.next(user);
   }

   addUser(user: Omit<User, 'id'>): Observable<User> {
     return this.#http.post<User>(`${environment.fbDbUrl}/users.json`, user);
   }

  getUserThemeFromDb(userId: string): Observable<Theme> {
    return this.getUserById(userId).pipe(
      map(user => user?.theme ?? 'dark')
    );
  }

  updateUserTheme(theme: Theme) {
    const userId = localStorage.getItem('userId');
    if(!userId) return;
    this.getUserById(userId).subscribe({
      next: (user) => {
        const url = `${environment.fbDbUrl}/users/${user.id}.json`;
        this.#http.patch<void>(url, { theme }).subscribe();
      }
    })
  }
}
