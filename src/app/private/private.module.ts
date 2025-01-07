import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { PrivateComponent } from "./private.component";
import { PrivateRoutingModule } from "./private-routing.module";
import { SharedModule } from '../shared/shared.module';
import { PrivateSharedModule } from './shared/private-shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [PrivateComponent],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    PrivateSharedModule,
    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    DatePipe,
  ]
})

export class PrivateModule {
}
