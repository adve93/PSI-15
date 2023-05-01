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

  users: User[] = []

  addUser(username: string, password: string): void {
    username = username.trim();
    this.userService.addUser({ username, password } as User)
      .subscribe(user =>{
        this.users.push(user);
      });
  }
}
