import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { map } from 'rxjs';
import { User } from '../user';


@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private router: Router, private userService: UserService) { }
  
  login(username: string, password: string) {
    username = username.trim();
    var user = this.userService.getUserByUsername(username) 
    if(!user) {
      console.log("user não existe!")
    } else {
      user.pipe(
        map(user => user as User),
        map(user => user.password)

      )
      .subscribe(
        (userPassword: string) => {
          if(userPassword === password) {
            console.log('password correct');
          } else {
            console.log('password incorrect');
          }
        },
        error => console.log('Error', error)
      )
    }
      
  }
  
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
