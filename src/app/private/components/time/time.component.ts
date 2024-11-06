import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeService } from '../../../shared/providers/services/time.service';
import { UserService } from '../../../shared/providers/services/user.service';
import { Times } from '../../../shared/interfaces/times.interface';
import { TimeState } from '../../../shared/enums/time-state';

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

  ngOnInit(): void {
    this.loadCurrentTimeData();
  }

  private loadCurrentTimeData(): void {
    this.timeService.getTime(this.userService.user?.id, this.currentDate).subscribe({
      next: (res: Times): void => {
        this.currentTime = res || {};
      }
    })
  }

  toggleLunchInput(): void {
    if (this.currentTime.lunchTime || !this.currentTime.cameTime) {
      return;
    }

    if (this.isShowInput) {
      this.addLunchTime();
    }

    this.isShowInput = !this.isShowInput;
  }

  generateTimesData(type: TimeState): Times {
    this.currentTime = {
      ...this.currentTime,
      [type]: this.currentTime[type]
    };

    return this.currentTime;
  }

  addTime(type: TimeState): void {
    const timeData: Times = this.generateTimesData(type);
    this.timeService.addTime(timeData, this.userService.user?.id, this.currentDate).subscribe({
      next: (): void => {
        if (type === TimeState.lunchTime) {
          this.form.reset();
        }
      }
    });
  }

  addCameTime(): void {
    if (this.currentTime.cameTime) {
      return;
    }
    this.currentTime.cameTime = this.getFullDate();
    this.addTime(TimeState.cameTime);
  }

  addLeaveTime(): void {
    if (this.currentTime.leaveTime || !this.currentTime.cameTime) {
      return;
    }
    this.currentTime.leaveTime = this.getFullDate();
    this.addTime(TimeState.leaveTime);
  }

  addLunchTime(): void {
    this.currentTime.lunchTime = String(this.form.value.time) ?? '';
    if (this.form.valid) {
      this.addTime(TimeState.lunchTime);
    }
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
