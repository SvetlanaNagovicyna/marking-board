import { NgModule } from "@angular/core";
import { SummaryTimePipe } from './pipes/summary-time.pipe';
import { StatusTimePipe } from './pipes/status-time.pipe';
import { ResultTimePipe } from './pipes/result-time.pipe';

@NgModule({
  declarations: [
    SummaryTimePipe,
    StatusTimePipe,
    ResultTimePipe,
  ],
  exports: [
    SummaryTimePipe,
    StatusTimePipe,
    ResultTimePipe,
  ],
})

export class PrivateSharedModule {}
