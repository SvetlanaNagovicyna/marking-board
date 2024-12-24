import { Pipe, PipeTransform } from '@angular/core';
import { Times } from '../../../shared/interfaces/times.interface';
import { calculateTimeDifference } from '../time';

@Pipe({
  name: 'resultTime'
})
export class ResultTimePipe implements PipeTransform {

  transform(time: Times): number {
    const nineHoursInMilliseconds: number = 9 * 60 * 60 * 1000;

    const result: number = nineHoursInMilliseconds - (calculateTimeDifference(time.cameTime, time.leaveTime, time.lunchTime) * 1000 * 60 * 60);
    if (result < 0) {
      return Math.abs(result)
    } else if (result > 0) {
      return result + 60000
    } else {
      return nineHoursInMilliseconds
    }
  }
}
