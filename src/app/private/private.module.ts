import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { PrivateComponent } from "./private.component";
import { PrivateRoutingModule } from "./private-routing.module";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PrivateComponent],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
  ],
  providers: [
    DatePipe,
  ]
})

export class PrivateModule {
}
