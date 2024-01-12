import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersInfo } from '../types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUsers(): Observable<UsersInfo> {
    return this.http.get<UsersInfo>(`https://randomuser.me/api/?results=9`);
  }
}
