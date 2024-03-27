import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BackgroundComponent } from './shared/components/background/background.component';
import {SharedModule} from "./shared/shared.module";
import { PrivateComponent } from './private/private.component';
import { HomeComponent } from './private/pages/home/home.component';
import {PublicComponent} from "./public/public.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BackgroundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
