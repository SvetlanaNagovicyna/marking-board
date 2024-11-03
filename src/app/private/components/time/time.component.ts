import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeService } from '../../../shared/providers/services/time.service';
import { UserService } from '../../../shared/providers/services/user.service';
import { Times } from '../../../shared/interfaces/times.interface';
import { Time } from '../../../shared/types/time.type';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})

export class TimeComponent implements OnInit {
  form = new FormGroup({
    time: new FormControl('', [
      Validators.max(60),
      Validators.required,
    ])
  })

  timeService: TimeService = inject(TimeService);
  userService: UserService = inject(UserService);

  isShowInput: boolean = false;

  currentTime: Times = {};
  currentDate: string = this.getCurrentDate();
  times: { [key: string]: Times } = {};

  ngOnInit(): void {
    this.loadCurrentTimeData();
  }

  private loadCurrentTimeData(): void {
    this.timeService.getTimes(this.userService.user?.id).subscribe({
      next: (res: { [key: string]: Times }): void => {
        this.times = res || {};
        this.currentTime = this.times[this.currentDate] || {};
      }
    })
  }

  submit(): void {
    if (this.form.valid) {
      this.addLunchTime();
      this.form.reset();
    }
  }

  handleClick(): void {
    if (this.currentTime.lunchTime) return;

    if (this.isShowInput) {
      this.submit();
    }

    this.isShowInput = !this.isShowInput;
  }

  generateTimesData(type: Time): Times {
    this.times[this.currentDate] = {
      ...this.times[this.currentDate],
      [type]: this.currentTime[type]
    };

    return this.times;
  }

  addTime(type: Time): void {
    const timeData: Times = this.generateTimesData(type);
    this.timeService.addTime(timeData, this.userService.user?.id).subscribe();
  }

  addCameTime(): void {
    if (this.currentTime.cameTime) return;
    this.currentTime.cameTime = this.getCurrentTime();
    this.addTime('cameTime');
  }

  addLeaveTime(): void {
    if (this.currentTime.leaveTime) return;
    this.currentTime.leaveTime = this.getCurrentTime();
    this.addTime('leaveTime');
  }

  addLunchTime(): void {
    this.currentTime.lunchTime = String(this.form.value.time) ?? '';
    this.addTime('lunchTime');
  }

  continueWork(): void {
    if (!this.currentTime.leaveTime) return;
    this.currentTime.leaveTime = '';
    this.addTime('leaveTime');
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  }

  getCurrentDate(): string {
    const year: number = new Date().getFullYear();
    const month: string = String(new Date().getMonth() + 1).padStart(2, '0');
    const day: string = String(new Date().getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
