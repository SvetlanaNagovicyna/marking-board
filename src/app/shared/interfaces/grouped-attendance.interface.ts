import { Times } from './times.interface';

export interface GroupedAttendance {
  month: string,
  items: Array<{ day: string, value: Times }>
}
