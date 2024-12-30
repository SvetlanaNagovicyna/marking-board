import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './shared/providers/interceptors/auth.interceptor';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
