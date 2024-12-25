import { Component, inject, OnInit } from '@angular/core';
import { GroupedAttendance } from '../../../shared/interfaces/grouped-attendance.interface';
import { TimeService } from '../../../shared/providers/services/time.service';
import { UserService } from '../../../shared/providers/services/user.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  timeService: TimeService = inject(TimeService);
  userService: UserService = inject(UserService);
  groupedAttendance: GroupedAttendance[] = [];
  showLoader: boolean = false;

  ngOnInit(): void {
    this.getAttendance();
  }

  getAttendance(): void {
    this.showLoader = true;

    this.timeService.getAttendance(this.userService.user?.id)
      .pipe(
        finalize((): void => {
          this.showLoader = false;
        })
      )
      .subscribe({
        next: (res: GroupedAttendance[]): void => {
          this.groupedAttendance = res;
          console.log(this.groupedAttendance, 'groupedAttendance');
        }
      })
  }
}
