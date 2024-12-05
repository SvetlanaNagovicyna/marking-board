import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeComponent } from './time/time.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReasonModalComponent } from './reason-modal/reason-modal.component';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    ReasonModalComponent,
    InfoModalComponent,
    TimeComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReasonModalComponent,
    InfoModalComponent,
    TimeComponent,
    TableComponent,
  ]
})

export class ComponentsModule { }
