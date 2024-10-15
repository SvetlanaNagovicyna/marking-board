import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrivateComponent } from "./private.component";
import { HomeComponent } from "./pages/home/home.component";
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminGuard } from '../shared/providers/guards/admin/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        loadChildren: () => import('./pages/home/home.module').then(mod => mod.HomeModule),
      },
      {
        path: 'admin',
        component: AdminPageComponent,
        loadChildren: () => import('./pages/admin-page/admin-page.module').then(mod => mod.AdminPageModule),
        canActivate: [AdminGuard],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      }
    ]
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PrivateRoutingModule {
}
