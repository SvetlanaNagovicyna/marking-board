import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminPageComponent } from './admin-page.component';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    AdminPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule,
  ],
  exports: [
    AdminPageComponent,
  ]
})

export class AdminPageModule {
}
