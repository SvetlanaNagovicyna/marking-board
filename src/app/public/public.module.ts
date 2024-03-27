import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PublicComponent} from "./public.component";
import {PublicRoutingModule} from "./public-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
  ]
})
export class PublicModule { }
