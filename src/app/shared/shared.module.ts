import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { HeaderComponent } from "./components/header/header.component";
import { BackgroundComponent } from "./components/background/background.component";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

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
    MatDialogModule,
  ],
  exports: [
    HttpClientModule,
    HeaderComponent,
    BackgroundComponent,
    MatDialogModule,
    EditFormComponent,
  ],
})

export class SharedModule {}
