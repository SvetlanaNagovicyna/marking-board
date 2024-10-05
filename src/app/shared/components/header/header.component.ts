import {Component, inject} from '@angular/core';
import {AuthService} from "../../providers/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent  {
  auth = inject(AuthService);
}
