import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../shared/providers/services/user.service';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  userService: UserService = inject(UserService);
  users: User[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (res: User[]): void => {
        this.users = res;
      }
    })
  }
}
