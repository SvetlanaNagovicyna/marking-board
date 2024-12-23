import { ResolveFn } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { User } from '../../interfaces/user.interface';
import { LoaderService } from '../services/loader.service';

export const UserResolver: ResolveFn<boolean> = ():Observable<boolean> => {
  const userService: UserService = inject(UserService);
  const authService: AuthService = inject(AuthService);
  const themeService: ThemeService = inject(ThemeService);
  const loaderService: LoaderService = inject(LoaderService)

  return userService.getUser()
    .pipe(
      map((user: User | null): boolean => {
        if (user) {
          loaderService.hideLoader();
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
