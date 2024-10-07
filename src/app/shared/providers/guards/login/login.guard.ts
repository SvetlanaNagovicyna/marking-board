import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";

export const LoginGuard: CanActivateFn = ():boolean => {
  if (inject(AuthService).isAuthenticated()) {
    inject(Router).navigate(['home'], {
      queryParams: {
        login: true,
      }
    })
    return false;
  }
  return true;
};
