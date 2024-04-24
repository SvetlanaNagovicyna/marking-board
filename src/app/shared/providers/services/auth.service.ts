import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";

import {User} from "../../interfaces/user.interfaces";
import {environment} from "../../../../environments/environment";
import {AuthResponseInterface} from "../../interfaces/authResponse.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  #http = inject(HttpClient);

  get token(): string | null {

    const expDate = new Date(localStorage.getItem('token-exp') ?? '');

    if (new Date() > expDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem('token');
  }

  login(user: User, isChecked: boolean): Observable<any> {
     user.returnSecureToken = true;
     return this.#http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
       .pipe(
         tap(response => this.setToken(response, isChecked)),
         catchError(this.handleError.bind(this))
       );
  }

  singUp(user: User, isChecked: boolean): Observable<any> {
    user.returnSecureToken = true;
    return this.#http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.#http.post(`${environment.fbDbUrl}/users.json`, user)),
        tap(response => this.setToken(response, isChecked)),
        catchError(this.handleError.bind(this))
      );
  }

  logout(): void {
    this.setToken(null)
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
    }

    return throwError(() => error);

  }


  private setToken(response: AuthResponseInterface | any, isChecked: boolean = false): void {   /// тут питання, мені треба щоб тип був AuthResponseInterface | null, але по типам не сходиться

    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn);
      localStorage.setItem('token', response.idToken);
      localStorage.setItem('token-exp', expDate.toString());

      if (isChecked) {
        const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
        localStorage.setItem('token', response.idToken);
        localStorage.setItem('token-exp', expDate.toString());
      }

    } else {
      localStorage.clear();
    }
  }
}
