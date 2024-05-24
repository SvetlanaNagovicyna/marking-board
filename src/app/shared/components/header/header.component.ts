import {Component, inject} from '@angular/core';
import {AuthService} from "../../providers/services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent  {
  auth = inject(AuthService);
  #router = inject(Router)
  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.#router.navigate(['login'])
  }
}
