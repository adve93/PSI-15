import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backEnd = 'http://localhost:3000';

  constructor (private http: HttpClient) {}

  addUser(username: string, password: string) {
    const user = {
      username: username,
      password: password
    };
    return this.http.post(`${this.backEnd}/user/create`, user);
  }

  getUserList() {
    return this.http.get(`${this.backEnd}/user/list`);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.backEnd}/user/${username}`);
  }

  postUpdateUser(username: string, password: string) {
    const user = {
      username: username,
      password: password
    };
    return this.http.post(`${this.backEnd}/user/update/${username}`, user);
  }

  deleteUserByUsername(username: string) {
    return this.http.get(`${this.backEnd}/user/delete/${username}`);
  }


}