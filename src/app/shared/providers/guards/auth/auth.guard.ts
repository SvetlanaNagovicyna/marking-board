import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";


export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  if (!inject(AuthService).isAuthenticated()) {
    inject(Router).navigate(['login'], {
      queryParams: {
        loginAgain: true,
      }
    })
    return false
  }
  return true
};
