import { Pipe, PipeTransform } from '@angular/core';
import { Times } from '../../../shared/interfaces/times.interface';
import { calculateTimeDifference, formatTime, nineHoursInMilliseconds } from '../time';

@Pipe({
  name: 'resultTime'
})
export class ResultTimePipe implements PipeTransform {
  transform(time: Times): string {
    return formatTime(Math.abs(nineHoursInMilliseconds - (calculateTimeDifference(time.cameTime, time.leaveTime, time.lunchTime))));
  }
}
