import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from "./registration.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    RegistrationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})

export class RegistrationModule {
}
