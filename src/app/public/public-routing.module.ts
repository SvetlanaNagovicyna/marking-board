import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PublicComponent } from "./public.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegistrationComponent } from "./pages/registration/registration.component";

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        loadChildren: () => import('./pages/login/login.module').then(mod => mod.LoginModule),
      },
      {
        path: 'registration',
        component: RegistrationComponent,
        loadChildren: () => import('./pages/registration/registration.module').then(mod => mod.RegistrationModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login',
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PublicRoutingModule {
}
