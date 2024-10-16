import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, mergeMap, Observable, Subject, tap, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AuthResponse } from "../../interfaces/auth-response.interface";
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { UserRequest } from '../../interfaces/user-request.interface';
import { Theme } from '../../types/theme.type';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  #http: HttpClient = inject(HttpClient);
  #router: Router = inject(Router);
  userService: UserService = inject(UserService);

  get token(): string | null {
    const expDate: number = new Date(localStorage.getItem('token-exp') ?? '').getTime();
    const rememberMe: string | null = localStorage.getItem('rememberMe');

    if (!rememberMe) {
      return null;
    }

    if (new Date().getTime() > expDate && rememberMe !== 'true') {
      this.logout();
      this.#router.navigate(['login'], {
        queryParams: {
          loginAgain: true,
        }
      });
      return null;
    }

    return localStorage.getItem('accessToken');
  }

  login(user: Omit<UserRequest, 'name'>): Observable<AuthResponse> {
    user.returnSecureToken = true;
    return this.#http.post<AuthResponse>(`${environment.url}/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap((response: AuthResponse): void => {
          this.setToken(response);
        }),
        catchError(this.handleError.bind(this))
      );
  }


  singUp(user: UserRequest): Observable<AuthResponse> {
    return this.#http.post<AuthResponse>(`${environment.url}/v1/accounts:signUp?key=${environment.apiKey}`, user)
      .pipe(
        mergeMap((res: AuthResponse) => {
          const newUser = {
            name: user.name,
            email: user.email,
            idDb: res.localId,
            hasPerm: false,
            theme: 'dark' as Theme,
          }
          return this.userService.addUser(newUser)
            .pipe(
              map(() => {
                return res;
              })
            )
        }),
        catchError(this.handleError.bind(this))
      );
  }

  refreshAccessToken(): Observable<AuthResponse> {
    const refreshToken: string | null = localStorage.getItem('refreshToken');

    return this.#http.post<AuthResponse>(`${environment.fbDbUrl}/v1/token?key=${environment.apiKey}`, {refreshToken}).pipe(
      tap((response: AuthResponse): void => {
        localStorage.setItem('accessToken', response.idToken);
      }),
      catchError((error) => {
        this.logout();
        this.#router.navigate(['login'], {
          queryParams: {
            loginAgain: true,
          }
        });
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.setToken(null);
    localStorage.clear();
    this.userService.clearUser();
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const {message} = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Invalid email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found');
        break;
      case 'EMAIL_EXISTS':
        this.error$.next('Email already exists');
        break;
    }
    return throwError(() => error);
  }

  private setToken(response: AuthResponse | null): void {
    if (response) {
      const expDate: Date = new Date(new Date().getTime() + (+response.expiresIn) * 1000);
      localStorage.setItem('accessToken', response.idToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('token-exp', expDate.toString());
      localStorage.setItem('userId', response.localId);
    } else {
      localStorage.clear();
    }
  }
}
