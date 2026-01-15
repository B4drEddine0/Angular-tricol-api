import { Component } from '@angular/core';
import { UserListComponent } from '../../components/users/user-list/user-list.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserListComponent],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class UsersComponent {}
