import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

import {HeaderComponent} from "./components/header/header.component";
import {BackgroundComponent} from "./components/background/background.component";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { EditFormComponent } from './components/edit-popup/edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    BackgroundComponent,
    ThemeToggleComponent,
    EditFormComponent,
  ],
    imports: [
        HttpClientModule,
        CommonModule,
        RouterLink,
        ReactiveFormsModule,
    ],
  exports: [
    HttpClientModule,
    HeaderComponent,
    BackgroundComponent,
  ],
})

export class SharedModule {}
