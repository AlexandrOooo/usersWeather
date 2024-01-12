import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserListComponent } from '../../component/user-list/user-list.component';
import { UsersInfo } from '../../types/user.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GoToButtonComponent } from '../../component/go-to-button/go-to-button.component';
import { SAVED_USERS_PAGE_URL } from '../../constants/index.constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    UserListComponent,
    RouterLink,
    RouterLinkActive,
    GoToButtonComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  users$!: Observable<UsersInfo>;
  SAVED_USERS_PAGE_URL = SAVED_USERS_PAGE_URL;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }
}
