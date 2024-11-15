import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeService } from '../../../shared/providers/services/time.service';
import { UserService } from '../../../shared/providers/services/user.service';
import { Times } from '../../../shared/interfaces/times.interface';
import { TimeState } from '../../../shared/enums/time-state';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../../../shared/components/info-modal/info-modal.component';
import { SuccessModalComponent } from '../../../shared/components/success-modal/success.component';

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
  dialog: MatDialog = inject(MatDialog);

  isShowInput: boolean = false;
  isLeaveModal: boolean = false;
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

  calculateTimeDifference(startTime: string, endTime: string): number {
    const startDate: number = new Date(startTime).getTime();
    const endDate: number = new Date(endTime).getTime();

    const differenceInMilliseconds: number = endDate - startDate;

    let differenceInHours: number = differenceInMilliseconds / (1000 * 60 * 60);

    if(this.currentTime.lunchTime) {
      const lunchTimeInHours: number = +this.currentTime.lunchTime / 60;
      differenceInHours += lunchTimeInHours;
    }

    return differenceInHours;
  }

  checkCameTime(): void {
    const getHours: number = new Date(this.getFullDate()).getHours();
    const getMinutes: number = new Date(this.getFullDate()).getMinutes();
    if (getHours >= 9 || getMinutes > 0) {
      this.openDialogInfo();
    }
  }

  checkTimeWorked(startTime: string, endTime: string): void {
    const differenceInHours: number = this.calculateTimeDifference(startTime, endTime);

    if(differenceInHours < 8) {
      this.isLeaveModal = true;
      this.openDialogInfo();
    }
  }

  addCameTime(): void {
    if (this.currentTime.cameTime) {
      return;
    }
    this.currentTime.cameTime = this.getFullDate();
    this.addTime(TimeState.cameTime);
    this.checkCameTime();
  }

  addLeaveTime(): void {
    if (this.currentTime.leaveTime || !this.currentTime.cameTime) {
      return;
    }
    this.currentTime.leaveTime = this.getFullDate();
    this.addTime(TimeState.leaveTime);
    this.checkTimeWorked(this.currentTime.cameTime, this.currentTime.leaveTime);
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

  addCameComment(text: string): void {
      this.currentTime.cameComment = text;
      this.addTime(TimeState.cameComment);
  }

  addLeaveComment(text: string): void {
      this.currentTime.leaveComment = text;
      this.addTime(TimeState.leaveComment);
  }

  openDialogInfo(): void {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      data: { modal: this.isLeaveModal ? 'isLeaveModal' : '' },
      panelClass: 'dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if (this.isLeaveModal) {
          this.addLeaveComment(result);
        } else {
          this.addCameComment(result);
        }
        this.openDialogSuccess();
      }
    })
  }

  openDialogSuccess(): void {
    this.dialog.open(SuccessModalComponent, {
      panelClass: 'dialog',
      disableClose: true,
    });
  }

  getFullDate(): string {
    return new Date().toISOString();
  }
}
