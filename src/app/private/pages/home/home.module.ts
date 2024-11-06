import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
  ],
  exports: [
    HomeComponent,
  ]
})

export class HomeModule {
}
