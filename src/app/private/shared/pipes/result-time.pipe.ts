import { Pipe, PipeTransform } from '@angular/core';
import { Times } from '../../../shared/interfaces/times.interface';
import { calculateTimeDifference } from '../time';

@Pipe({
  name: 'resultTime'
})
export class ResultTimePipe implements PipeTransform {

  transform(time: Times): number {
    const nineHoursInMilliseconds: number = 9 * 60 * 60 * 1000;
    return nineHoursInMilliseconds - (calculateTimeDifference(time.cameTime, time.leaveTime, time.lunchTime) * 1000 * 60 * 60);
  }
}
