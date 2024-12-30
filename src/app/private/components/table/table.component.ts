import { Component, Input } from '@angular/core';
import { DailyRecord } from '../../../shared/interfaces/daily-record';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent {
  @Input() monthRecord: DailyRecord[] = [];

  columnsToDisplayHeader: string[] = ['date', 'came', 'leave', 'summary', 'result'];
  columnsToDisplayFooter: string[] = ['work', 'total', 'resultFooter'];
}
