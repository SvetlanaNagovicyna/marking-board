import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeService } from '../../../shared/providers/services/time.service';
import { UserService } from '../../../shared/providers/services/user.service';
import { Times } from '../../../shared/interfaces/times.interface';
import { TimesData } from '../../../shared/interfaces/times-data.interface';
import { TimeState } from '../../../shared/enums/time-state';
import { finalize } from 'rxjs';

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
  currentDate: string = this.getFullDate().split('T')[0];
  times: { [key: string]: Times } = {};

  ngOnInit(): void {
    this.loadCurrentTimeData();
  }

  private loadCurrentTimeData(): void {
    this.timeService.getTimes(this.userService.user?.id).subscribe({
      next: (res: TimesData): void => {
        this.times = res || {};
        this.currentTime = this.times[this.currentDate] || {};
      }
    })
  }

  submit(): void {
    if (this.form.valid) {
      this.addLunchTime();
    }
  }

  handleClick(): void {
    if (this.currentTime.lunchTime) {
      return;
    }

    if (this.isShowInput) {
      this.submit();
    }

    this.isShowInput = !this.isShowInput;
  }

  generateTimesData(type: TimeState): TimesData {
    this.times[this.currentDate] = {
      ...this.times[this.currentDate],
      [type]: this.currentTime[type]
    };

    return this.times;
  }

  addTime(type: TimeState): void {
    const timeData: Times = this.generateTimesData(type);
    this.timeService.addTime(timeData, this.userService.user?.id)
      .pipe(
        finalize((): void => {
          this.form.reset();
        })
      )
      .subscribe();
  }

  addCameTime(): void {
    if (this.currentTime.cameTime) {
      return;
    }
    this.currentTime.cameTime = this.getFullDate();
    this.addTime(TimeState.cameTime);
  }

  addLeaveTime(): void {
    if (this.currentTime.leaveTime) {
      return;
    }
    this.currentTime.leaveTime = this.getFullDate();
    this.addTime(TimeState.leaveTime);
  }

  addLunchTime(): void {
    this.currentTime.lunchTime = String(this.form.value.time) ?? '';
    this.addTime(TimeState.lunchTime);
  }

  continueWork(): void {
    if (!this.currentTime.leaveTime) {
      return;
    }
    this.currentTime.leaveTime = '';
    this.addTime(TimeState.leaveTime);
  }

  getFullDate(): string {
    return new Date().toISOString();
  }
}
