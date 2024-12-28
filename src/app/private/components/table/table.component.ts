import { Component, inject, Input } from '@angular/core';
import { DailyRecord } from '../../../shared/interfaces/daily-record';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent {
  iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  domSanitizer: DomSanitizer = inject(DomSanitizer);
  @Input() monthRecord: DailyRecord[] = [];

  columnsToDisplayHeader: string[] = ['date', 'came', 'leave', 'summary', 'result'];
  columnsToDisplayFooter: string[] = ['work', 'total', 'resultFooter'];

  constructor() {
    this.iconRegistry.addSvgIconSet(
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/img/icons.svg")
    );
  }

}
