import { Pipe, PipeTransform } from '@angular/core';
import { Times } from '../../../shared/interfaces/times.interface';
import { calculateTimeDifference, formatTime } from '../time';

@Pipe({
  name: 'summaryTime'
})
export class SummaryTimePipe implements PipeTransform {
  transform(value: Times): string {
    return formatTime(calculateTimeDifference(value.cameTime, value.leaveTime, value.lunchTime));
  }
}
