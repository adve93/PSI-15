import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';


@Component({
  selector: 'user-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  constructor(private userService: UserService) { }

  addUser(username: string, password: string): void {
    const user: User = {
      username: username,
      password: password
    };
    this.userService.addUser(user)
  }
}
