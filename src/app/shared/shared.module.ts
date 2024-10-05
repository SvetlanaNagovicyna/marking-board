import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

import {HeaderComponent} from "./components/header/header.component";
import {BackgroundComponent} from "./components/background/background.component";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BackgroundComponent,
    ThemeToggleComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterLink,
  ],
  exports: [
    HttpClientModule,
    HeaderComponent,
    BackgroundComponent,
  ],
})

export class SharedModule {}
