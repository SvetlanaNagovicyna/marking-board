import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../shared/providers/services/users.service';
import { Users } from '../../../shared/interfaces/users.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  usersService: UsersService = inject(UsersService);
  users: Users[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (res: Users[]): void => {
        this.users = res;
      }
    })
  }
}
