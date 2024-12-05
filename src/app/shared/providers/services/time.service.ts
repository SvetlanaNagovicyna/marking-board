import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Times } from '../../interfaces/times.interface';
import { Attendance } from '../../interfaces/attendance.interface';

@Injectable({
  providedIn: 'root'
})

export class TimeService {
  #http: HttpClient = inject(HttpClient);
  timeUpdated$: BehaviorSubject<Attendance | null> = new BehaviorSubject<null | Attendance>(null);

  addTime(time: Times, userId: string | undefined, date: string): Observable<Times> {
    return this.#http.put<Times>(`${environment.fbDbUrl}/attendance/${userId}/${date}.json`, time).pipe(
      tap((): void => {
        this.reloadAttendance(userId);
      })
    );
  }

  getTime(userId: string | undefined, date: string): Observable<Times> {
    return this.#http.get<Times>(`${environment.fbDbUrl}/attendance/${userId}/${date}.json`);
  }

  getAttendance(userId: string | undefined): Observable<Attendance> {
    return this.#http.get<Attendance>(`${environment.fbDbUrl}/attendance/${userId}.json`);
  }

  private reloadAttendance(userId: string | undefined): void {
    this.getAttendance(userId).subscribe({
      next: (attendance: Attendance): void => {
        this.timeUpdated$.next(attendance);
      },
      error: (): void => {
        this.timeUpdated$.next(null);
      }
    });
  }
}
