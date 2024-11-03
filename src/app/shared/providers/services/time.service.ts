import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Times } from '../../interfaces/times.interface';

@Injectable({
  providedIn: 'root'
})

export class TimeService {
  #http: HttpClient = inject(HttpClient);

  addTime(time: Times, userId: string | undefined): Observable<Times > {
    return this.#http.put<Times>(`${environment.fbDbUrl}/attendance/${userId}.json`, time);
  }

  getTimes(userId: string | undefined): Observable<{ [key: string]: Times }> {
    return this.#http.get<{ [key: string]: Times }>(`${environment.fbDbUrl}/attendance/${userId}.json`);
  }
}
