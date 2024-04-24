import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";

export const LoginGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean => {
  if (inject(AuthService).isAuthenticated()) {
    inject(Router).navigate(['home'], {
      queryParams: {
        login: true,
      }
    })
    return false
  }
  return true
};
