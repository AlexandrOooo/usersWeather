import { Routes } from '@angular/router';
import {
  HOME_PAGE_URL,
  SAVED_USERS_PAGE_URL,
} from './constants/index.constants';
import { HomeComponent } from './pages/home/home.component';
import { SavedUsersComponent } from './pages/saved-users/saved-users.component';

export const routes: Routes = [
  {
    path: HOME_PAGE_URL,
    component: HomeComponent,
  },
  {
    path: SAVED_USERS_PAGE_URL,
    component: SavedUsersComponent,
  },
];
