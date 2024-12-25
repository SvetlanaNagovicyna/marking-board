import { Pipe, PipeTransform } from '@angular/core';
import { calculateTimeDifference, nineHoursInMilliseconds } from '../time';
import { Times } from '../../../shared/interfaces/times.interface';

@Pipe({
  name: 'statusTime'
})

export class StatusTimePipe implements PipeTransform {
  transform(time: Times, type: 'text' | 'color' = 'color'): string {
    const status: string = this.setStatusTime(calculateTimeDifference(time.cameTime, time.leaveTime, time.lunchTime));

    if (type === 'text') {
      switch (status) {
        case 'white':
          return 'p–p–p–perfect:';
        case 'red':
          return 'Shortcoming:';
        case 'green':
          return 'Overwork:';
        default:
          return '';
      }
    }

    return status;
  }

  private setStatusTime(time: number): string {
    if (isNaN(time)) {
      return '';
    }
    if (time === nineHoursInMilliseconds) {
      return 'white';
    }
    return time < nineHoursInMilliseconds ? 'red' : 'green';
  }
}
