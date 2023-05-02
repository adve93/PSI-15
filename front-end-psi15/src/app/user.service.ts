import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { MessageService } from './message.service';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backEnd = 'http://localhost:3000';

  private loggedInUser: String | null = null;

  constructor (private http: HttpClient, private router: Router) {}

  addUser(username: string, password: string) {
    const user = {
      username: username,
      password: password
    };
    this.http.post(`${this.backEnd}/user/create`, user, { observe: 'response' }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          const errors = Array.isArray(error.error) ? error.error : Object.values(error.error);
          const errorMessages = errors[0].join(', ');
          window.alert(errorMessages);
        }
        return throwError(error.message);
      })
    ).subscribe(
      (response: HttpResponse<any>) => {
        if(response.status === 200){
          window.alert('User succesefully created! Please login to enter the dashboard.');
          this.router.navigate(['/user-login']);
        }
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  private isAlphanumeric(str: string): boolean {
    return /^[a-z0-9]+$/i.test(str);
  }

  setLoggedInUser(username: String){
    this.loggedInUser = username;
  }

  getLoggedInUser(): String | null{
    return this.loggedInUser;
  }

  isLoggedIn(): boolean {
    return this.loggedInUser != null;
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
    const response =  this.http.post(`${this.backEnd}/user/update/${username}`, user);




  }

  deleteUserByUsername(username: string) {
    return this.http.get(`${this.backEnd}/user/delete/${username}`);
  }

}