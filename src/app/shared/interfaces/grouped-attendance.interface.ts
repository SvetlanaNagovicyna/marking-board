import { Attendance } from './attendance.interface';

export interface GroupedAttendance {
  [month: string]: Attendance,
}
