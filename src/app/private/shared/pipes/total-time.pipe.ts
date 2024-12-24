import { Pipe, PipeTransform } from '@angular/core';
import { Times } from '../../../shared/interfaces/times.interface';
import { totalTimeFn } from '../time';

@Pipe({
  name: 'totalTime'
})
export class TotalTimePipe implements PipeTransform {
  transform(
    value: Array<{ day: string, value: Times }>,
    type: string = 'total',
  ): string {
    const totalMillisecondsPerDay: number = 9 * 60 * 60 * 1000;
    const totalTime: number = totalTimeFn(value);

    if (type === 'result') {
      const result: number = Math.abs((totalMillisecondsPerDay * value.length) - totalTime);
      return this.formatTime(result);
    }

    return this.formatTime(totalTime);
  }

  private formatTime(durationMs: number): string {
    const seconds: number = Math.floor(durationMs / 1000);
    const hours: number = Math.floor(seconds / 3600);
    const minutes: number = Math.floor((seconds % 3600) / 60);

    // if (minutes === 60 || minutes === 59) {
    //   return `${this.padZero(hours + 1)}:00`;
    // }

    return `${this.padZero(hours)}:${this.padZero(minutes)}`;
  }

  private padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
