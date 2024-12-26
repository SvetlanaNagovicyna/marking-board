import { Pipe, PipeTransform } from '@angular/core';
import { calculateTotalTime, nineHoursInMilliseconds } from '../time';
import { DailyRecord } from '../../../shared/interfaces/daily-record';

@Pipe({
  name: 'statusResult'
})
export class StatusResultPipe implements PipeTransform {

  transform(time: Array<DailyRecord>, type: 'text' | 'color' = 'color'): string {
    const totalTime: number = calculateTotalTime(time);

    const total: number = nineHoursInMilliseconds * time.length;
    const result: number = (nineHoursInMilliseconds * time.length) - totalTime;
    const status: string = this.setStatusTime(total, result);

    if (type === 'text') {
      switch (status) {
        case 'red':
          return 'shortcoming';
        case 'green':
          return 'overwork';
        default:
          return '';
      }
    }
    return status;
  }

  private setStatusTime(total: number, result: number): string {
    if (total > result && result > 0) {
      return 'red';
    } else {
      return 'green'
    }
  }
}
