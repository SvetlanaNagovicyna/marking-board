import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PrivateComponent} from "./private.component";

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(mod => mod.HomeModule),
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

export class PrivateRoutingModule {}
