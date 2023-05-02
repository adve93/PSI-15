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

  constructor( private userService: UserService) { }
  
  login(username: string, password: string) {
    
    this.userService.userLogin(username, password);
  
  }
}
