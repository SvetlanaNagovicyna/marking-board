import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeService } from '../../../shared/providers/services/time.service';
import { UserService } from '../../../shared/providers/services/user.service';
import { Times } from '../../../shared/interfaces/times.interface';
import { TimeState } from '../../../shared/enums/time-state';
import { MatDialog } from '@angular/material/dialog';
import { ReasonModalComponent } from '../reason-modal/reason-modal.component';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { DatePipe } from '@angular/common';
import { ReasonModalData } from '../../../shared/interfaces/reason-modal-data.interface';
import { calculateTimeDifference } from '../../shared/time';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})

export class TimeComponent implements OnInit {
  form = new FormGroup({
    time: new FormControl('', [
      Validators.max(60),
      Validators.required,
    ])
  })

  @Output() attendanceChanged = new EventEmitter<void>();

  timeService: TimeService = inject(TimeService);
  userService: UserService = inject(UserService);
  dialog: MatDialog = inject(MatDialog);
  datePipe: DatePipe = inject(DatePipe);

  isShowInput: boolean = false;
  currentTime: Times = {} as Times;
  currentDate: string = this.getCurrentDate();

  modalTexts = {
    came: {
      title: 'Lateness',
      subtitle: 'You have no excuse. But you can try, write:'
    },
    leave: {
      title: `You're too early`,
      subtitle: `WHERE ARE YOU GOING SO EARLY? There's still time to work and work...`
    },
  };

  ngOnInit(): void {
    this.loadCurrentTimeData();
  }

  getCurrentDate(): string {
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? '';
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

  addTime(cb = (): void => {}): void {
    this.timeService.addTime(this.currentTime, this.userService.user?.id, this.currentDate).subscribe({
      next: (): void => {
        this.attendanceChanged.emit();
        cb();
      }
    });
  }

  checkCameTime(): boolean {
    const getHours: number = new Date(this.getFullDate()).getHours();
    const getMinutes: number = new Date(this.getFullDate()).getMinutes();

    return (getHours >= 9 || getMinutes > 0);
  }

  checkWorkedTime(startTime: string, endTime: string): boolean {
    const differenceInHours: number = calculateTimeDifference(startTime, endTime, this.currentTime.lunchTime);

    return differenceInHours < 9;
  }

  addCameTime(): void {
    if (this.currentTime.cameTime) {
      return;
    }
    if (this.checkCameTime()) {
      this.openReasonModal(
        { commentType: TimeState.cameComment, timeType: TimeState.cameTime },
        this.modalTexts.came);
    } else {
      this.addTime();
    }
  }

  addLeaveTime(): void {
    if (this.currentTime.leaveTime || !this.currentTime.cameTime) {
      return;
    }
    this.currentTime.leaveTime = this.getFullDate();

    if (this.checkWorkedTime(this.currentTime.cameTime, this.currentTime.leaveTime)) {
      this.openReasonModal(
        { commentType: TimeState.leaveComment, timeType: TimeState.leaveTime },
        this.modalTexts.leave);
    } else {
      this.addTime();
    }
  }

  addLunchTime(): void {
    this.currentTime.lunchTime = String(this.form.value.time);

    if (this.form.valid) {
      this.addTime(() => this.form.reset());
    }
  }

  continueWork(): void {
    if (!this.currentTime.leaveTime) {
      return;
    }
    this.currentTime.leaveTime = '';
    this.addTime();
  }

  openReasonModal(type: { commentType: TimeState, timeType: TimeState }, data: ReasonModalData): void {
    const dialogRef = this.dialog.open(ReasonModalComponent, {
      data: { text: data },
      panelClass: 'dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.currentTime[type.commentType] = result;
        this.currentTime[type.timeType] = this.getFullDate();
        this.addTime(this.openInfoModal.bind(this));
      }
    })
  }

  openInfoModal(): void {
    this.dialog.open(InfoModalComponent, {
      panelClass: 'dialog',
      disableClose: true,
    });
  }

  getFullDate(): string {
    return new Date().toISOString();
  }
}
