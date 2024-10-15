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
    const expDate: Date = new Date(localStorage.getItem('token-exp') ?? '');
    if (new Date() > expDate) {
      this.logout();
      this.#router.navigate(['login']);
      return null;
    }
    return localStorage.getItem('token');
  }

  login(user: Omit<UserRequest, 'name'>, rememberMe: boolean): Observable<AuthResponse> {
    return this.#http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap((response: AuthResponse): void => {
          this.setToken(response, rememberMe);
        }),
        catchError(this.handleError.bind(this))
      );
  }


  singUp(user: UserRequest): Observable<AuthResponse> {
    return this.#http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
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

  logout(): void {
    this.setToken(null);
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

  private setToken(response: AuthResponse | null, rememberMe: boolean = false): void {
    if (response) {
      const expDate: Date = new Date(new Date().getTime() + 3600);
      console.log(response)
      localStorage.setItem('token', response.idToken);
      localStorage.setItem('token-exp', expDate.toString());
      localStorage.setItem('userId', response.localId);
      if (rememberMe) {
        const expDate: Date = new Date(new Date().getTime() + 36000);
        localStorage.setItem('token', response.idToken);
        localStorage.setItem('token-exp', expDate.toString());
      }
    } else {
      localStorage.clear();
    }
  }
}
