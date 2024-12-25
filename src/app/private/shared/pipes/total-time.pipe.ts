import { Pipe, PipeTransform } from '@angular/core';
import { calculateTotalTime, formatTime, nineHoursInMilliseconds } from '../time';
import { ItemAttendance } from '../../../shared/interfaces/item-attendance';

@Pipe({
  name: 'totalTime'
})
export class TotalTimePipe implements PipeTransform {
  transform(
    value: Array<ItemAttendance>,
    type: 'total' | 'result' = 'total',
  ): string {
    const totalTime: number = calculateTotalTime(value);

    if (type === 'result') {
      const result: number = Math.abs((nineHoursInMilliseconds * value.length) - totalTime);
      return formatTime(result);
    }

    return formatTime(totalTime);
  }
}
