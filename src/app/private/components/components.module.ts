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
import { TabsComponent } from './tabs/tabs.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchComponent } from './search/search.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    ReasonModalComponent,
    InfoModalComponent,
    TimeComponent,
    TableComponent,
    TabsComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PrivateSharedModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatCheckboxModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    ReasonModalComponent,
    InfoModalComponent,
    TimeComponent,
    TableComponent,
    TabsComponent,
    SearchComponent,
  ]
})

export class ComponentsModule { }
