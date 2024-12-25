import { ItemAttendance } from './item-attendance';

export interface GroupedAttendance {
  month: string,
  items: Array<ItemAttendance>
}
