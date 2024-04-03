import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

import {HeaderComponent} from "./components/header/header.component";
import {BackgroundComponent} from "./components/background/background.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    HeaderComponent,
    BackgroundComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
  ],
  exports: [
    HttpClientModule,
    HeaderComponent,
    BackgroundComponent,
  ],
})

export class SharedModule {}
