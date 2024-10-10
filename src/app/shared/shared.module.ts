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
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    HeaderComponent,
    BackgroundComponent,
    ThemeToggleComponent,
    EditFormComponent,
    LoaderComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    HttpClientModule,
    HeaderComponent,
    BackgroundComponent,
    MatDialogModule,
    EditFormComponent,
    MatProgressSpinnerModule,
    LoaderComponent,
  ],
})

export class SharedModule {}
