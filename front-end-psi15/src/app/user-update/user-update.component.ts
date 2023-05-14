import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  
  constructor( private userService: UserService,private router: Router) { }

  oldUsername: string = "";
  tempuser!: User;

  NgOnInit(){
    this.oldUsername = this.userService.getLoggedInUser();
    this.userService.getUserByUsername(this.oldUsername).subscribe((user: User) =>{
      this.tempuser = user;
    });
  }

  returnToProfile(){
    this.router.navigate(['/user-profile']);
  }
  updateUser(newUsername: string, newImg: string){
    if (newUsername)
    this.tempuser.username = newUsername
    if(newImg)
    this.tempuser.username = newImg
    this.userService.postUpdateUser(this.tempuser, this.oldUsername);
  }
}
