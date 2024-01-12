import { Component } from '@angular/core';
import { GoToButtonComponent } from '../../component/go-to-button/go-to-button.component';
import { UserListComponent } from '../../component/user-list/user-list.component';
import { User } from '../../types/user.interface';

@Component({
  selector: 'app-saved-users',
  standalone: true,
  imports: [UserListComponent, GoToButtonComponent],
  templateUrl: './saved-users.component.html',
  styleUrl: './saved-users.component.scss',
})
export class SavedUsersComponent {
  savedUsers: User[] = [];
  ngOnInit(): void {
    this.savedUsers = JSON.parse(localStorage.getItem('users') ?? '[]');
  }
}
