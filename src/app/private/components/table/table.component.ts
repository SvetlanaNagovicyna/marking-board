import { Component, inject, OnInit } from '@angular/core';
import { TimeService } from '../../../shared/providers/services/time.service';
import { UserService } from '../../../shared/providers/services/user.service';
import { GroupedAttendance } from '../../../shared/interfaces/grouped-attendance.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  timeService: TimeService = inject(TimeService);
  userService: UserService = inject(UserService);
  groupedAttendance: GroupedAttendance[] = [];
  columnsToDisplayHeader: string[] = ['date', 'came', 'leave', 'summary', 'result'];
  columnsToDisplayFooter: string[] = ['work', 'total', 'resultFooter'];

  ngOnInit(): void {
    this.getAttendance();
  }

  getAttendance(): void {
    this.timeService.getAttendance(this.userService.user?.id).subscribe({
      next: (res: GroupedAttendance[]): void => {
        this.groupedAttendance = res;
        console.log(this.groupedAttendance, 'groupedAttendance');
      }
    })
  }

}
