import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";

export const AuthGuard: CanActivateFn = (): boolean => {
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
