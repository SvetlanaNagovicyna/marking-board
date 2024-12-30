import { NgModule } from "@angular/core";
import { SummaryTimePipe } from './pipes/summary-time.pipe';
import { StatusTimePipe } from './pipes/status-time.pipe';
import { ResultTimePipe } from './pipes/result-time.pipe';
import { TotalTimePipe } from './pipes/total-time.pipe';
import { StatusResultPipe } from './pipes/status-result.pipe';

@NgModule({
  declarations: [
    SummaryTimePipe,
    StatusTimePipe,
    ResultTimePipe,
    TotalTimePipe,
    StatusResultPipe,
  ],
  exports: [
    SummaryTimePipe,
    StatusTimePipe,
    ResultTimePipe,
    TotalTimePipe,
    StatusResultPipe,
  ],
})

export class PrivateSharedModule {}
