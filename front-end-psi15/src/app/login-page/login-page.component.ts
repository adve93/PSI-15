import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { UserService } from '../user.service';


@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private router: Router, private userService: UserService) { }
username: any;
password: any;
login(username: string, password: string) {
  username = username.trim();
  var user = this.userService.getUserByUsername(username) 
  if(!user)
    console.log("user não existe!")// mensagem de erro tem de ser passada de aluma forma
    // alert.log("user não existe!")
  if(user.password != password){
    console.log("dados incorretos!")// mensagem de erro tem de ser passada de aluma forma
      // alert.log("dados incorretos!")
  }else
  console.log("Logado!")// mensagem de erro tem de ser passada de aluma forma
    // alert.log("Logado!")
}
// TODO provavelmente tem mais coisa a se fazer, redirecionar para a dashboard(?)

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
