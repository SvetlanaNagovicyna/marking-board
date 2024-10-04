import { ResolveFn } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const UserResolver: ResolveFn<boolean> = ():Observable<boolean> => {

  const userService = inject(UserService);
  const authService = inject(AuthService);

  const userId = localStorage.getItem('userId');

  if (!userId) {
    return of(false);
  }

  return userService.getUserById(userId)
    .pipe(
      map((user) => {
        if (user){
          userService.setUser(user)
        }
        return true;
      }),
      catchError((error: any) => {
        authService.logout();
        return throwError(error);
      })
    );
};
