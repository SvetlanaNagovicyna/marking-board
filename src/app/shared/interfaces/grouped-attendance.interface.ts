import { DailyRecord } from './daily-record';

export interface GroupedAttendance {
  month: string,
  items: Array<DailyRecord>
}
