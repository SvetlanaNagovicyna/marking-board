import { Component, Input } from '@angular/core';
import { GroupedAttendance } from '../../../shared/interfaces/grouped-attendance.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent {
  @Input() groupedAttendance: GroupedAttendance[] = [];
  @Input() showLoader: boolean = false;

  columnsToDisplayHeader: string[] = ['date', 'came', 'leave', 'summary', 'result'];
  columnsToDisplayFooter: string[] = ['work', 'total', 'resultFooter'];
}
