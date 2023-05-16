import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { Item } from '../item';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  user: User = {
    username: "",
    password: "",
    wallet: 0,
    games: new Map<string, Date>(),
    cart: new Map<string, number>(),
    image: "ola"
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
      this.getUser();
  }

  getUser() {
    var username = <string>this.userService.getLoggedInUser();
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

  showNotImplemented() {
    window.alert('Feature not implemented.');
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  goToMyList(){
    this.router.navigate(['/myList']);
  }
}
