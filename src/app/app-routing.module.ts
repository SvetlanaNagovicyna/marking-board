import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./shared/providers/guards/auth/auth.guard";
import {LoginGuard} from "./shared/providers/guards/login/login.guard";
import { UserResolver } from './shared/providers/resolvers/user.resolver';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/public.module').then(mod => mod.PublicModule),
    canActivate: [LoginGuard],
  },
  {
    path: '',
    loadChildren: () => import('./private/private.module').then(mod => mod.PrivateModule),
    resolve: {data: UserResolver},
    canActivate: [AuthGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    resolve: {data: UserResolver},
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
