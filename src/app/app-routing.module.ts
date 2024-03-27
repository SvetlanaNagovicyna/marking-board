import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./public/pages/login/login.component";

const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  {
    path: '',
    loadChildren: () => import('./public/public.module').then(mod => mod.PublicModule),
  },
  {
    path: '',
    loadChildren: () => import('./private/private.module').then(mod => mod.PrivateModule),
  }

  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: '/'
  // },
  // {
  //   path: '**',
  //   redirectTo: '/'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
