import { Component, inject, OnInit } from '@angular/core';
import {AuthService} from "../../providers/services/auth.service";
import { Router } from '@angular/router';
import { UserService } from '../../providers/services/user.service';
import { User } from '../../interfaces/user.interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  auth = inject(AuthService);
  #router = inject(Router);
  userService = inject(UserService);
  user: User | null = null ;
  isShowForm: boolean = false;



  ngOnInit() {
    this.userService.user$.subscribe({
      next: (user) => {
        this.user = user;
      }
    });
    this.userService.isShowForm$.subscribe((value) => {
      this.isShowForm = value;
    });

  }

  isShowFormEdit() {
    this.isShowForm = true;
    this.userService.setShowForm(this.isShowForm);
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.#router.navigate(['login'])
  }

}
