import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  
  constructor( private userService: UserService) { }
  returnToProfile(){

  }
  updateUser(username: String, imagePath:String){
    this.userService.postUpdateUser(username, imagePath);
  }
}
