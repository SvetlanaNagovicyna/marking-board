import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';

export const AdminGuard: CanActivateFn = ():boolean => {
  if (inject(UserService).isAdmin()) {
    inject(Router).navigate(['admin']);
    return false;
  }
  return true;
};
