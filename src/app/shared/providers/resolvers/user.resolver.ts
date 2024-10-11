import { ResolveFn } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { User } from '../../interfaces/user.interface';

export const UserResolver: ResolveFn<boolean> = ():Observable<boolean> => {

  const userService: UserService = inject(UserService);
  const authService: AuthService = inject(AuthService);
  const themeService: ThemeService = inject(ThemeService);
  const userId: string | null = localStorage.getItem('userId');

  if (!userId) {
    return of(false);
  }

  return userService.getUserById(userId)
    .pipe(
      map((user: User): boolean => {
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
