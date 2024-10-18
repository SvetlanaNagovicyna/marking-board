import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const accessToken: string | null = localStorage.getItem('accessToken');

  const handleTokenExpired = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    return authService.refreshAccessToken().pipe(
      switchMap(() => {
        const newAccessToken: string = localStorage.getItem('accessToken') ?? '';
        return next(addToken(request, newAccessToken));
      }),
      catchError((error) => {
        authService.logout();
        router.navigate(['login'], {
          queryParams: {
            loginAgain: true,
          }
        })
        return throwError(() => error);
      })
    );
  };

  const addToken = (request: HttpRequest<any>, token: string): HttpRequest<any> => {
    return request.clone({
      setParams: {auth: `${token}`},
    });
  };

  if (accessToken) {
    request = addToken(request, accessToken);
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && accessToken) {
        return handleTokenExpired(request, next);
      }
      return throwError(() => error);
    })
  );
};
