import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resultTime'
})
export class ResultTimePipe implements PipeTransform {

  transform(time: number | undefined , ...args: unknown[]): number | undefined {
    return this.calculateTimeDifference(time);
  }

  calculateTimeDifference(time: number | undefined ): number | undefined {
    if (!time ) {
      return;
    }
    const nineHoursInMilliseconds = 9 * 60 * 60 * 1000;
    // const startDate: number = new Date(startTime).getTime();
    // const endDate: number = new Date(endTime).getTime();
    return Math.abs(nineHoursInMilliseconds - time);
  }
  // summaryTime(dateValue: Times): number | undefined {
  //   return this.calculateTimeDifference(dateValue.cameTime, dateValue.leaveTime);
  // }

}
