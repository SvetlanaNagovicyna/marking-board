import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Times } from '../../interfaces/times.interface';
import { Attendance } from '../../interfaces/attendance.interface';
import { DatePipe } from '@angular/common';
import { GroupedAttendance } from '../../interfaces/grouped-attendance.interface';
import { DailyRecord } from '../../interfaces/daily-record';

@Injectable({
  providedIn: 'root'
})

export class TimeService {
  #http: HttpClient = inject(HttpClient);
  datePipe: DatePipe = inject(DatePipe);

  addTime(time: Times, userId: string | undefined, date: string): Observable<Times> {
    return this.#http.put<Times>(`${environment.fbDbUrl}/attendance/${userId}/${date}.json`, time);
  }

  getTime(userId: string | undefined, date: string): Observable<Times> {
    return this.#http.get<Times>(`${environment.fbDbUrl}/attendance/${userId}/${date}.json`);
  }

  getAttendance(userId: string | undefined): Observable<GroupedAttendance[]> {
    return this.#http.get<Attendance>(`${environment.fbDbUrl}/attendance/${userId}.json`).pipe(
      map((attendance: Attendance) => {
        const attendanceArray: DailyRecord[] = Object.entries(attendance)
          .map(([key, value]: [string, Times]): DailyRecord => ({ day: key, value }))
          .sort((a: DailyRecord, b: DailyRecord): number => (a.day < b.day ? 1 : -1));
        return this.groupAttendanceByMonth(attendanceArray);
        }),
    );
  }

   private groupAttendanceByMonth(attendanceArray: DailyRecord[]): GroupedAttendance[] {
    return attendanceArray.reduce((acc: GroupedAttendance[], item: DailyRecord) => {
      const month = this.datePipe.transform(new Date(item.day), 'yyyy-MM') ?? '';
      let group: GroupedAttendance | undefined = acc.find((g: GroupedAttendance) => g.month === month);
      if (!group) {
        group = { month, items: [] };
        acc.push(group);
      }
      group.items.push(item);
      return acc;
    }, [] as GroupedAttendance[]);
  }
}
