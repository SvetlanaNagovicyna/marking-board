import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    MatTableModule,
    MatTooltipModule,
  ],
  exports: [
    HomeComponent,
  ]
})

export class HomeModule {
}
