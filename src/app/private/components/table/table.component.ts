import { Component, inject, OnInit } from '@angular/core';
import { TimeService } from '../../../shared/providers/services/time.service';
import { UserService } from '../../../shared/providers/services/user.service';
import { Attendance } from '../../../shared/interfaces/attendance.interface';
import { GroupedAttendance } from '../../../shared/interfaces/grouped-attendance.interface';
import { Times } from '../../../shared/interfaces/times.interface';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  timeService: TimeService = inject(TimeService);
  userService: UserService = inject(UserService);
  userAttendance: Attendance = {};
  groupedAttendance: GroupedAttendance = {};

  reverseOrderDate = (a: KeyValue<string, Attendance>, b: KeyValue<string, Attendance>): number => {
    return a.key < b.key ? 1 : -1;
  };

  reverseOrder = (a: KeyValue<string, Times>, b: KeyValue<string, Times>): number => {
    return a.key < b.key ? 1 : -1;
  };

  ngOnInit(): void {
    this.timeService.timeUpdated$.subscribe((): void => {
      this.getAttendance();
    });
  }

  getAttendance(): void {
    this.timeService.getAttendance(this.userService.user?.id).subscribe({
      next: (res: Attendance): void => {
        this.userAttendance = res || {};
        console.log(this.userAttendance);
        this.groupAttendanceByMonth();
      }
    })
  }

  groupAttendanceByMonth(): void {
    this.groupedAttendance = Object.entries(this.userAttendance)
      .reduce((acc: GroupedAttendance, [date, data]: [string, Times]) => {
        const month: string = date.slice(0, 7);
      if (!acc[month]) {
        acc[month] = {};
      }
      acc[month][date] = data;
      return acc;
    }, {} as GroupedAttendance);
  }

  protected readonly Object = Object;
}
