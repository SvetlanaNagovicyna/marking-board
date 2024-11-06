import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PrivateComponent } from "./private.component";
import { PrivateRoutingModule } from "./private-routing.module";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PrivateComponent],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
  ]
})

export class PrivateModule {
}
