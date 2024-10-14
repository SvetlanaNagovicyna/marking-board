import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { map, Observable, of } from 'rxjs';
import { User } from '../../../interfaces/user.interface';

export const AdminGuard: CanActivateFn = (): Observable<boolean> => {
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);

  userService.getUser()
    .pipe(
      map((user: User | null): boolean => {
        if (user && user.hasPerm) {
          return true;
        }
        router.navigate(['home']);
        return false;
      })
    );
  return of(true);
};
