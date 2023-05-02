import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  user: User = {
    username: "",
    password: "",
    wallet: 0
  };

  constructor(private router: Router, private userService: UserService) { }

  getUser(username: string) {
    username = username.trim();
    var tempUser  = this.userService.getUserByUsername(username).subscribe(
      user => {
        this.user = user;
      },
      error => {
        console.log(error);
      }
    )
    if(!tempUser) {
      console.log("user não existe!")
    }
  }
}
