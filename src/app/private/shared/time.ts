import { Times } from '../../shared/interfaces/times.interface';

export const calculateTimeDifference = (startTime: string, endTime: string, lunchTime?: string): number => {
  const startDate: number = new Date(startTime).getTime();
  const endDate: number = new Date(endTime).getTime();

  const differenceInMilliseconds: number = Math.abs(endDate - startDate);
  let differenceInHours: number = differenceInMilliseconds / (1000 * 60 * 60);

  if (lunchTime) {
    const lunchTimeInHours: number = +lunchTime / 60;
    differenceInHours += lunchTimeInHours;
  }

  return differenceInHours;
}

export const totalTimeFn = (value: Array<{ day: string, value: Times }>): number => {
  return value.reduce((sum: number, item: { day: string; value: Times }) => {
    const timeDifferenceOfDay: number = calculateTimeDifference(
      item.value.cameTime,
      item.value.leaveTime,
      item.value.lunchTime) * 1000 * 60 * 60;
    const safeTimeDifference: number = isNaN(timeDifferenceOfDay) ? 0 : timeDifferenceOfDay;
    return sum + safeTimeDifference;
  }, 0);
}
