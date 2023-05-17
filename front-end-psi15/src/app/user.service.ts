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

  loggedInUser = "";

  constructor (private http: HttpClient, private router: Router) {}

  addUser(username: string, password: string) {
    const user = {
      username: username,
      password: password,
      cart: new Map(),
      games: new Map(),
      image: '../assets/pfpPics/pic1.jpg'

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

  displayItem(title: string){
    this.router.navigate([`/itemDetail/${title}`]);
  }

  
  getLoggedInUser(): string{
    return this.loggedInUser;
  }

  isLoggedIn(): boolean {
    return this.loggedInUser != "";
  }


  getUserList() {
    return this.http.get<User[]>(`${this.backEnd}/user/`);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.backEnd}/user/detail/${username}`);
  }

  postUpdateUser(user: User, oldUsername: string) {
    this.loggedInUser = user.username;
    this.http.post(`${this.backEnd}/user/update/${oldUsername}`, user, { observe: 'response' }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          const errors = Array.isArray(error.error) ? error.error : Object.values(error.error);
          const errorMessages = errors[0].join(', ');
          window.alert(errorMessages);
        }
        if (error.status === 500) {
          window.alert(error.error);
        }
        return throwError(error.message);
      })
    ).subscribe(
      (response: HttpResponse<any>) => {
        if(response.status === 200){
          window.alert('New username/profile picture saved.');
        }
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  userLogin(username: string, password: string){
    var user = this.getUserByUsername(username);
    user.subscribe(user => {
       if(!user) {
        window.alert("User não existe!");
        return;
      }
    })
      user.pipe(
        map(user => user as User),
        map(user => user.password)
      )
      .subscribe(
        (userPassword: string) => {
          if(userPassword === null && userPassword === undefined)
            return window.alert("User não existe!");
          if(userPassword === password) {
            window.alert('Succesfully logged in!');
            document.cookie = username;
            this.loggedInUser = username;
            this.router.navigate(['/dashboard']);
          } else {
            window.alert('Password incorrect!');
          }
        },
        error => console.log('Error', error)
      )
  }

  addItemToCart(username: string, item: Item){
    return this.http.post(`${this.backEnd}/user/addItem/${username}`, item);
  }

  getUserCart(username: string): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.backEnd}/user/cart/${username}`);
  }

  getUserGames(username: string) {
    return this.http.get(`${this.backEnd}/user/games/${username}`);
  }

  deleteItemUserCart(username: string, item: Item) {
    return this.http.post(`${this.backEnd}/user/deleteItem/${username}`, item);
  }

  getNumberOfItemsIncCart(item: Item, username: string): Number{
    var value: any;
    this.http.get<Map<Item,Number>>(`${this.backEnd}/user/getCart/${username}`).subscribe(
      (response: Map<Item,Number>) => {
        value = response.get(item);
      }
    );
    return value;
  }


  deleteItemFromCart(username: string, item: Item){
    return this.http.post(`${this.backEnd}/user/deleteItemAll/${username}`, item).subscribe();
  }


  postUserCheckout(username: string) {
    return this.http.post(`${this.backEnd}/user/checkout/${username}`, username).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          window.alert(error.error);
        }
        if (error.status === 500) {
          window.alert(error.error);
        }
        if (error.status === 200) {
          window.alert("Checkout succeseful!");
        }
        return throwError(error.message);
      }));
  }

  deleteUserByUsername(username: string) {
    return this.http.get(`${this.backEnd}/user/delete/${username}`);
  }

  getCartSizeByUsername(username: string) {
    return this.http.get(`${this.backEnd}/user/cartSize/${username}`);
  }
}