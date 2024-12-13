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
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ButtonComponent } from './components/button/button.component';
import { SummaryTimePipe } from './pipes/summary-time.pipe';
import { StatusTimePipe } from './pipes/status-time.pipe';
import { ResultTimePipe } from './pipes/result-time.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    BackgroundComponent,
    ThemeToggleComponent,
    EditFormComponent,
    LoaderComponent,
    NotFoundComponent,
    ButtonComponent,
    SummaryTimePipe,
    StatusTimePipe,
    ResultTimePipe,
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
    ButtonComponent,
    SummaryTimePipe,
    StatusTimePipe,
    ResultTimePipe,
  ],
})

export class SharedModule {}
