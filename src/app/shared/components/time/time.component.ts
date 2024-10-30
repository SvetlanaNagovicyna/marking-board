import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeService } from '../../providers/services/time.service';
import { UserService } from '../../providers/services/user.service';
import { TimesData } from '../../interfaces/times-data.interface';
import { AuthService } from '../../providers/services/auth.service';
import { Times } from '../../interfaces/times.interface';
import { Time } from '../../types/time.type';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})

export class TimeComponent {
  form = new FormGroup({
    time: new FormControl('', [
      Validators.max(60)
    ])
  })

  timeService: TimeService = inject(TimeService);
  userService: UserService = inject(UserService);
  authService: AuthService = inject(AuthService);

  isShowInput: boolean = false;
  clickCount: number = 0;
  cameTime: string = '';
  leaveTime: string = '';
  lunchTime: string = '';
  currentDate: string = '';
  existingTimes: Times | undefined;
  times: { [key: string]: Times } = {};

  submit(): void {
    if (this.form.valid) {
      this.lunchTime = String(this.form.value.time) ?? '';
      this.addLunchTime();
      this.resetForm();
    }
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getCurrentDate(): string {
    const year: number =  new Date().getFullYear();
    const month: string = String(new Date().getMonth() + 1).padStart(2, '0');
    const day: string = String(new Date().getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  handleClick(): void {
    this.clickCount++;

    if (this.clickCount === 1) {
      this.isShowInput = true;
    } else if (this.clickCount === 2) {
      this.submit();
      this.clickCount = 0;
    }
  }

  private resetForm(): void {
    this.form.reset();
    this.isShowInput = false;
  }

  generateTimesData(type: Time): TimesData {
    this.existingTimes = this.times[this.currentDate] || {};
    if (type === 'cameTime') {
      this.existingTimes.cameTime = this.cameTime;
    } else if (type === 'leaveTime') {
      this.existingTimes.leaveTime = this.leaveTime;
    } else if (type === 'lunchTime') {
      this.existingTimes.lunchTime = this.lunchTime;
    }

    this.times[this.currentDate] = this.existingTimes;

    return {
      idDb: this.userService.user$.value?.idDb ?? "",
      times: this.times,
    };
  }

  addTime(type: Time):void {
    const token: string | null = this.authService.token;
    this.currentDate = this.getCurrentDate();

    this.timeService.getTimesFromDb(token).subscribe({
      next: (times: { [key: string]: Times }): void => {
        this.times = times;
        const timeData: TimesData = this.generateTimesData(type);
        this.timeService.addTimeToDb(timeData, token).subscribe();
      }
    });
  }

  addCameTime(): void {
    this.cameTime = this.getCurrentTime();
    this.addTime('cameTime');
  }

  addLeaveTime(): void {
    this.leaveTime = this.getCurrentTime();
    this.addTime('leaveTime');
  }
  addLunchTime(): void {
    this.addTime('lunchTime');
  }

  continueWork(): void {
    this.leaveTime = '';
    this.addTime('lunchTime');
  }
}
