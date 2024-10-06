import { ResolveFn } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';

export const UserResolver: ResolveFn<boolean> = ():Observable<boolean> => {

  const userService = inject(UserService);
  const authService = inject(AuthService);
  const themeService = inject(ThemeService);
  const userId = localStorage.getItem('userId');

  if (!userId) {
    return of(false);
  }

  return userService.getUserById(userId)
    .pipe(
      map((user) => {
        if (user) {
          userService.setUser(user);
          themeService.setTheme(user.theme);
        }
        return true;
      }),
      catchError((error: any) => {
        authService.logout();
        return throwError(error);
      })
    );
};
