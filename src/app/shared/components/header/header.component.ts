import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {AuthService} from "../../providers/services/auth.service";
import { Router } from '@angular/router';
import { UserService } from '../../providers/services/user.service';
import { User } from '../../interfaces/user.interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { EditFormComponent } from '../edit-form/edit-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  auth: AuthService = inject(AuthService);
  #router: Router = inject(Router);
  userService: UserService = inject(UserService);
  destroyRef: DestroyRef = inject(DestroyRef);
  user: User | null = null;
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.subscribeToUser();
  }

  subscribeToUser(): void {
    this.userService.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user: User | null): void => {
          this.user = user;
        }
    })
  }

  logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
    this.#router.navigate(['login']);
  }

  openDialog(): void {
    this.dialog.open(EditFormComponent, {
      panelClass: 'editForm',
    });
  }
}
