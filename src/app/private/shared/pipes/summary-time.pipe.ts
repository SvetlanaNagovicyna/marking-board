import { Pipe, PipeTransform } from '@angular/core';
import { Times } from '../../../shared/interfaces/times.interface';
import { calculateTimeDifference } from '../time';

@Pipe({
  name: 'summaryTime'
})
export class SummaryTimePipe implements PipeTransform {

  transform(value: Times): number {
    return calculateTimeDifference(value.cameTime, value.leaveTime, value.lunchTime) * 1000 * 60 * 60;
  }
}
