import { Component, OnInit, inject } from '@angular/core';
import { DataSourceUser } from './data.source';
import { CommonModule } from '@angular/common';
import {CdkTableModule} from '@angular/cdk/table';
import { UsersService } from '../../../../services/users.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, CdkTableModule],
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit{

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  private usersService = inject(UsersService);
  private authService = inject(AuthService);
  user: User | null = null;

  constructor() {
    this.dataSource.init([
      {
        id: 1,
        name: 'User 1',
        email: 'mail@mail.com',
        avatar: 'https://api.lorem.space/image/face?w=150&h=150'
      },
      {
        id: 2,
        name: 'User 2',
        email: 'mail2@mail.com',
        avatar: 'https://api.lorem.space/image/face?w=150&h=150'
      },
      {
        id: 3,
        name: 'User 3',
        email: 'mail3@mail.com',
        avatar: 'https://api.lorem.space/image/face?w=150&h=150'
      }
    ]);
  }
  
  ngOnInit(): void {
    this.getUsers();
    this.user = this.authService.getDataUser();
  }

  getUsers(){
    this.usersService.getUsers().subscribe(data => {
      this.dataSource.init(data);
    });
  }

}
