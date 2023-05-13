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
  returnToProfile(){
    this.router.navigate(['/user-profile']);
  }
  updateUser(username: String, imagePath:String){
    this.userService.postUpdateUser(username, imagePath);
  }
}
