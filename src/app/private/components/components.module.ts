import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeComponent } from './time/time.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReasonModalComponent } from './reason-modal/reason-modal.component';
import { InfoModalComponent } from './info-modal/info-modal.component';

@NgModule({
  declarations: [
    TimeComponent,
    ReasonModalComponent,
    InfoModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TimeComponent,
    ReasonModalComponent,
    InfoModalComponent,
  ]
})

export class ComponentsModule { }
