import { Pipe, PipeTransform } from '@angular/core';
import { Times } from '../../../shared/interfaces/times.interface';

@Pipe({
  name: 'summaryTime'
})
export class SummaryTimePipe implements PipeTransform {

  transform(value: Times, ...args: unknown[]): number | undefined {
    return this.summaryTime(value);
  }
  private calculateTimeDifference(startTime: string | undefined, endTime: string | undefined): number | undefined {
    if (!startTime || !endTime) {
      return;
    }
    const startDate: number = new Date(startTime).getTime();
    const endDate: number = new Date(endTime).getTime();
    return Math.abs(endDate - startDate);
  }
  private summaryTime(dateValue: Times): number | undefined {
    return this.calculateTimeDifference(dateValue.cameTime, dateValue.leaveTime);
  }
}
