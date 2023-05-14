import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backEnd = 'http://localhost:3065';

  private loggedInUser: String | null = null;

  constructor (private http: HttpClient, private router: Router) {}

  addUser(username: string, password: string) {
    const user = {
      username: username,
      password: password,
      image: '../assets/pic1.jpg'
    };
    this.http.post(`${this.backEnd}/user/create`, user, { observe: 'response' }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          const errors = Array.isArray(error.error) ? error.error : Object.values(error.error);
          const errorMessages = errors[0].join(', ');
          window.alert(errorMessages);
        }
        if (error.status === 500) {
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

  setLoggedInUser(username: String){
    this.loggedInUser = username;
  }

  displayItem(title: string){
    this.router.navigate([`/itemDetail/${title}`]);
  }

  getLoggedInUser(): String | null{
    const cookieArray = document.cookie.split(';');
    return cookieArray[1];
  }

  isLoggedIn(): boolean {
    return this.loggedInUser != null;
  }

  getUserList() {
    return this.http.get<User[]>(`${this.backEnd}/user/`);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.backEnd}/user/detail/${username}`);
  }

  postUpdateUser(user: User) {
    return this.http.post(`${this.backEnd}/user/update/${user.username}`, user);
  }

  userLogin(username: string, password: string){
    var user = this.getUserByUsername(username);
    if(!user) {
      window.alert("User não existe!");
    } else {
      user.pipe(
        map(user => user as User),
        map(user => user.password)
      )
      .subscribe(
        (userPassword: string) => {
          if(userPassword === password) {
            window.alert('Succesfully logged in!');
            document.cookie = username;
            this.setLoggedInUser(username);
            this.router.navigate(['/dashboard']);
          } else {
            window.alert('Password incorrect!');
          }
        },
        error => console.log('Error', error)
      )
    }
  }

  addItemToCart(item: Item){
    return this.http.post(`${this.backEnd}/user/addItem/:username`, item);
  }

  getNumberOfItemsIncCart(item: Item){

    //Discutir implementação
    //return this.http.get<Number>(`${this.backEnd}/user/getItemNumber/:username`, item);
  }

  deleteUserByUsername(username: string) {
    return this.http.get(`${this.backEnd}/user/delete/${username}`);
  }
}