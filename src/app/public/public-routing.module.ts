import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PublicComponent} from "./public.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegistrationModule} from "./pages/registration/registration.module";

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(mod => mod.LoginModule)
      },
      {
        path: 'registration',
        loadChildren: () => import('./pages/registration/registration.module').then(mod => mod.RegistrationModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PublicRoutingModule { }
