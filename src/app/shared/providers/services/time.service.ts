import { DestroyRef, inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TimesData } from '../../interfaces/times-data.interface';
import { UserService } from './user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../interfaces/user.interface';
import { Times } from '../../interfaces/times.interface';

@Injectable({
  providedIn: 'root'
})

export class TimeService {
  #http: HttpClient = inject(HttpClient);
  userService: UserService = inject(UserService);
  destroyRef: DestroyRef = inject(DestroyRef);
  user: User | null = null;

  subscribeToUser(): void {
    this.userService.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user: User | null): void => {
          this.user = user;
        }
      })
  }

  addTimeToDb(time: TimesData, token: string | null): Observable<TimesData> {
    this.subscribeToUser();
    return this.#http.put<TimesData>(`${environment.fbDbUrl}/attendance/${this.user?.id}.json?auth=${token}`, time);
  }

  getTimesFromDb(token: string | null): Observable<{ [key: string]: Times }> {
    this.subscribeToUser();
    return this.#http.get<TimesData>(
      `${environment.fbDbUrl}/attendance/${this.user?.id}.json?auth=${token}`
    ).pipe(
      map((response: TimesData) => {
        if (response) {
          return response.times || {}
        } else {
          return {};
        }
      }),
      catchError(() => {
        return of({});
      })
    );
  }
}
