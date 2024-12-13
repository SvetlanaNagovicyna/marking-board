import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusTime'
})

export class StatusTimePipe implements PipeTransform {

  transform(time: number | undefined, type: string = 'color'): string {
    const status = this.setStatusTime(time);

    if (type === 'text') {
      switch (status) {
        case 'white':
          return 'p–p–p–perfect:';
        case 'red':
          return 'Shortcoming:';
        case 'green':
          return 'Overwork:';
        default:
          return '';
      }
    }

    return status;
  }

  private setStatusTime(time: number | undefined): string {
    if (!time) {
      return '';
    }
    const hours: number = new Date(time).getUTCHours();
    const minutes: number = new Date(time).getUTCMinutes();

    if (hours === 9 && minutes === 0) {
      return 'white';
    }
    return hours < 9 ? 'red' : 'green';
  }

}
