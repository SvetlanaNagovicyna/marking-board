import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeComponent } from './time/time.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReasonModalComponent } from './reason-modal/reason-modal.component';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { PrivateSharedModule } from '../shared/private-shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatCheckboxModule,
    PrivateSharedModule,
  ],
  exports: [
    ReasonModalComponent,
    InfoModalComponent,
    TimeComponent,
    TableComponent,
  ]
})

export class ComponentsModule { }
