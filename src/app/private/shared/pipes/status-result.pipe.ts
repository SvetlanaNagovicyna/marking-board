import { Pipe, PipeTransform } from '@angular/core';
import { Times } from '../../../shared/interfaces/times.interface';
import { totalTimeFn } from '../time';

@Pipe({
  name: 'statusResult'
})
export class StatusResultPipe implements PipeTransform {

  transform(time: Array<{ day: string, value: Times }>, type: string = 'color'): string {
    const totalMillisecondsPerDay: number = 9 * 60 * 60 * 1000;
    const totalTime: number = totalTimeFn(time);

    const total: number = totalMillisecondsPerDay * time.length;
    const result: number = (totalMillisecondsPerDay * time.length) - totalTime;
    const status: string = this.setStatusTime(total, result);

    if (type === 'text') {
      switch(status) {
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
