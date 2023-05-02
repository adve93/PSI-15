import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';


@Component({
  selector: 'user-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  constructor(private userService: UserService, private router: Router) { }

  addUser(username: string, password: string): void {
    const userAdded = this.userService.addUser(username, password);
    userAdded.subscribe((user) => {
      console.log(user);
    });
    window.alert("User created. Please login to acess the platform!");
  }

  goToMainPage(): void {
    this.router.navigate(['/main-page']);
  }
}
