import { ItemAttendance } from '../../shared/interfaces/item-attendance';

export const calculateTimeDifference = (startTime: string, endTime: string, lunchTime?: string): number => {
  const startDate: number = new Date(new Date(startTime).setSeconds(0, 0)).getTime();
  const endDate: number = new Date(new Date(endTime).setSeconds(0, 0)).getTime();

  let differenceInMilliseconds: number = Math.abs(endDate - startDate);

  if (lunchTime) {
    const lunchTimeInHours: number = +lunchTime * 60 * 1000;
    differenceInMilliseconds += lunchTimeInHours;
  }

  return differenceInMilliseconds;
}

export const calculateTotalTime = (value: Array<ItemAttendance>): number => {
  return value.reduce((sum: number, item: ItemAttendance) => {
    const timeDifferenceOfDay: number = calculateTimeDifference(
      item.value.cameTime,
      item.value.leaveTime,
      item.value.lunchTime);
    const safeTimeDifference: number = isNaN(timeDifferenceOfDay) ? 0 : timeDifferenceOfDay;
    return sum + safeTimeDifference;
  }, 0);
}

export const formatTime = (durationMs: number): string => {
  const hours: number = Math.floor(durationMs / 3600000);
  const minutes: number = Math.floor((durationMs % 3600000) / 60000);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export const nineHoursInMilliseconds: number = 9 * 60 * 60 * 1000;
