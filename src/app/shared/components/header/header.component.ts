import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {AuthService} from "../../providers/services/auth.service";
import { Router } from '@angular/router';
import { UserService } from '../../providers/services/user.service';
import { User } from '../../interfaces/user.interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  auth = inject(AuthService);
  #router = inject(Router);
  userService = inject(UserService);
  user: User | null = null;
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.subscribeToUser();
  }

  subscribeToUser() {
    this.userService.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this.user = user;
        }
    })
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.#router.navigate(['login'])
  }
}
