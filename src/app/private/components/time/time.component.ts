import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeService } from '../../../shared/providers/services/time.service';
import { UserService } from '../../../shared/providers/services/user.service';
import { Times } from '../../../shared/interfaces/times.interface';
import { TimeState } from '../../../shared/enums/time-state';
import { MatDialog } from '@angular/material/dialog';
import { ReasonModalComponent } from '../reason-modal/reason-modal.component';
import { InfoModalComponent } from '../info-modal/info-modal.component';

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
  currentTime: Times = {};
  currentDate: string = this.getFullDate().split('T')[0];

  modalTexts = {
    came: {
      title: 'Lateness',
      subtitle: 'You have no excuse. But you can try, write:'
    },
    leave: {
      title: 'You\'re too early',
      subtitle: 'WHERE ARE YOU GOING SO EARLY? There\'s still time to work and work...'
    },
  };


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

  generateTimesData(type: TimeState, value: string): void {
    this.currentTime = {
      ...this.currentTime,
      [type]: value,
    };
    this.addTime(type);
  }

  addTime(type: TimeState): void {
    this.timeService.addTime(this.currentTime, this.userService.user?.id, this.currentDate).subscribe({
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
      this.openDialogInfo(
        TimeState.cameComment,
        this.modalTexts.came.title,
        this.modalTexts.came.subtitle);
    }
  }

  checkTimeWorked(startTime: string, endTime: string): void {
    const differenceInHours: number = this.calculateTimeDifference(startTime, endTime);

    if(differenceInHours < 8) {
      this.openDialogInfo(
        TimeState.leaveComment,
        this.modalTexts.leave.title,
        this.modalTexts.leave.subtitle);
    }
  }

  addCameTime(): void {
    if (this.currentTime.cameTime) {
      return;
    }
    this.generateTimesData(TimeState.cameTime, this.getFullDate());
    this.checkCameTime();
  }

  addLeaveTime(): void {
    if (this.currentTime.leaveTime || !this.currentTime.cameTime) {
      return;
    }
    this.currentTime.leaveTime = this.getFullDate();
    this.generateTimesData(TimeState.leaveTime, this.getFullDate());
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

  openDialogInfo(type: TimeState, title: string, subtitle: string): void {
    const dialogRef = this.dialog.open(ReasonModalComponent, {
      data: { title, subtitle },
      panelClass: 'dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.generateTimesData(type, result);
        this.openDialogSuccess();
      }
    })
  }

  openDialogSuccess(): void {
    this.dialog.open(InfoModalComponent, {
      panelClass: 'dialog',
      disableClose: true,
    });
  }

  getFullDate(): string {
    return new Date().toISOString();
  }
}
