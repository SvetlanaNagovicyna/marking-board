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

