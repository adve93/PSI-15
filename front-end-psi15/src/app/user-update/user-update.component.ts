import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { Item } from '../item';
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  
  constructor( private userService: UserService,private router: Router) { }

  images = [
    { src: '../../assets/pfpPics/pic1.jpg', alt: 'Profile picture 1' },
    { src: '../../assets/pfpPics/pic2.jpg', alt: 'Profile picture 2' },
    { src: '../../assets/pfpPics/pic3.jpg', alt: 'Profile picture 3' }
  ];

  oldUsername: string = "";
  tempuser: User = {
    username: "",
    password: "",
    wallet: 0,
    games: new Map<Item, Date>(),
    cart: new Map<Item, number>(),
    image: "ola"
  };
  selectedImg: string = "";
  ngOnInit(){
    this.oldUsername = <string>this.userService.getLoggedInUser();
    this.userService.getUserByUsername(this.oldUsername).subscribe((user: User) =>{
      this.tempuser = user;
    });
  }

  returnToProfile(){
    this.router.navigate(['/user-profile']);
  }
  
  updateUser(newUsername: string, updatedImage: string){
    console.log(updatedImage);
    if (newUsername)
    this.tempuser.username = newUsername;
    if(updatedImage)
    this.tempuser.image = updatedImage;
    this.userService.postUpdateUser(this.tempuser, this.oldUsername);
    window.alert("Changes saved! Feel free to go back");
  }
}
